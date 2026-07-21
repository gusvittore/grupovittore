import assert from "node:assert/strict";
import test from "node:test";
import { readFile } from "node:fs/promises";

const page = await readFile(new URL("../src/app/materiais-impressos/page.tsx", import.meta.url), "utf8");

const requiredSections = [
  "Materiais Gráficos Personalizados",
  "Autoridade que se toca: impressos premium que materializam sua marca.",
  "Cartões de visita para quem não quer parecer comum.",
  "Pastas e envelopes que elevam a forma como sua empresa se apresenta.",
  "Panfletos e folders com presença, clareza e acabamento profissional.",
  "Cada material é pensado para representar o nível da sua marca.",
  "Blocos personalizados que mantêm sua marca presente na rotina do cliente.",
  "Mais de 200 avaliações no Google. Todas com 5 estrelas.",
  "Antes de pedir seus materiais personalizados",
  "Se a sua apresentação precisa transmitir mais valor",
];

const forbiddenTerms = [
  /cartão baratinho/i,
  /panfleto barato/i,
  /arte grátis/i,
  /gráfica rápida/i,
  /promoção/i,
];

test("/materiais-impressos is a complete premium landing page, not a placeholder", () => {
  assert.doesNotMatch(page, /PlaceholderPage/);
  assert.match(page, /export const metadata/);
  assert.match(page, /Materiais Gráficos Personalizados \| Grupo Vittore/);
  assert.match(page, /Impressos premium sob encomenda/);

  for (const text of requiredSections) {
    assert.match(page, new RegExp(text.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")));
  }

  for (const pattern of forbiddenTerms) {
    assert.doesNotMatch(page, pattern);
  }
});

test("WhatsApp links are centralized, encoded, accessible, and use the official project number", () => {
  assert.match(page, /const MATERIALS_WHATSAPP_NUMBER = "5511947035134"/);
  assert.match(page, /encodeURIComponent\(message\)/);
  assert.match(page, /https:\/\/wa\.me\/\$\{MATERIALS_WHATSAPP_NUMBER\}\?text=\$\{encodeURIComponent\(message\)\}/);
  assert.match(page, /target="_blank"/);
  assert.match(page, /rel="noopener noreferrer"/);
  assert.match(page, /aria-label=\{`Abrir WhatsApp/);
  for (const label of [
    "Quero mais informações",
    "Quero criar meu cartão premium",
    "Quero uma apresentação mais profissional",
    "Quero criar meu folder personalizado",
    "Falar com o Grupo Vittore",
    "Quero blocos personalizados",
  ]) {
    assert.match(page, new RegExp(label.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")));
  }
});

test("footer markup matches the Assessoria Comercial landing footer without touching that page", () => {
  assert.match(page, /<footer id="rodape" className="site-footer">/);
  assert.match(page, /site-footer-shell/);
  assert.match(page, /site-footer-main/);
  assert.match(page, /site-footer-bottom/);
  assert.match(page, /\/assets\/assessoria-comercial\/brand\/logotipo-principal-rodape\.png\.png/);
  assert.match(page, /2026 © Grupo Vittore\. Todos os direitos reservados\./);
  assert.match(page, /Políticas de privacidade/);
  assert.match(page, /Termos de uso/);
});

test("social proof, FAQ, placeholders, and reduced motion are implemented safely", () => {
  assert.match(page, /testimonialRows/);
  assert.match(page, /materials-testimonial-row--left/);
  assert.match(page, /materials-testimonial-row--right/);
  assert.match(page, /prefers-reduced-motion: reduce/);
  assert.match(page, /placeholder visual/i);
  assert.match(page, /Cartões de visita premium personalizados/);
  assert.match(page, /Pastas e envelopes personalizados/);
  assert.match(page, /Folders e panfletos personalizados/);
  assert.match(page, /Blocos de anotações personalizados/);
  assert.equal((page.match(/question: "/g) ?? []).length, 9);
});
