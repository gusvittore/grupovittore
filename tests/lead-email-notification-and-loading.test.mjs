import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const packageJson = JSON.parse(
  await readFile(new URL("../package.json", import.meta.url), "utf8"),
);
const route = await readFile(
  new URL("../src/app/api/leads/route.ts", import.meta.url),
  "utf8",
);
const processor = await readFile(
  new URL("../src/server/lead-processing.ts", import.meta.url),
  "utf8",
);
const leadForm = await readFile(
  new URL("../src/app/_components/lead-form.tsx", import.meta.url),
  "utf8",
);

test("lead notification email uses nodemailer only in the backend processor", () => {
  assert.match(packageJson.dependencies?.nodemailer ?? "", /\S/);
  assert.match(processor, /from "nodemailer"/);
  assert.match(processor, /function getSmtpConfig/);
  assert.match(processor, /process\.env\.SMTP_HOST/);
  assert.match(processor, /process\.env\.SMTP_PORT/);
  assert.match(processor, /process\.env\.SMTP_USER/);
  assert.match(processor, /process\.env\.SMTP_PASS/);
  assert.match(processor, /process\.env\.LEAD_NOTIFICATION_EMAIL/);
  assert.doesNotMatch(`${route}\n${processor}`, /NEXT_PUBLIC_SMTP/);
});

test("lead notification email includes all requested lead and ClickUp fields", () => {
  assert.match(processor, /async function sendLeadNotificationEmail/);
  assert.match(processor, /Novo lead recebido \| Grupo Vittore/);
  assert.match(processor, /Novo lead recebido pela landing page do Grupo Vittore\./);

  for (const field of [
    "nome_completo",
    "empresa",
    "whatsapp",
    "email",
    "segmento",
    "faturamento_mensal",
    "clickupStatus",
    "origem_lead",
    "utm_source",
    "utm_medium",
    "utm_campaign",
    "utm_term",
    "utm_content",
    "gclid",
    "clickup_task_id",
    "clickup_task_url",
  ]) {
    assert.match(processor, new RegExp(field));
  }

  assert.match(processor, /transporter\.sendMail/);
  assert.match(processor, /from: `"?Grupo Vittore Leads"? <\$\{process\.env\.SMTP_USER\}>`/);
  assert.match(processor, /to: process\.env\.LEAD_NOTIFICATION_EMAIL/);
});

test("lead notification email is background-only and skipped for duplicates", () => {
  const duplicateBlockStart = route.indexOf("if (duplicateLead)");
  const duplicateBlockEnd = route.indexOf("} catch (duplicateError)", duplicateBlockStart);
  const duplicateBlock = route.slice(duplicateBlockStart, duplicateBlockEnd);

  assert.match(duplicateBlock, /return Response\.json[\s\S]*duplicate: true/);
  assert.doesNotMatch(duplicateBlock, /enqueueLeadBackgroundJob/);
  assert.doesNotMatch(route, /sendLeadNotificationEmail/);
  assert.match(processor, /async function sendLeadNotificationEmailWithTimeout/);
  assert.match(processor, /withTimeout\([\s\S]*sendLeadNotificationEmail/);
  assert.match(processor, /Falha ao enviar e-mail de lead:/);
});

test("lead form shows a small processing message with spinner while submitting", () => {
  assert.match(leadForm, /submitLockedRef\.current = true/);
  assert.match(leadForm, /disabled=\{isSubmitting\}/);
  assert.match(leadForm, /isSubmitting \? "Enviando\.\.\." : "Receber mais informa/);
  assert.match(
    leadForm,
    /Aguarde, suas informa(?:çõ|Ã§Ãµ|ÃƒÂ§ÃƒÂµ)es est(?:ã|Ã£|ÃƒÂ£)o sendo enviadas\. N(?:ã|Ã£|ÃƒÂ£)o feche esta p(?:á|Ã¡|ÃƒÂ¡)gina\./,
  );
  assert.match(leadForm, /animate-spin/);
  assert.match(leadForm, /aria-live="polite"/);
});
