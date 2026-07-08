import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const route = await readFile(
  new URL("../src/app/api/leads/route.ts", import.meta.url),
  "utf8",
);
const processor = await readFile(
  new URL("../src/server/lead-processing.ts", import.meta.url),
  "utf8",
);

test("SMTP config removes app password spaces and logs only safe diagnostics", () => {
  assert.match(processor, /process\.env\.SMTP_PASS\?\.replace\(\/\\s\/g, ""\)/);
  assert.match(processor, /const host = process\.env\.SMTP_HOST \|\| "smtp\.gmail\.com"/);
  assert.match(processor, /const port = Number\(process\.env\.SMTP_PORT \|\| 465\)/);
  assert.match(processor, /secure: .*=== 465/);
  assert.match(processor, /console\.log\("Email SMTP config:",/);
  assert.match(processor, /hasPass: Boolean\(process\.env\.SMTP_PASS\)/);
  assert.match(processor, /notificationEmail: process\.env\.LEAD_NOTIFICATION_EMAIL/);
  assert.doesNotMatch(processor, /pass:\s*process\.env\.SMTP_PASS/);
  assert.doesNotMatch(processor, /NEXT_PUBLIC.*SMTP/);
});

test("lead email logs attempts, success messageId, and safe failure details", () => {
  assert.match(processor, /Tentando enviar e-mail de lead para:/);
  assert.match(processor, /console\.log\("E-mail de lead enviado:", info\.messageId\)/);
  assert.match(processor, /message: error instanceof Error \? error\.message : String\(error\)/);
  assert.match(processor, /code:[\s\S]*errorRecord\.code/);
  assert.match(processor, /command:[\s\S]*errorRecord\.command/);
  assert.match(processor, /response:[\s\S]*errorRecord\.response/);
});

test("secondary post-ClickUp tasks run in parallel and email has timeout", () => {
  assert.match(processor, /withTimeout\([\s\S]*sendLeadNotificationEmail[\s\S]*3000[\s\S]*"sendLeadNotificationEmail"/);
  assert.match(processor, /Promise\.allSettled\(postClickupTasks\)/);

  const sendLeadToClickUpStart = processor.indexOf("async function sendLeadToClickUp");
  const sendLeadToClickUpEnd = processor.indexOf(
    "async function safelyUpdateLeadClickUpStatus",
    sendLeadToClickUpStart,
  );
  const sendLeadToClickUpBody = processor.slice(
    sendLeadToClickUpStart,
    sendLeadToClickUpEnd,
  );

  assert.doesNotMatch(sendLeadToClickUpBody, /await createClickUpTaskComment[\s\S]*await getClickUpFields/);
});

test("API returns safe queue debug timings and background logs ClickUp/email timings", () => {
  assert.match(route, /console\.log\("Lead API timing:",/);
  assert.match(route, /function createApiDebug/);
  assert.match(route, /debug: createApiDebug/);
  assert.match(route, /queuedBackgroundJob: enqueueResult\.queued/);
  assert.match(route, /timings:/);
  assert.match(route, /totalMs:/);
  assert.match(route, /supabaseMs:/);
  assert.match(route, /enqueueMs:/);
  assert.match(processor, /console\.log\("Lead background timing:",/);
  assert.match(processor, /clickupMs/);
  assert.match(processor, /emailMs/);
  assert.doesNotMatch(route, /debug:[\s\S]{0,500}(SMTP_PASS|CLICKUP_API_TOKEN|SUPABASE_SERVICE_ROLE_KEY)/);
});
