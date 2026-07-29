import assert from "node:assert/strict";
import { mkdtemp, readFile, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { pathToFileURL } from "node:url";
import test from "node:test";

const routeSource = await readFile(
  new URL("../src/app/api/leads/route.ts", import.meta.url),
  "utf8",
);

test("lead API responds before a slow background enqueue while keeping the job scheduled", async () => {
  assert.match(routeSource, /import \{ after \} from "next\/server"/);

  const postBody = routeSource.slice(routeSource.indexOf("export async function POST"));
  assert.match(postBody, /after\(async \(\) => \{[\s\S]*enqueueLeadBackgroundJob/);

  const tempDirectory = await mkdtemp(join(tmpdir(), "gv-lead-api-"));
  const routePath = join(tempDirectory, "route.ts");
  const corePath = join(tempDirectory, "lead-core.ts");
  const nextServerPath = join(tempDirectory, "next-server.ts");

  const transformedRoute = routeSource
    .replace(
      'import { after } from "next/server";',
      'import { after } from "./next-server.ts";',
    )
    .replace(
      /import \{\s*enqueueLeadBackgroundJob,[\s\S]*?\} from "@\/server\/lead-core";/,
      `import {
  enqueueLeadBackgroundJob,
  findRecentDuplicateLead,
  getSupabaseConfig,
  hasRequiredFields,
  qualifyLead,
  sanitizePayload,
  saveLeadToSupabase,
  type LeadApiTimings,
  type SupabaseConfig,
} from "./lead-core.ts";`,
    );

  await Promise.all([
    writeFile(routePath, transformedRoute),
    writeFile(
      nextServerPath,
      `export function after(task: () => Promise<void> | void) {
  (globalThis as any).__leadAfterTasks.push(task);
}
`,
    ),
    writeFile(
      corePath,
      `export type LeadApiTimings = {
  totalMs: number;
  validationMs: number;
  supabaseMs: number;
  enqueueMs: number;
  responseMs: number;
};
export type SupabaseConfig = { supabaseUrl: string; serviceRoleKey: string };
export function sanitizePayload(payload: any) { return payload; }
export function hasRequiredFields(payload: any) {
  return Boolean(payload.nome_completo && payload.email && payload.whatsapp && payload.empresa && payload.segmento && payload.faturamento_mensal);
}
export function qualifyLead() {
  return { statusQualificacao: "MQL", clickupStatus: "MQL", redirectTo: "/obrigado-qualificado" };
}
export function getSupabaseConfig() {
  return { supabaseUrl: "https://supabase.example", serviceRoleKey: "test" };
}
export async function findRecentDuplicateLead() { return null; }
export async function saveLeadToSupabase() { return "lead-1"; }
export async function enqueueLeadBackgroundJob() {
  (globalThis as any).__leadEnqueueCalls += 1;
  await new Promise((resolve) => setTimeout(resolve, 250));
  return { queued: true, status: 202, error: null };
}
`,
    ),
  ]);

  globalThis.__leadAfterTasks = [];
  globalThis.__leadEnqueueCalls = 0;

  try {
    const route = await import(`${pathToFileURL(routePath).href}?v=${Date.now()}`);
    const request = new Request("https://www.grupovittore.com.br/api/leads", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        nome_completo: "Lead Teste",
        email: "lead@example.com",
        whatsapp: "11999999999",
        empresa: "Empresa Teste",
        segmento: "Serviços",
        faturamento_mensal: "De 101 mil a 200 mil",
      }),
    });

    const startedAt = performance.now();
    const response = await route.POST(request);
    const responseMs = performance.now() - startedAt;
    const body = await response.json();

    assert.equal(response.status, 200);
    assert.equal(body.ok, true);
    assert.equal(body.savedToSupabase, true);
    assert.equal(body.backgroundStarted, true);
    assert.equal(globalThis.__leadEnqueueCalls, 0);
    assert.equal(globalThis.__leadAfterTasks.length, 1);
    assert.ok(responseMs < 100, `response took ${responseMs.toFixed(1)}ms`);

    await globalThis.__leadAfterTasks[0]();
    assert.equal(globalThis.__leadEnqueueCalls, 1);
  } finally {
    delete globalThis.__leadAfterTasks;
    delete globalThis.__leadEnqueueCalls;
    await rm(tempDirectory, { recursive: true, force: true });
  }
});
