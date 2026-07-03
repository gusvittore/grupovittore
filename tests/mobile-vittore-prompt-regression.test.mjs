import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const page = await readFile(new URL("../src/app/page.tsx", import.meta.url), "utf8");
const css = await readFile(new URL("../src/app/globals.css", import.meta.url), "utf8");
const workSection = await readFile(
  new URL("../src/app/_components/work-section.tsx", import.meta.url),
  "utf8",
);
const technology = await readFile(
  new URL("../src/app/_components/technology-section.tsx", import.meta.url),
  "utf8",
);

const radarSource = page.slice(
  page.indexOf("function PersonalizedRadar"),
  page.indexOf("function HeroPrimaryButton"),
);
const mobileCss = css.slice(css.indexOf("@media (max-width: 640px)"));
const formMobileHeading = page.slice(
  page.indexOf('className="section-title section-title-left form-title-mobile"'),
  page.indexOf("<Ornament", page.indexOf('className="section-title section-title-left form-title-mobile"')),
);

test("mobile hero and method visuals use controlled background layers", () => {
  assert.match(page, /className="hero-mobile-background"/);
  assert.match(page, /className="method-revenue-background"/);
  assert.match(
    mobileCss,
    /\.hero-mobile-visual\s*{[^}]*height:\s*clamp\(430px,\s*118vw,\s*540px\);[^}]*background-image:\s*none;/s,
  );
  assert.match(
    mobileCss,
    /\.hero-mobile-background\s*{(?=[^}]*width:\s*min\(960px,\s*210vw\);)(?=[^}]*height:\s*100%;)(?=[^}]*background-image:\s*url\("\/brand\/3\/background-hero\.png\.png"\);)(?=[^}]*background-position:\s*50% top;)(?=[^}]*background-size:\s*100% auto;)(?=[^}]*transform:\s*translateX\(-65%\);)[^}]*}/s,
  );
  assert.match(
    mobileCss,
    /\.hero-mobile-statue\s*{[^}]*background-position:\s*center bottom;[^}]*background-size:\s*min\(470px,\s*92vw\) auto;/s,
  );
  assert.match(
    mobileCss,
    /\.method-revenue-mobile-visual \.method-revenue-visual\s*{[^}]*min-height:\s*clamp\(430px,\s*118vw,\s*560px\);[^}]*background-image:\s*none;/s,
  );
  assert.match(
    mobileCss,
    /\.method-revenue-mobile-visual \.method-revenue-background\s*{(?=[^}]*width:\s*min\(990px,\s*212vw\);)(?=[^}]*height:\s*100%;)(?=[^}]*background-image:\s*url\("\/brand\/3\/background-sessao-4\.png\.png"\);)(?=[^}]*background-position:\s*50% top;)(?=[^}]*background-size:\s*100% auto;)(?=[^}]*transform:\s*translateX\(-70%\);)[^}]*}/s,
  );
  assert.match(
    mobileCss,
    /\.method-revenue-mobile-visual \.method-revenue-statue\s*{(?=[^}]*top:\s*24px;)(?=[^}]*width:\s*min\(720px,\s*154vw\);)[^}]*}/s,
  );
});

test("mobile form and internal section titles use wider controlled compositions", () => {
  assert.match(
    mobileCss,
    /--mobile-section-title:\s*clamp\(30px,\s*7\.2vw,\s*35px\);/,
  );
  assert.match(
    mobileCss,
    /--mobile-long-title:\s*clamp\(28px,\s*6\.8vw,\s*34px\);/,
  );
  assert.match(
    mobileCss,
    /\.form-copy \.form-title-mobile\s*{(?=[^}]*display:\s*block;)(?=[^}]*width:\s*calc\(100% \+ 16px\);)(?=[^}]*max-width:\s*calc\(100vw - 24px\);)(?=[^}]*font-size:\s*clamp\(25px,\s*6\.35vw,\s*30px\);)[^}]*}/s,
  );
  assert.doesNotMatch(formMobileHeading, /form-title-line/);
  assert.match(formMobileHeading, /perdendo vendas/);
  assert.match(
    mobileCss,
    /\.method-revenue-title\s*{[^}]*max-width:\s*calc\(100vw - 40px\);[^}]*font-size:\s*var\(--mobile-long-title\);/s,
  );
  assert.match(
    mobileCss,
    /\.sales-title-block > h2\s*{(?=[^}]*max-width:\s*min\(calc\(100vw - 84px\),\s*306px\);)(?=[^}]*font-size:\s*clamp\(28px,\s*6\.7vw,\s*30px\);)(?=[^}]*line-height:\s*1\.12;)[^}]*}/s,
  );
  assert.match(mobileCss, /\.sales-title-line\s*{[^}]*display:\s*inline;/s);
});

test("section 5 title casing is normal and mobile card numbers sit in the card corner", () => {
  assert.doesNotMatch(workSection, /NA PR[ÃÁ]TICA, [ÃÉ] ASSIM QUE O NOSSO TRABALHO ACONTECE/);
  assert.match(workSection, /Na pr(?:Ã¡|á)tica, (?:Ã©|é) assim que/);
  assert.match(
    mobileCss,
    /\.work-card\s*{[^}]*position:\s*relative;[^}]*padding:\s*54px 24px 32px;/s,
  );
  assert.match(
    mobileCss,
    /\.work-card-number-inline\s*{[^}]*display:\s*none;[^}]*}/s,
  );
  assert.match(
    mobileCss,
    /\.work-card-number-mobile\s*{(?=[^}]*position:\s*absolute;)(?=[^}]*top:\s*20px;)(?=[^}]*left:\s*20px;)(?=[^}]*z-index:\s*2;)(?=[^}]*display:\s*block;)(?=[^}]*text-align:\s*left;)[^}]*}/s,
  );
  assert.match(
    mobileCss,
    /\.work-card-heading\s*{[^}]*display:\s*block;[^}]*position:\s*static;/s,
  );
});

test("personalized radar and technology image are enlarged only on mobile without divider lines", () => {
  assert.doesNotMatch(css, /personalized-description-mobile::before|personalized-radar::after/);
  assert.match(mobileCss, /\.personalized-shell\s*{[^}]*gap:\s*14px;/s);
  assert.match(
    mobileCss,
    /\.personalized-radar\s*{(?=[^}]*width:\s*100%;)(?=[^}]*max-width:\s*430px;)(?=[^}]*min-height:\s*clamp\(364px,\s*98vw,\s*410px\);)(?=[^}]*margin:\s*-2px auto -10px;)(?=[^}]*transform:\s*none;)[^}]*}/s,
  );
  assert.match(
    mobileCss,
    /\.personalized-radar-svg\s*{(?=[^}]*width:\s*calc\(100% \+ 44px\);)(?=[^}]*max-width:\s*none;)(?=[^}]*transform:\s*translateX\(-28px\);)[^}]*}/s,
  );
  assert.match(mobileCss, /\.personalized-radar-label\s*{(?=[^}]*font-size:\s*15px;)(?=[^}]*stroke-width:\s*2\.25px;)[^}]*}/s);
  assert.match(mobileCss, /\.personalized-radar-label-crm\s*{[^}]*transform:\s*translate\(32px,\s*-6px\);/s);
  assert.match(mobileCss, /\.personalized-radar-label-ads\s*{(?=[^}]*text-anchor:\s*start;)(?=[^}]*transform:\s*translate\(42px,\s*-4px\);)[^}]*}/s);
  assert.match(mobileCss, /\.personalized-radar-label-processes\s*{[^}]*transform:\s*translate\(-10px,\s*0\);/s);
  assert.match(page, /<text x="520" y="152" className="personalized-radar-label personalized-radar-label-crm">CRM<\/text>/);
  assert.match(page, /<text x="574" y="308" textAnchor="start" className="personalized-radar-label personalized-radar-label-ads">\s*<tspan x="574">An(?:ú|Ãº)ncios<\/tspan>/);
  assert.match(page, /<text x="542" y="508" textAnchor="start" className="personalized-radar-label personalized-radar-label-performance-right">\s*<tspan x="542">Marketing de<\/tspan>/);
  assert.match(page, /<text x="126" y="328" textAnchor="end" className="personalized-radar-label personalized-radar-label-processes">Processos<\/text>/);
  assert.equal((radarSource.match(/Marketing de/g) ?? []).length, 1);
  assert.match(page, /className="personalized-radar-label personalized-radar-label-performance-right"/);
  assert.match(mobileCss, /\.personalized-radar-label-performance-right\s*{[^}]*transform:\s*translate\(-42px,\s*0\);/s);
  assert.match(
    mobileCss,
    /\.personalized-close\s*{(?=[^}]*width:\s*100%;)(?=[^}]*max-width:\s*430px;)(?=[^}]*padding:\s*20px 14px;)(?=[^}]*font-size:\s*clamp\(14px,\s*3\.75vw,\s*17px\);)(?=[^}]*line-height:\s*1\.13;)[^}]*}/s,
  );
  assert.match(
    page,
    /className="personalized-close-copy personalized-close-copy-mobile"[\s\S]*POR ISSO, O DIAGNÓSTICO,[\s\S]*O PLANO E O SERVIÇO QUE[\s\S]*APRESENTAMOS SÃO <span>EXCLUSIVOS<\/span>[\s\S]*PARA O <span>SEU NEGÓCIO\.<\/span>/,
  );
  assert.match(mobileCss, /\.personalized-close-copy-desktop\s*{[^}]*display:\s*none;/s);
  assert.match(mobileCss, /\.personalized-close-copy-mobile\s*{[^}]*display:\s*block;/s);
  assert.match(
    mobileCss,
    /\.personalized-close-copy-mobile \.personalized-close-line\s*{[^}]*display:\s*block;[^}]*white-space:\s*nowrap;/s,
  );
  assert.match(
    mobileCss,
    /\.personalized-description-mobile\s*{(?=[^}]*width:\s*100%;)(?=[^}]*max-width:\s*calc\(100vw - 40px\);)(?=[^}]*margin:\s*-4px auto 0;)(?=[^}]*border-top:\s*0;)(?=[^}]*padding-top:\s*0;)(?=[^}]*line-height:\s*1\.62;)[^}]*}/s,
  );
  assert.match(
    mobileCss,
    /\.technology-visual-mobile\s*{(?=[^}]*width:\s*100%;)(?=[^}]*max-width:\s*430px;)(?=[^}]*overflow:\s*visible;)[^}]*}/s,
  );
  assert.match(
    mobileCss,
    /\.technology-flow-image\s*{(?=[^}]*width:\s*min\(130vw,\s*528px\);)(?=[^}]*max-width:\s*none;)(?=[^}]*height:\s*auto;)(?=[^}]*transform:\s*translateX\(-2%\);)[^}]*}/s,
  );
  assert.match(
    mobileCss,
    /\.technology-copy,\s*\.technology-intro,\s*\.technology-applications\s*{(?=[^}]*width:\s*100%;)(?=[^}]*max-width:\s*calc\(100vw - 40px\);)[^}]*}/s,
  );
  assert.match(technology, /sizes="\(max-width: 767px\) 130vw,/);
});

test("protected areas remain untouched by this mobile correction", () => {
  assert.match(page, /<LeadForm \/>/);
  assert.match(page, /<footer id="rodape" className="site-footer">/);
  assert.match(page, /<Section id="diagnostico" className="diagnostic-section clean-off-white">/);
});
