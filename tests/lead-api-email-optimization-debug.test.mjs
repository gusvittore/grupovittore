import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const route = await readFile(
  new URL("../src/app/api/leads/route.ts", import.meta.url),
  "utf8",
);

test("SMTP config removes app password spaces and logs only safe diagnostics", () => {
  assert.match(route, /process\.env\.SMTP_PASS\?\.replace\(\/\\s\/g, ""\)/);
  assert.match(route, /const host = process\.env\.SMTP_HOST \|\| "smtp\.gmail\.com"/);
  assert.match(route, /const port = Number\(process\.env\.SMTP_PORT \|\| 465\)/);
  assert.match(route, /secure: .*=== 465/);
  assert.match(route, /console\.log\("Email SMTP config:",/);
  assert.match(route, /hasPass: Boolean\(process\.env\.SMTP_PASS\)/);
  assert.match(route, /notificationEmail: process\.env\.LEAD_NOTIFICATION_EMAIL/);
  assert.doesNotMatch(route, /pass:\s*process\.env\.SMTP_PASS/);
  assert.doesNotMatch(route, /NEXT_PUBLIC.*SMTP/);
});

test("lead email logs attempts, success messageId, and safe failure details", () => {
  assert.match(route, /Tentando enviar e-mail de lead para:/);
  assert.match(route, /console\.log\("E-mail de lead enviado:", info\.messageId\)/);
  assert.match(route, /message: error instanceof Error \? error\.message : String\(error\)/);
  assert.match(route, /code:[\s\S]*errorRecord\.code/);
  assert.match(route, /command:[\s\S]*errorRecord\.command/);
  assert.match(route, /response:[\s\S]*errorRecord\.response/);
});

test("secondary post-ClickUp tasks run in parallel and email has timeout", () => {
  assert.match(route, /async function withTimeout/);
  assert.match(route, /Promise\.race\(\[promise, timeout\]\)/);
  assert.match(route, /\$\{label\} timeout after \$\{ms\}ms/);
  assert.match(route, /withTimeout\([\s\S]*sendLeadNotificationEmail[\s\S]*3000[\s\S]*"sendLeadNotificationEmail"/);
  assert.match(route, /Promise\.allSettled\(postClickupTasks\)/);

  const sendLeadToClickUpStart = route.indexOf("async function sendLeadToClickUp");
  const sendLeadToClickUpEnd = route.indexOf("export async function POST", sendLeadToClickUpStart);
  const sendLeadToClickUpBody = route.slice(sendLeadToClickUpStart, sendLeadToClickUpEnd);

  assert.doesNotMatch(sendLeadToClickUpBody, /await createClickUpTaskComment[\s\S]*await getClickUpFields/);
});

test("API returns safe debug timings and email status without secrets", () => {
  assert.match(route, /console\.log\("Lead API started"\)/);
  assert.match(route, /Tempo após Supabase:/);
  assert.match(route, /Tempo após ClickUp task:/);
  assert.match(route, /Tempo total API:/);
  assert.match(route, /const createDebug =/);
  assert.match(route, /debug: createDebug/);
  assert.match(route, /emailAttempted:/);
  assert.match(route, /emailSent:/);
  assert.match(route, /emailError:/);
  assert.match(route, /timings:/);
  assert.match(route, /totalMs:/);
  assert.match(route, /supabaseMs:/);
  assert.match(route, /clickupCreateMs:/);
  assert.match(route, /postTasksMs:/);
  assert.doesNotMatch(route, /debug:[\s\S]{0,500}(SMTP_PASS|CLICKUP_API_TOKEN|SUPABASE_SERVICE_ROLE_KEY)/);
});
