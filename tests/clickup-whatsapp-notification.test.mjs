import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const route = await readFile(
  new URL("../src/app/api/leads/route.ts", import.meta.url),
  "utf8",
);

test("ClickUp task creation requests notifications", () => {
  assert.match(route, /notify_all:\s*true/);
  assert.match(route, /assignees:\s*\[assigneeId\]/);
});

test("ClickUp WhatsApp field matching accepts common phone field names", () => {
  assert.match(route, /includes\("whatsapp"\)/);
  assert.match(route, /includes\("telefone"\)/);
  assert.match(route, /includes\("phone"\)/);
  assert.match(route, /Campo WhatsApp encontrado:[\s\S]*field\.name[\s\S]*field\.id[\s\S]*field\.type/);
  assert.match(route, /Campo WhatsApp \/ Telefone n(?:ã|Ã£)o encontrado no ClickUp/);
  assert.match(route, /api\.clickup\.com\/api\/v2\/task\/\$\{taskId\}\/field\/\$\{field\.id\}/);
  assert.match(route, /body: JSON\.stringify\(\{ value: resolvedValue \}\)/);
  assert.doesNotMatch(route, /\+55/);
});

test("ClickUp comment notification is non-blocking", () => {
  assert.match(route, /\/task\/\$\{taskId\}\/comment/);
  assert.match(route, /Novo lead recebido pela landing page do Grupo Vittore\./);
  assert.match(route, /console\.warn\("Falha ao criar coment(?:a|á)rio no ClickUp:/);
});
