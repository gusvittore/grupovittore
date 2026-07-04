import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const route = await readFile(
  new URL("../src/app/api/leads/route.ts", import.meta.url),
  "utf8",
);
const leadForm = await readFile(
  new URL("../src/app/_components/lead-form.tsx", import.meta.url),
  "utf8",
);

test("lead API validates required fields and keeps secrets server-side", () => {
  for (const field of [
    "nome_completo",
    "email",
    "whatsapp",
    "empresa",
    "segmento",
    "faturamento_mensal",
  ]) {
    assert.match(route, new RegExp(field));
  }

  assert.match(route, /export async function POST\(request: Request\)/);
  assert.match(route, /Campos obrigat(?:ó|Ã³)rios ausentes\./);
  assert.match(route, /process\.env\.SUPABASE_URL/);
  assert.match(route, /process\.env\.SUPABASE_SERVICE_ROLE_KEY/);
  assert.match(route, /process\.env\.CLICKUP_API_TOKEN/);
  assert.match(route, /process\.env\.CLICKUP_LIST_ID/);
  assert.doesNotMatch(`${route}\n${leadForm}`, /NEXT_PUBLIC_(?:CLICKUP|SUPABASE)/);
});

test("lead API saves to Supabase first and returns the expected redirect contract", () => {
  assert.match(route, /\/rest\/v1\/leads_assessoria/);
  assert.match(route, /Prefer": "return=representation"/);
  assert.match(route, /status_qualificacao/);
  assert.match(route, /clickup_status_destino/);
  assert.match(route, /raw_payload/);
  assert.match(route, /N(?:ã|Ã£)o foi poss(?:í|Ã­)vel salvar o lead\./);
  assert.match(route, /savedToSupabase: true/);
  assert.match(route, /sentToClickUp: true/);
  assert.match(route, /sentToClickUp: false/);
  assert.match(route, /redirectTo/);
});

test("lead API creates ClickUp tasks and fills dynamic custom fields without ICP", () => {
  assert.match(route, /api\.clickup\.com\/api\/v2\/list\/\$\{clickUpListId\}\/task/);
  assert.match(route, /api\.clickup\.com\/api\/v2\/list\/\$\{clickUpListId\}\/field/);
  assert.match(route, /api\.clickup\.com\/api\/v2\/task\/\$\{taskId\}\/field\/\$\{field\.id\}/);
  assert.match(route, /MQL - LEAD QUALIF\. MARKT\./);
  assert.match(route, /NOVO LEAD/);
  assert.match(route, /Nome completo:/);
  assert.match(route, /WhatsApp \/ Telefone:/);
  assert.match(route, /GCLID:/);
  assert.match(route, /type_config/);
  assert.match(route, /console\.warn/);
  assert.match(route, /const clickUpFieldMapping/);
  assert.doesNotMatch(route, /["']ICP["']\s*:/);
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
  assert.match(leadForm, /window\.location\.assign\(result\.redirectTo \?\? getLeadRedirectPath\(revenue\)\)/);
  assert.match(leadForm, /disabled=\{isSubmitting\}/);
  assert.match(leadForm, /alert\("N(?:ã|Ã£)o foi poss(?:í|Ã­)vel enviar suas informa(?:ç|Ã§)(?:õ|Ãµ)es\. Tente novamente\."\)/);
});
