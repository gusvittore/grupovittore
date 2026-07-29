import { after } from "next/server";
import {
  enqueueLeadBackgroundJob,
  findRecentDuplicateLead,
  getSupabaseConfig,
  hasRequiredFields,
  qualifyLead,
  sanitizePayload,
  saveLeadToSupabase,
  type LeadApiTimings,
  type SupabaseConfig,
} from "@/server/lead-core";

export const runtime = "nodejs";

function createApiDebug(
  savedToSupabase: boolean,
  backgroundStarted: boolean,
  timings: LeadApiTimings,
  enqueueError?: string | null,
) {
  return {
    savedToSupabase,
    queuedBackgroundJob: backgroundStarted,
    backgroundStarted,
    ...(enqueueError ? { enqueueError } : {}),
    timings: { ...timings },
  };
}

export async function POST(request: Request) {
  const startedAt = Date.now();
  const timings: LeadApiTimings = {
    totalMs: 0,
    validationMs: 0,
    supabaseMs: 0,
    enqueueMs: 0,
    responseMs: 0,
  };
  const finishTimings = (backgroundStarted = false) => {
    timings.totalMs = Date.now() - startedAt;
    timings.responseMs = timings.totalMs;
    console.log("Lead API timing:", {
      totalMs: timings.totalMs,
      validationMs: timings.validationMs,
      supabaseMs: timings.supabaseMs,
      enqueueMs: timings.enqueueMs,
      responseMs: timings.responseMs,
      backgroundStarted,
    });
  };

  const validationStartedAt = Date.now();
  let rawPayload: unknown;

  try {
    rawPayload = await request.json();
  } catch {
    rawPayload = {};
  }

  const payload = sanitizePayload(rawPayload);
  timings.validationMs = Date.now() - validationStartedAt;

  if (!hasRequiredFields(payload)) {
    finishTimings();

    return Response.json(
      {
        ok: false,
        error: "Campos obrigatorios ausentes.",
        debug: createApiDebug(false, false, timings),
      },
      { status: 400 },
    );
  }

  const qualification = qualifyLead(payload.faturamento_mensal);
  let supabaseConfig: SupabaseConfig;
  let leadId: string;
  const supabaseStartedAt = Date.now();

  try {
    supabaseConfig = getSupabaseConfig();

    try {
      const duplicateLead = await findRecentDuplicateLead(supabaseConfig, payload);

      if (duplicateLead) {
        timings.supabaseMs = Date.now() - supabaseStartedAt;
        finishTimings();

        return Response.json({
          ok: true,
          duplicate: true,
          savedToSupabase: true,
          queued: false,
          leadId: duplicateLead.id ? String(duplicateLead.id) : undefined,
          clickupTaskId: duplicateLead.clickup_task_id ?? undefined,
          redirectTo: qualification.redirectTo,
          debug: createApiDebug(true, false, timings),
        });
      }
    } catch (duplicateError) {
      console.warn(
        "Falha ao verificar duplicidade recente no Supabase:",
        duplicateError,
      );
    }

    leadId = await saveLeadToSupabase(
      supabaseConfig,
      payload,
      qualification,
      rawPayload,
    );
    timings.supabaseMs = Date.now() - supabaseStartedAt;
  } catch (error) {
    timings.supabaseMs = Date.now() - supabaseStartedAt;
    finishTimings();
    console.error("Erro ao salvar lead no Supabase:", error);

    return Response.json(
      {
        ok: false,
        error: "Nao foi possivel salvar o lead.",
        debug: createApiDebug(false, false, timings),
      },
      { status: 500 },
    );
  }

  const enqueueScheduledAt = Date.now();
  after(async () => {
    const enqueueStartedAt = Date.now();
    console.log("Lead background enqueue started:", {
      backgroundStarted: true,
    });

    const enqueueResult = await enqueueLeadBackgroundJob(request, leadId);
    const enqueueMs = Date.now() - enqueueStartedAt;
    console.log("Lead background enqueue timing:", {
      enqueueMs,
      backgroundStarted: true,
      queued: enqueueResult.queued,
      status: enqueueResult.status ?? null,
    });

    if (!enqueueResult.queued && enqueueResult.error) {
      console.warn(
        "Lead salvo, mas o processamento em segundo plano nao foi enfileirado:",
        enqueueResult.error,
      );
    }
  });
  timings.enqueueMs = Date.now() - enqueueScheduledAt;
  finishTimings(true);

  return Response.json({
    ok: true,
    savedToSupabase: true,
    queued: true,
    backgroundStarted: true,
    leadId,
    redirectTo: qualification.redirectTo,
    debug: createApiDebug(true, true, timings),
  });
}
