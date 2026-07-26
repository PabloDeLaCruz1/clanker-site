const scope = process.argv
  .find((argument) => argument.startsWith("--scope="))
  ?.split("=")[1] ?? "root";

if (!["root", "prototypes", "all"].includes(scope)) {
  console.error(`Unknown scope "${scope}". Use root, prototypes, or all.`);
  process.exit(2);
}

const urls = {
  root: (process.env.CLANKER_SITE_URL ?? "https://clanker-site.vercel.app").replace(/\/$/, ""),
  research: (
    process.env.RESEARCH_SITE_URL ?? "https://data-pipeline-lab-site.vercel.app"
  ).replace(/\/$/, ""),
  intake: (
    process.env.INTAKE_SITE_URL ?? "https://workflow-client-intake.vercel.app"
  ).replace(/\/$/, ""),
};

async function request(url) {
  const response = await fetch(url, {
    headers: {
      "cache-control": "no-cache",
      "user-agent": "clanker-deployment-verifier/1.0",
    },
    signal: AbortSignal.timeout(15_000),
  });

  if (!response.ok) {
    throw new Error(`HTTP ${response.status}`);
  }

  return response;
}

async function verifyPage(name, url, markers) {
  const response = await request(url);
  const body = await response.text();
  const missing = markers.filter((marker) => !body.includes(marker));

  if (missing.length > 0) {
    throw new Error(`missing marker${missing.length === 1 ? "" : "s"}: ${missing.join(", ")}`);
  }

  return `${name}: ${url}`;
}

async function verifyResearchApi() {
  const url = `${urls.research}/api/signals`;
  const response = await request(url);
  const body = await response.json();

  if (body.mode !== "cached-arxiv-snapshot") {
    throw new Error(`unexpected mode: ${body.mode ?? "missing"}`);
  }

  if (!body.note?.includes("Historical research snapshot")) {
    throw new Error("historical snapshot note is missing");
  }

  return `Research Signal API: ${url}`;
}

const rootChecks = [
  () => verifyPage("Clanker homepage", `${urls.root}/`, ["Revival shipped"]),
  () => verifyPage("Clanker projects", `${urls.root}/projects`, ["Historical prototype"]),
  () => verifyPage("Clanker build log", `${urls.root}/build-log`, ["e895315"]),
];

const prototypeChecks = [
  () =>
    verifyPage("Research Signal Lab", `${urls.research}/`, [
      "Historical Prototype",
      "dated, reviewable snapshot",
    ]),
  verifyResearchApi,
  () =>
    verifyPage("Workflow Client Intake", `${urls.intake}/`, [
      "Workflow Client Intake (v0)",
      "intake-revival-2026-07-26",
    ]),
];

const checks =
  scope === "root"
    ? rootChecks
    : scope === "prototypes"
      ? prototypeChecks
      : [...rootChecks, ...prototypeChecks];

let failures = 0;

for (const check of checks) {
  try {
    console.log(`PASS ${await check()}`);
  } catch (error) {
    failures += 1;
    console.error(`FAIL ${error instanceof Error ? error.message : String(error)}`);
  }
}

if (failures > 0) {
  console.error(`\n${failures} deployment check${failures === 1 ? "" : "s"} failed.`);
  process.exitCode = 1;
} else {
  console.log(`\nAll ${checks.length} deployment checks passed.`);
}
