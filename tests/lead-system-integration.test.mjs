import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const route = await readFile(
  new URL("../src/app/api/leads/route.ts", import.meta.url),
  "utf8",
);
const core = await readFile(
  new URL("../src/server/lead-core.ts", import.meta.url),
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
const serverCode = `${route}\n${core}\n${processor}`;

test("lead API validates required fields and keeps secrets server-side", () => {
  for (const field of [
    "nome_completo",
    "email",
    "whatsapp",
    "empresa",
    "segmento",
    "faturamento_mensal",
  ]) {
    assert.match(serverCode, new RegExp(field));
  }

  assert.match(route, /export async function POST\(request: Request\)/);
  assert.match(route, /Campos obrigatorios ausentes\./);
  assert.match(core, /process\.env\.SUPABASE_URL/);
  assert.match(core, /process\.env\.SUPABASE_SERVICE_ROLE_KEY/);
  assert.match(processor, /process\.env\.CLICKUP_API_TOKEN/);
  assert.match(processor, /process\.env\.CLICKUP_LIST_ID/);
  assert.doesNotMatch(`${serverCode}\n${leadForm}`, /NEXT_PUBLIC_(?:CLICKUP|SUPABASE)/);
});

test("lead API saves to Supabase first and returns the expected queue redirect contract", () => {
  assert.match(core, /\/rest\/v1\/leads_assessoria/);
  assert.match(core, /Prefer: "return=representation"/);
  assert.match(core, /status_qualificacao/);
  assert.match(core, /clickup_status_destino/);
  assert.match(core, /enviado_clickup: false/);
  assert.match(core, /raw_payload/);
  assert.match(route, /Nao foi possivel salvar o lead\./);
  assert.match(route, /savedToSupabase: true/);
  assert.match(route, /queued: enqueueResult\.queued/);
  assert.match(route, /queuedBackgroundJob: enqueueResult\.queued/);
  assert.match(route, /redirectTo/);
});

test("background processor creates ClickUp tasks and fills dynamic custom fields without ICP", () => {
  assert.match(processor, /api\.clickup\.com\/api\/v2\/list\/\$\{clickUpListId\}\/task/);
  assert.match(processor, /api\.clickup\.com\/api\/v2\/list\/\$\{clickUpListId\}\/field/);
  assert.match(processor, /api\.clickup\.com\/api\/v2\/task\/\$\{taskId\}\/field\/\$\{field\.id\}/);
  assert.match(core, /MQL - LEAD QUALIF\. MARKT\./);
  assert.match(core, /NOVO LEAD/);
  assert.match(processor, /Nome completo:/);
  assert.match(processor, /WhatsApp \/ Telefone:/);
  assert.match(processor, /GCLID:/);
  assert.match(processor, /type_config/);
  assert.match(processor, /console\.warn/);
  assert.match(processor, /const clickUpFieldMapping/);
  assert.doesNotMatch(processor, /["']ICP["']\s*:/);
});

test("background processor maps ClickUp assignee, phone text, and segment dropdown safely", () => {
  assert.match(processor, /process\.env\.CLICKUP_ASSIGNEE_ID/);
  assert.match(processor, /Number\(process\.env\.CLICKUP_ASSIGNEE_ID\)/);
  assert.match(processor, /assignees: \[assigneeId\]/);
  assert.doesNotMatch(processor, /84823221/);

  assert.match(processor, /Telefone \/ WhatsApp/);
  assert.match(processor, /Telefone/);
  assert.match(processor, /WhatsApp/);
  assert.doesNotMatch(processor, /\+55/);

  assert.match(processor, /normalize\("NFD"\)/);
  assert.match(processor, /\.replace\(\/\[\\u0300-\\u036f\]\/g, ""\)/);
  assert.match(processor, /payloadKey === "segmento"/);
  assert.match(processor, /return option\.id/);
});

test("lead form posts payload with URL tracking params before redirecting", () => {
  assert.match(leadForm, /fetch\("\/api\/leads"/);
  assert.match(leadForm, /method: "POST"/);
  assert.match(leadForm, /new URLSearchParams\(window\.location\.search\)/);
  assert.match(leadForm, /utm_source/);
  assert.match(leadForm, /utm_medium/);
  assert.match(leadForm, /utm_campaign/);
  assert.match(leadForm, /utm_term/);
  assert.match(leadForm, /utm_content/);
  assert.match(leadForm, /gclid/);
  assert.match(leadForm, /origem_lead: "Landing Page Assessoria Comercial"/);
  assert.match(leadForm, /const redirectTo = result\.redirectTo \|\| getLeadRedirectPath\(revenue\)/);
  assert.match(leadForm, /window\.location\.href = redirectTo/);
  assert.match(leadForm, /console\.error\("Erro ao enviar lead:", error\)/);
  assert.match(leadForm, /disabled=\{isSubmitting\}/);
  assert.match(leadForm, /alert\("N(?:ã|Ã£|ÃƒÂ£)o foi poss(?:í|Ã­|ÃƒÂ­)vel enviar suas informa(?:çõ|Ã§Ãµ|ÃƒÂ§ÃƒÂµ)es\. Tente novamente\."\)/);
});
