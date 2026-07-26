import assert from "node:assert/strict";
import test from "node:test";
import { getMarkdownDoc } from "../src/lib/content";

test("current homepage content has the required dated metadata", async () => {
  const now = await getMarkdownDoc("now.md");

  for (const key of ["title", "subtitle", "description", "status", "updated", "focus"]) {
    assert.equal(typeof now.data[key], "string");
    assert.ok(now.data[key].trim().length > 0, `${key} should not be empty`);
  }

  assert.match(now.data.updated, /^July \d{1,2}, 2026$/);
  assert.ok(now.content.trim().length > 0);
});
