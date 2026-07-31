import assert from "node:assert/strict";
import test from "node:test";
import {
  FFXI_YOUTUBE_CHANNEL_ID,
  FFXI_YOUTUBE_LIVE_URL,
} from "../src/lib/youtubeLive";
import { projects } from "../src/lib/projects";

test("project records have unique titles and valid destinations", () => {
  assert.equal(new Set(projects.map((project) => project.title)).size, projects.length);

  for (const project of projects) {
    assert.ok(project.description.length > 30);
    assert.ok(project.evidence.length > 10);
    assert.ok(project.stack.length >= 2);

    if (project.external) {
      assert.match(project.href, /^https:\/\//);
    } else {
      assert.match(project.href, /^\//);
    }
  }
});

test("FFXI Agent Lab is the lead project and its resolver follows the channel", () => {
  assert.equal(projects[0]?.title, "FFXI Agent Lab");
  assert.equal(projects[0]?.status, "Active");
  assert.equal(projects[0]?.href, "https://github.com/pablodcruz/ffxi-agents-server");

  assert.equal(FFXI_YOUTUBE_CHANNEL_ID, "UCk7Zu8JfJLEhn4_2EYT7tMg");
  assert.equal(FFXI_YOUTUBE_LIVE_URL, "https://www.youtube.com/@ffxi-ai-agent/live");
});
