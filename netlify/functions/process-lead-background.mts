import { processLeadBackgroundJob } from "../../src/server/lead-processing";

export const config = {
  background: true,
  path: "/.netlify/functions/process-lead-background",
};

export default async function handler(request: Request) {
  const expectedSecret = process.env.LEAD_WORKER_SECRET;

  if (expectedSecret) {
    const receivedSecret = request.headers.get("x-lead-worker-secret");

    if (receivedSecret !== expectedSecret) {
      return new Response("Unauthorized", { status: 401 });
    }
  } else if (process.env.NODE_ENV !== "production") {
    console.warn(
      "LEAD_WORKER_SECRET ausente em desenvolvimento; permitindo worker local.",
    );
  } else {
    console.warn("LEAD_WORKER_SECRET ausente em producao; worker bloqueado.");
    return new Response("Unauthorized", { status: 401 });
  }

  let body: unknown;

  try {
    body = await request.json();
  } catch {
    body = {};
  }

  const leadId =
    typeof body === "object" &&
    body !== null &&
    !Array.isArray(body) &&
    typeof (body as { leadId?: unknown }).leadId === "string"
      ? (body as { leadId: string }).leadId
      : "";

  if (!leadId) {
    return new Response("leadId obrigatorio.", { status: 400 });
  }

  try {
    await processLeadBackgroundJob(leadId);
    return new Response(null, { status: 202 });
  } catch (error) {
    console.error("Falha no worker de lead:", error);
    return new Response("Erro ao processar lead.", { status: 500 });
  }
}
