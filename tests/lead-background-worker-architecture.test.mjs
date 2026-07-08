import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const route = await readFile(
  new URL("../src/app/api/leads/route.ts", import.meta.url),
  "utf8",
);
const worker = await readFile(
  new URL("../netlify/functions/process-lead-background.mts", import.meta.url),
  "utf8",
).catch(() => "");
const processor = await readFile(
  new URL("../src/server/lead-processing.ts", import.meta.url),
  "utf8",
).catch(() => "");

test("/api/leads only saves, enqueues, and returns the fast redirect contract", () => {
  assert.match(route, /export async function POST\(request: Request\)/);
  assert.match(route, /enqueueLeadBackgroundJob/);
  assert.match(route, /queued: enqueueResult\.queued/);
  assert.match(route, /queuedBackgroundJob: enqueueResult\.queued/);
  assert.match(route, /Lead API timing:/);
  assert.match(route, /supabaseMs/);
  assert.match(route, /enqueueMs/);

  const postBody = route.slice(route.indexOf("export async function POST"));
  assert.doesNotMatch(postBody, /sendLeadToClickUp/);
  assert.doesNotMatch(postBody, /sendLeadNotificationEmail/);
  assert.doesNotMatch(postBody, /createClickUpTask/);
  assert.doesNotMatch(postBody, /getClickUpFields/);
});

test("Netlify background function processes ClickUp and email behind a secret", () => {
  assert.match(worker, /background:\s*true/);
  assert.match(worker, /processLeadBackgroundJob/);
  assert.match(worker, /x-lead-worker-secret/);
  assert.match(worker, /process\.env\.LEAD_WORKER_SECRET/);
  assert.match(worker, /process\.env\.NODE_ENV !== "production"/);
  assert.doesNotMatch(worker, /NEXT_PUBLIC/);
});

test("shared background processor keeps ClickUp and email out of the user wait path", () => {
  assert.match(processor, /async function createClickUpTask/);
  assert.match(processor, /fillClickUpCustomFieldsForTask/);
  assert.match(processor, /createClickUpTaskComment/);
  assert.match(processor, /sendLeadNotificationEmailWithTimeout/);
  assert.match(processor, /updateLeadClickUpStatus/);
  assert.match(processor, /Lead background timing:/);
  assert.match(processor, /clickupMs/);
  assert.match(processor, /emailMs/);
  assert.match(processor, /SMTP_PASS\?\.replace\(\/\\s\/g, ""\)/);
});
