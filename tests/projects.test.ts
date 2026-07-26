import assert from "node:assert/strict";
import test from "node:test";
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
