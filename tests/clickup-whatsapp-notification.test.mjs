import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const processor = await readFile(
  new URL("../src/server/lead-processing.ts", import.meta.url),
  "utf8",
);

test("ClickUp task creation requests notifications", () => {
  assert.match(processor, /notify_all:\s*true/);
  assert.match(processor, /assignees:\s*\[assigneeId\]/);
});

test("ClickUp WhatsApp field matching accepts common phone field names", () => {
  assert.match(processor, /function normalizeFieldName/);
  assert.match(processor, /\.normalize\("NFD"\)/);
  assert.match(processor, /\.replace\(\/\[\\u0300-\\u036f\]\/g, ""\)/);
  assert.match(processor, /includes\("whatsapp"\)/);
  assert.match(processor, /includes\("telefone"\)/);
  assert.match(processor, /includes\("phone"\)/);
  assert.match(processor, /Campo WhatsApp encontrado:[\s\S]*field\.name[\s\S]*field\.type/);
  assert.match(processor, /Campo WhatsApp \/ Telefone nao encontrado no ClickUp/);
  assert.match(processor, /api\.clickup\.com\/api\/v2\/task\/\$\{taskId\}\/field\/\$\{field\.id\}/);
  assert.match(processor, /id: field\.id[\s\S]*value: resolvedValue/);
  assert.match(processor, /body: JSON\.stringify\(\{ value: customFieldPayload\.value \}\)/);
  assert.doesNotMatch(processor, /\+55/);
});

test("ClickUp comment notification is non-blocking", () => {
  assert.match(processor, /\/task\/\$\{taskId\}\/comment/);
  assert.match(processor, /Novo lead recebido pela landing page do Grupo Vittore\./);
  assert.match(processor, /Falha ao criar comentario no ClickUp:/);
  assert.match(processor, /Promise\.allSettled\(postClickupTasks\)/);
});
