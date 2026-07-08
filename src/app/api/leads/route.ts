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
  queuedBackgroundJob: boolean,
  timings: LeadApiTimings,
  enqueueError?: string | null,
) {
  return {
    savedToSupabase,
    queuedBackgroundJob,
    ...(enqueueError ? { enqueueError } : {}),
    timings: { ...timings },
  };
}

export async function POST(request: Request) {
  const startedAt = Date.now();
  const timings: LeadApiTimings = {
    totalMs: 0,
    supabaseMs: 0,
    enqueueMs: 0,
  };
  const finishTimings = () => {
    timings.totalMs = Date.now() - startedAt;
    console.log("Lead API timing:", {
      totalMs: timings.totalMs,
      supabaseMs: timings.supabaseMs,
      enqueueMs: timings.enqueueMs,
    });
  };

  let rawPayload: unknown;

  try {
    rawPayload = await request.json();
  } catch {
    rawPayload = {};
  }

  const payload = sanitizePayload(rawPayload);

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

  const enqueueStartedAt = Date.now();
  const enqueueResult = await enqueueLeadBackgroundJob(request, leadId);
  timings.enqueueMs = Date.now() - enqueueStartedAt;
  finishTimings();

  if (!enqueueResult.queued && enqueueResult.error) {
    console.warn(
      "Lead salvo, mas o processamento em segundo plano nao foi enfileirado:",
      enqueueResult.error,
    );
  }

  return Response.json({
    ok: true,
    savedToSupabase: true,
    queued: enqueueResult.queued,
    leadId,
    redirectTo: qualification.redirectTo,
    debug: {
      savedToSupabase: true,
      queuedBackgroundJob: enqueueResult.queued,
      ...(enqueueResult.error ? { enqueueError: enqueueResult.error } : {}),
      timings: { ...timings },
    },
  });
}
