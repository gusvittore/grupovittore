import assert from "node:assert/strict";
import test from "node:test";
import { readFile } from "node:fs/promises";

const [page, assessoria] = await Promise.all([
  readFile(new URL("../src/app/materiais-impressos/page.tsx", import.meta.url), "utf8"),
  readFile(new URL("../src/app/_components/assessoria-comercial-page.tsx", import.meta.url), "utf8"),
]);

function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function assertInOrder(source, markers) {
  let previousIndex = -1;
  for (const marker of markers) {
    const index = source.indexOf(marker);
    assert.ok(index > previousIndex, `Expected ${marker} after the previous section`);
    previousIndex = index;
  }
}

function extract(source, startMarker, endMarker) {
  const start = source.indexOf(startMarker);
  assert.notEqual(start, -1, `Missing ${startMarker}`);
  const end = source.indexOf(endMarker, start);
  assert.notEqual(end, -1, `Missing ${endMarker} after ${startMarker}`);
  return source.slice(start, end + endMarker.length);
}

function normalizeMarkup(value) {
  return value.replace(/\s+/g, " ").trim();
}

test("/materiais-impressos has the new six-section structure in the approved order", () => {
  assertInOrder(page, [
    "<HeroSection />",
    "<SocialProofSection />",
    "<CustomMadeSection />",
    "<FaqSection />",
    "<FinalCtaSection />",
    "<MaterialsLandingFooter />",
    "<FloatingWhatsAppButton />",
  ]);

  assert.doesNotMatch(page, /productSections|ProductSection|ProductVisual/);
  for (const legacy of [
    'id="cartoes-de-visita"',
    'id="pastas-e-envelopes"',
    'id="panfletos-e-folders"',
    'id="blocos-personalizados"',
    "Quero criar meu cartão premium",
    "Quero uma apresentação mais profissional",
    "Quero criar meu folder personalizado",
    "Quero blocos personalizados",
  ]) {
    assert.doesNotMatch(page, new RegExp(escapeRegExp(legacy), "i"));
  }
});

test("Hero uses the approved local background, complete copy, benefits, and no internal logo", () => {
  const hero = extract(page, "function HeroSection", "function SocialProofCard");

  assert.match(hero, /\/assets\/materiais-impressos\/brand\/background-hero\.png\.png/);
  assert.match(hero, /preload/);
  assert.equal((hero.match(/\bpreload\b/g) ?? []).length, 1);
  assert.match(hero, /Materiais gráficos premium personalizados com cartões, pastas, folders e papelaria corporativa/);
  assert.match(hero, /Autoridade que se toca:/);
  assert.match(hero, /<span[^>]*>premium<\/span>/);
  assert.match(hero, /text-\[#B29157\][^>]*>premium/);
  assert.match(hero, /<h1 className="[^"]*text-balance[^"]*"/);
  assert.match(hero, /Do conceito ao papel, presença que lidera\./);
  assert.doesNotMatch(hero, /Conhecer materiais/);
  assert.doesNotMatch(hero, /href="#feito-sob-encomenda"/);
  assert.doesNotMatch(hero, /h-px w-12 bg-current/);
  assert.match(page, /const heroBenefits/);
  assert.doesNotMatch(hero, /logotipo|logo/i);

  for (const benefit of [
    "Acabamento premium",
    "Atendimento personalizado",
    "Entrega para todo Brasil",
    "Qualidade que transmite confiança",
    "Design estratégico para fortalecer sua marca",
    "Materiais que geram impacto",
  ]) {
    assert.match(page, new RegExp(escapeRegExp(benefit)));
  }
  assert.doesNotMatch(page, /Detalhes que fazem a diferença/);
  assert.match(page, /\{ label: "Materiais que geram impacto", icon: "star" \}/);
  assert.match(page, /atendimento-personalizado\.png\.png/);
  assert.match(page, /design-estrategico\.png\.png/);
  assert.doesNotMatch(page, /#D58C2B|#D0A65A|#9A671E|#CD872A/);
});

test("Hero mirrors the approved 16:9 composition with controlled lines and a 3 plus 4 benefit layout", () => {
  const hero = extract(page, "function HeroSection", "function SocialProofCard");

  assert.match(hero, /materials-hero/);
  assert.match(hero, /materials-hero-desktop/);
  assert.match(hero, /materials-hero-mobile/);
  assert.match(hero, /materials-hero-title-desktop/);
  const desktopTitle = extract(hero, "materials-hero-title-desktop", "</h1>");
  assertInOrder(desktopTitle, [
    "Autoridade que se toca:",
    "impressos",
    "materializam sua marca.",
  ]);
  assert.match(page, /\.materials-hero\s*\{[^}]*min-height:\s*max\(790px,\s*56\.28vw\)/s);
  assert.match(hero, /heroPrimaryBenefits\.map/);
  assert.match(hero, /heroSecondaryBenefits\.map/);
  assert.equal((page.match(/icon: "/g) ?? []).length, 10);
  assert.match(hero, /materials-hero-primary-benefits/);
  assert.match(hero, /materials-hero-secondary-benefits[^\n]*grid-cols-3/);
  assert.match(hero, /pl-10/);
  assert.match(hero, /materials-hero-artwork-frame[\s\S]*materials-hero-image[^\n]*object-cover[^\n]*object-center/);
});

test("WhatsApp buttons render the reference icon before their labels", () => {
  const button = extract(page, "function WhatsAppButton", "function Eyebrow");
  assert.match(page, /whatsapp-icon\.png\.png/);
  assertInOrder(button, ["<WhatsAppIcon />", "<span>{children}</span>"]);
});

test("all WhatsApp entry points use the requested encoded WhatsApp helper", () => {
  assert.match(page, /const MATERIALS_WHATSAPP_NUMBER = "5511966026686"/);
  assert.match(page, /Olá, vim pelo site da empresa e gostaria de mais informações sobre os materiais gráficos\./);
  assert.match(page, /encodeURIComponent\(message\)/);
  assert.match(page, /target="_blank"/);
  assert.match(page, /rel="noopener noreferrer"/);
  assert.match(page, /aria-label=\{`Abrir WhatsApp/);
  assert.equal((page.match(/<WhatsAppButton/g) ?? []).length, 4);
  assert.match(page, /function FloatingWhatsAppButton/);
  assert.match(page, /materials-floating-whatsapp/);
  assert.match(page, /animation: materials-floating-whatsapp-in 0\.5s ease 5s forwards/);

  for (const label of [
    "Quero mais informações",
    "Solicitar orçamento pelo WhatsApp",
  ]) {
    assert.match(page, new RegExp(escapeRegExp(label)));
  }
});

test("social proof and FAQ preserve the approved visual and interaction contracts", () => {
  assert.match(page, /testimonialRows/);
  assert.match(page, /materials-testimonial-row--left/);
  assert.match(page, /materials-testimonial-row--right/);
  assert.match(page, /prefers-reduced-motion: reduce/);
  assert.match(page, /Depoimentos em movimento/);
  assert.match(page, /name: "Francielle Vieira"/);
  assert.match(page, /name: "Vilmar Brasil \(Junior\)"/);
  assert.match(page, /<h3 className="[^"]*font-extrabold[^"]*">/);
  assert.match(page, /google-search-logo-icon-free-png\.webp/);
  assert.match(page, /Mais de 200 avaliações no Google\. Todas com 5 estrelas\./);
  assert.equal((page.match(/question: "/g) ?? []).length, 9);
  assert.match(page, /<details key=\{item\.question\} className="faq-item bg-white\/65">/);
  assert.doesNotMatch(page, /Posso pedir algo mais premium ou sofisticado/);
  assert.match(page, /Vocês oferecem garantia de satisfação\?/);
});

test("Feito sob encomenda has four numbered cards and the approved CTA copy", () => {
  for (const title of [
    "Personalizado para cada cliente",
    "Pedidos pelo WhatsApp",
    "Entrega para todo o Brasil",
    "Design que transmite valor",
  ]) {
    assert.match(page, new RegExp(escapeRegExp(title)));
  }
  assert.doesNotMatch(page, /Acabamento com intenção/);
  assert.match(page, /Cada material é pensado para comunicar profissionalismo antes mesmo da primeira conversa/);
  for (const icon of [
    "personalizado-cada-cliente.png.png",
    "pedidos-whatsapp.png.png",
    "entrega-brasil.png.png",
    "design-valor.png.png",
  ]) {
    assert.match(page, new RegExp(escapeRegExp(icon)));
  }

  assert.match(page, /Cada material é pensado para representar o nível da sua marca\./);
  assert.match(page, /String\(index \+ 1\)\.padStart\(2, "0"\)/);
  assert.match(page, /Solicitar orçamento pelo WhatsApp/);
});

test("dark sections mirror the approved 4:3 canvases and reference-scale controls", () => {
  const customMade = extract(page, "function CustomMadeSection", "function FaqSection");
  const finalCta = extract(page, "function FinalCtaSection", "function MaterialsLandingFooter");

  assert.match(customMade, /materials-custom-made-section/);
  assert.match(customMade, /materials-custom-title-desktop/);
  assert.match(customMade, /xl:h-\[285px\]/);
  assert.match(customMade, /materials-custom-cta/);
  assert.doesNotMatch(customMade, /materials-dark-texture|materials-outline-ornament/);
  assert.match(page, /\.materials-custom-made-section\s*\{[^}]*aspect-ratio:\s*9\s*\/\s*7/s);
  assert.match(page, /\.materials-custom-made-section\s*\{[^}]*min-height:\s*1120px/s);

  assert.match(finalCta, /materials-final-cta-section/);
  assert.match(finalCta, /background-sua-marca-no-mundo-referencia3\.png\.png/);
  assert.match(finalCta, /materials-final-cta-background/);
  assert.match(finalCta, /materials-final-title-mobile/);
  assert.match(finalCta, /materials-final-title-desktop/);
  assert.match(finalCta, /materials-final-cta-button/);
  assert.match(finalCta, /bg-\[#000617\]\/44/);
  assert.match(page, /\.materials-final-cta-section\s*\{[^}]*aspect-ratio:\s*1672\s*\/\s*941/s);
});

test("metadata and final CTA use the approved SEO and final copy", () => {
  assert.match(page, /Materiais Gráficos Personalizados \| Grupo Vittore/);
  assert.match(page, /Impressos premium sob encomenda para profissionais e empresas/);
  assert.match(page, /Sua marca no mundo físico/);
  assert.match(page, /Se a sua apresentação precisa transmitir mais valor, comece pelo material que o cliente vê, toca e guarda\./);
  assert.match(page, /Fale pelo WhatsApp e solicite seu material sob encomenda\./);
});

test("footer markup remains exactly equivalent to the approved Assessoria footer", () => {
  const materialsFooter = extract(page, '<footer id="rodape" className="site-footer">', "</footer>");
  const assessoriaFooter = extract(assessoria, '<footer id="rodape" className="site-footer">', "</footer>");
  assert.equal(normalizeMarkup(materialsFooter), normalizeMarkup(assessoriaFooter));
});