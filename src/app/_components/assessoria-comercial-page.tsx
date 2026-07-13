import Image from "next/image";
import Link from "next/link";
import { LeadForm } from "./lead-form";
import { ServiceCarousel } from "./service-carousel";
import { TechnologySection } from "./technology-section";
import { WorkSection } from "./work-section";

const heroPillars = [
  {
    label: "Diagnóstico Estratégico",
    icon: "/assets/assessoria-comercial/icons/hero-icon-diagnostico-comercial.png.png",
  },
  {
    label: "Método Comercial",
    icon: "/assets/assessoria-comercial/icons/hero-icon-metodo-comercial.png.png",
  },
  {
    label: "Clareza e Controle",
    icon: "/assets/assessoria-comercial/icons/hero-icon-clareza-controle.png.png",
  },
];

const heroProofItems = [
  {
    label: "+100 EMPRESAS IMPACTADAS",
    icon: "/assets/assessoria-comercial/icons/hero-icon-empresas-impactadas.png.png",
  },
  {
    label: "FOCO EM RESULTADOS E RECEITA PREVISÍVEL",
    icon: "/assets/assessoria-comercial/icons/hero-icon-foco-resultado.png.png",
  },
  {
    label: "METODOLOGIA PRÓPRIA E COMPROVADA",
    icon: "/assets/assessoria-comercial/icons/hero-icon-metodologia-propria.png.png",
  },
  {
    label: "SIGILO, ÉTICA E PARCERIA DE VERDADE",
    icon: "/assets/assessoria-comercial/icons/hero-icon-sigilo-etica.png.png",
  },
];

const diagnosticMetrics = [
  {
    icon: "/assets/assessoria-comercial/icons/sessao-3-receita-prevista.png.png",
    title: "Receita prevista",
    value: "R$ 8,72M",
    delta: "▼ 28,4%",
  },
  {
    icon: "/assets/assessoria-comercial/icons/sessao-3-oportunidades.png.png",
    title: "Oportunidades",
    value: "142",
    delta: "▼ 31,5%",
  },
  {
    icon: "/assets/assessoria-comercial/icons/sessao-3-taxa-conversao.png.png",
    title: "Taxa de conversão",
    value: "24,7%",
    delta: "▼ 18,6%",
  },
  {
    icon: "/assets/assessoria-comercial/icons/sessao-3-ticket-medio.png.png",
    title: "Ticket médio",
    value: "R$ 36,8K",
    delta: "▼ 22,1%",
  },
  {
    title: "Evolução de receita",
  },
  {
    title: "Funil comercial",
  },
  {
    title: "Jornada do cliente",
  },
  {
    title: "Qualidade da demanda",
  },
  {
    title: "Gargalos e processos",
  },
  {
    title: "Maturidade comercial",
  },
];

const funnelStages = [
  ["Prospecção", "1.284 (100%)"],
  ["Qualificação", "512 (39,9%)"],
  ["Proposta", "187 (14,6%)"],
  ["Negociação", "63 (4,9%)"],
  ["Fechado", "29 (2,3%)"],
];

const journeySteps = [
  {
    label: "Descoberta",
    icon: "/assets/assessoria-comercial/icons/Jornada do Cliente/jornada-cliente-descoberta.png.png",
  },
  {
    label: "Atração",
    icon: "/assets/assessoria-comercial/icons/Jornada do Cliente/jornada-cliente-atracao.png.png",
  },
  {
    label: "Consideração",
    icon: "/assets/assessoria-comercial/icons/Jornada do Cliente/jornada-cliente-consideracao.png.png",
  },
  {
    label: "Compra",
    icon: "/assets/assessoria-comercial/icons/Jornada do Cliente/jornada-cliente-compra.png.png",
  },
  {
    label: "Experiência",
    icon: "/assets/assessoria-comercial/icons/Jornada do Cliente/jornada-cliente-experiencia.png.png",
  },
  {
    label: "Recompra",
    icon: "/assets/assessoria-comercial/icons/Jornada do Cliente/jornada-cliente-recompra.png.png",
  },
  {
    label: "Indicação",
    icon: "/assets/assessoria-comercial/icons/Jornada do Cliente/jornada-cliente-indicacao.png.png",
  },
];

const demandLegend = [
  ["Qualificados", "16%", "#001a44"],
  ["Em desenvolvimento", "31%", "#7e93a7"],
  ["Pouco qualificados", "38%", "#c9d0d7"],
  ["Desqualificados", "15%", "#a60012"],
];

const bottlenecks = [
  ["Qualificação inadequada", "42"],
  ["Falta de follow-up", "31"],
  ["Proposta sem aderência", "16"],
  ["Objeções mal tratadas", "11"],
];

const diagnosticInsights = [
  {
    icon: "/assets/assessoria-comercial/icons/sessao-3-baixa-conversao.png.png",
    text: "Baixa conversão causada por falhas de qualificação e follow-up.",
  },
  {
    icon: "/assets/assessoria-comercial/icons/sessao-3-receita-instavel.png.png",
    text: "Receita instável e sem previsibilidade de crescimento.",
  },
  {
    icon: "/assets/assessoria-comercial/icons/sessao-3-processo-comercial-reativo.png.png",
    text: "Processo comercial reativo, sem método e sem dados.",
  },
];

const clientLogos = [
  { src: "/assets/assessoria-comercial/brand/cliente-1.png.png", alt: "Cliente 01" },
  { src: "/assets/assessoria-comercial/brand/cliente-2.png.png", alt: "Cliente 02" },
  { src: "/assets/assessoria-comercial/brand/cliente-3.png.png", alt: "Cliente 03" },
  { src: "/assets/assessoria-comercial/brand/cliente-4.png.png", alt: "Cliente 04" },
  { src: "/assets/assessoria-comercial/brand/cliente-44.png.png", alt: "Cliente 05" },
  { src: "/assets/assessoria-comercial/brand/cliente-5.png.png", alt: "Cliente 06" },
  { src: "/assets/assessoria-comercial/brand/cliente-55.png.png", alt: "Cliente 07" },
  { src: "/assets/assessoria-comercial/brand/cliente-6.png.png", alt: "Cliente 08" },
  { src: "/assets/assessoria-comercial/brand/cliente-7.png.png", alt: "Cliente 09" },
  { src: "/assets/assessoria-comercial/brand/cliente-9.png.png", alt: "Cliente 10" },
  { src: "/assets/assessoria-comercial/brand/cliente-10.png.png", alt: "Cliente 11" },
  { src: "/assets/assessoria-comercial/brand/cliente-11.png.png", alt: "Cliente 12" },
  { src: "/assets/assessoria-comercial/brand/cliente-12.png.png", alt: "Cliente 13" },
  { src: "/assets/assessoria-comercial/brand/cliente-13.png.png", alt: "Cliente 14" },
];

const faqItems = [
  {
    question: "Para qual tamanho de empresa a assessoria do Grupo Vittore é indicada?",
    answer: [
      "A assessoria é indicada para empresas que já possuem operação validada, recebem oportunidades comerciais e faturam, em média, a partir de R$100 mil por mês.",
      "O foco não é atender negócios que ainda estão começando do zero, mas empresas que já vendem e sentem que poderiam crescer mais se tivessem mais clareza, processo comercial, geração de demanda e controle sobre os números.",
    ],
  },
  {
    question: "Já tenho uma equipe comercial ou de marketing interna. Por que contratar o Grupo Vittore?",
    answer: [
      "Porque ter equipe não significa, necessariamente, ter estratégia, método e visão externa.",
      "Muitas empresas têm pessoas executando tarefas todos os dias, mas ainda não conseguem enxergar com clareza onde as vendas travam, quais canais geram melhores oportunidades, quais leads são melhor conduzidos e quais pontos do processo precisam ser corrigidos primeiro.",
      "O Grupo Vittore entra para trazer direção, diagnóstico, método e visão sistêmica entre marketing, vendas e tecnologia.",
      "Não substituímos sua operação.",
      "Ajudamos sua operação a funcionar com mais clareza, controle e previsibilidade.",
    ],
  },
  {
    question: "Como saber se funciona para o meu segmento?",
    answer: [
      "O ponto principal não é o segmento.",
      "É entender que toda empresa é formada por pessoas vendendo para outras pessoas.",
      "Independente do nicho, uma decisão de compra passa por percepção de valor, confiança, clareza da oferta, timing, condução comercial, objeções e acompanhamento.",
      "Por isso, nosso trabalho não se baseia em “receitas prontas” para um mercado específico.",
      "Ele se baseia em princípios de comportamento de compra, jornada do consumidor, posicionamento, processo comercial e tomada de decisão.",
      "A execução muda de acordo com o setor.",
      "Mas os fundamentos que fazem uma pessoa confiar, avançar e comprar continuam sendo humanos.",
    ],
  },
  {
    question: "Qual o diferencial do Grupo Vittore para uma assessoria comercial comum?",
    answer: [
      "Uma assessoria comercial comum costuma olhar apenas para o vendedor, o script, a abordagem ou a rotina de follow-up.",
      "O Grupo Vittore olha para a arquitetura de receita como um todo.",
      "Isso significa analisar como marketing, vendas e tecnologia se conectam para gerar crescimento.",
      "Não adianta ter mais leads se o comercial não sabe conduzir.",
      "Não adianta ter CRM se ninguém usa direito.",
      "Não adianta ter proposta bonita se não existe acompanhamento.",
      "Não adianta cobrar mais da equipe se a gestão não enxerga onde a venda está travando.",
      "Nosso diferencial está em conectar estratégia, processo e execução para transformar oportunidades em vendas com mais método, clareza e previsibilidade.",
    ],
  },
  {
    question: "Quanto tempo leva para os resultados aparecerem?",
    answer: [
      "O diagnóstico inicial e o plano de ação começam nas primeiras semanas.",
      "Nesse período, o foco é entender a operação, identificar gargalos, organizar prioridades e definir os primeiros ajustes no processo comercial.",
      "Alguns ganhos podem aparecer rapidamente, principalmente em clareza, organização, follow-up e condução das oportunidades.",
      "Resultados mais consistentes em conversão, previsibilidade e crescimento tendem a aparecer com a continuidade da operação, conforme o processo é ajustado, medido e melhorado.",
      "O objetivo não é criar uma promessa rápida.",
      "É construir uma estrutura comercial mais inteligente, capaz de vender melhor ao longo do tempo.",
    ],
  },
];

function Eyebrow({
  children,
  variant = "lines",
}: {
  children: React.ReactNode;
  variant?: "lines" | "dots";
}) {
  const detailClass =
    variant === "dots"
      ? "eyebrow-dot h-[5px] w-[5px] flex-none rounded-full bg-[#B29157]"
      : "h-px flex-1 bg-[#B29157]/65";

  return (
    <p className="mx-auto flex w-full max-w-[720px] items-center justify-center gap-4 text-center text-[0.78rem] font-semibold uppercase leading-5 tracking-[0.2em] text-[#B29157] sm:text-[0.95rem] sm:tracking-[0.34em]">
      <span className={detailClass} />
      <span>{children}</span>
      <span className={detailClass} />
    </p>
  );
}

function Section({
  id,
  children,
  className = "",
}: {
  id?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section id={id} className={`page-grid relative overflow-hidden ${className}`}>
      <div className="mx-auto w-full max-w-[1240px] overflow-hidden px-5 py-16 sm:px-8 sm:py-20 lg:px-10 lg:py-24">
        {children}
      </div>
    </section>
  );
}

function Ornament({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center justify-center gap-4 ${className}`}>
      <span className="h-px w-24 bg-[#B29157]/70" />
      <span className="h-3 w-3 rotate-45 border border-[#B29157]" />
      <span className="h-px w-24 bg-[#B29157]/70" />
    </div>
  );
}

function TitleBlock({
  eyebrow,
  title,
  red,
  children,
  className = "",
  eyebrowVariant = "lines",
}: {
  eyebrow?: string;
  title: React.ReactNode;
  red?: React.ReactNode;
  children?: React.ReactNode;
  className?: string;
  eyebrowVariant?: "lines" | "dots";
}) {
  return (
    <div className={`mx-auto max-w-[980px] text-center ${className}`}>
      {eyebrow ? <Eyebrow variant={eyebrowVariant}>{eyebrow}</Eyebrow> : null}
      <h2 className="mt-6 font-serif text-[clamp(1.55rem,5.8vw,1.9rem)] font-medium leading-[1.1] text-[#090E1F] sm:text-[clamp(2.05rem,3vw,2.6rem)]">
        {title}
      </h2>
      {red ? (
        <p className="mx-auto mt-3 max-w-[900px] font-serif text-[clamp(1.5rem,5.8vw,1.9rem)] font-medium leading-[1.1] text-[#960000] sm:text-[clamp(2.1rem,3.1vw,2.7rem)]">
          {red}
        </p>
      ) : null}
      {children ? (
        <div className="mx-auto mt-7 max-w-[820px] text-lg leading-8 text-[#090E1F]/82 sm:text-xl">
          {children}
        </div>
      ) : null}
    </div>
  );
}

function PremiumCard({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`rounded-[8px] border border-[#B29157]/38 bg-[#FBF8F4]/80 shadow-[0_18px_45px_rgba(9,14,31,0.06)] ${className}`}
    >
      {children}
    </div>
  );
}

function MetricCard({
  icon,
  title,
  value,
  delta,
}: {
  icon?: string;
  title: string;
  value?: string;
  delta?: string;
}) {
  return (
    <article className="diagnostic-metric-card">
      <span className="diagnostic-metric-icon" aria-hidden="true">
        {icon ? (
          <Image
            src={icon}
            alt=""
            width={22}
            height={22}
            className="diagnostic-metric-icon-image"
          />
        ) : null}
      </span>
      <p>{title}</p>
      <strong>{value}</strong>
      <em>{delta}</em>
      <small>vs. período anterior</small>
    </article>
  );
}

function RevenueLineChart() {
  const points = [[92, 184], [134, 154], [176, 162], [218, 106], [260, 162], [302, 114], [344, 70], [386, 90], [428, 64], [470, 30], [512, 70], [554, 122]];
  const months = ["JAN", "FEV", "MAR", "ABR", "MAI", "JUN", "JUL", "AGO", "SET", "OUT", "NOV", "DEZ"];
  const yLabels = ["R$ 1,2M", "R$ 1,0M", "R$ 800K", "R$ 600K", "R$ 400K"];
  const gridRows = [30, 68, 106, 144, 182];

  return (
    <article className="diagnostic-panel diagnostic-line-panel">
      <h3>Evolução de receita</h3>
      <div className="line-chart-layout">
        <svg viewBox="0 0 590 228" role="img" aria-label="Evolução de receita mês a mês">
          {gridRows.map((y, index) => (
            <g key={y}>
              <text x="72" y={y + 4} textAnchor="end" className="chart-y-label">
                {yLabels[index]}
              </text>
              <line x1="84" x2="570" y1={y} y2={y} className="chart-grid-line" />
            </g>
          ))}
          <polyline points={points.slice(0, 10).map(([x, y]) => `${x},${y}`).join(" ")} className="chart-line-solid" />
          <polyline points={points.slice(9).map(([x, y]) => `${x},${y}`).join(" ")} className="chart-line-dashed" />
          {points.map(([x, y]) => <circle key={`${x}-${y}`} cx={x} cy={y} r="5" className="chart-line-point" />)}
          {months.map((month, index) => (
            <text key={month} x={92 + index * 42} y="216" className="chart-axis-label">{month}</text>
          ))}
        </svg>
      </div>
    </article>
  );
}

function FunnelChart() {
  const layers = [
    { points: "10,8 210,8 192,42 28,42", opacity: 1 },
    { points: "31,48 189,48 173,82 47,82", opacity: 0.72 },
    { points: "50,88 170,88 155,122 65,122", opacity: 0.48 },
    { points: "68,128 152,128 139,162 81,162", opacity: 0.28 },
    { points: "84,168 136,168 124,202 96,202", opacity: 0.16 },
  ];

  return (
    <article className="diagnostic-panel diagnostic-funnel-panel">
      <h3>Funil comercial</h3>
      <div className="funnel-layout">
        <svg className="funnel-svg" viewBox="0 0 220 210" aria-hidden="true">
          {layers.map((layer) => (
            <polygon
              key={layer.points}
              points={layer.points}
              fill="#001a44"
              opacity={layer.opacity}
            />
          ))}
        </svg>
        <div className="funnel-labels">
          {funnelStages.map(([stage, value]) => (
            <p key={stage}><strong>{stage}</strong><span>{value}</span></p>
          ))}
        </div>
      </div>
    </article>
  );
}

function CustomerJourney() {
  return (
    <article className="diagnostic-panel diagnostic-journey-panel">
      <h3>Jornada do cliente</h3>
      <div className="journey-track">
        {journeySteps.map((step, index) => (
          <div key={step.label} className="journey-step">
            <strong>{index + 1}</strong>
            <Image
              src={step.icon}
              alt=""
              width={44}
              height={44}
              className="journey-step-icon-image"
            />
            <p>{step.label}</p>
          </div>
        ))}
      </div>
    </article>
  );
}

function DemandQualityDonut() {
  return (
    <article className="diagnostic-panel diagnostic-small-panel demand-quality-panel">
      <h3>Qualidade da demanda</h3>
      <p className="diagnostic-panel-subtitle">Distribuição dos leads por nível de qualificação</p>
      <div className="donut-layout">
        <div className="donut-chart" aria-label="142 leads"><strong>142</strong><span>leads</span></div>
        <div className="donut-legend">
          {demandLegend.map(([label, value, color]) => (
            <p key={label}><i style={{ backgroundColor: color }} /><span>{label}</span><strong>{value}</strong></p>
          ))}
        </div>
      </div>
    </article>
  );
}

function ProcessBottlenecks() {
  return (
    <article className="diagnostic-panel diagnostic-small-panel bottleneck-panel">
      <h3>Gargalos do processo</h3>
      <p className="diagnostic-panel-subtitle">Principais pontos de perda de conversão</p>
      <div className="bottleneck-list">
        {bottlenecks.map(([label, value]) => (
          <div key={label} className="bottleneck-row">
            <span>{label}</span>
            <div><i style={{ width: `${value}%` }} /></div>
            <strong>{value}%</strong>
          </div>
        ))}
      </div>
    </article>
  );
}

function CommercialMaturityRadar() {
  return (
    <article className="diagnostic-panel diagnostic-small-panel maturity-panel">
      <h3>Maturidade comercial</h3>
      <p className="diagnostic-panel-subtitle">Avaliação dos pilares de performance</p>
      <svg viewBox="0 0 260 188" role="img" aria-label="Radar de maturidade comercial" className="maturity-radar-svg">
        {[72, 52, 32].map((radius) => (
          <polygon key={radius} points={`130,${94 - radius} ${130 + radius * 0.86},${94 - radius / 2} ${130 + radius * 0.86},${94 + radius / 2} 130,${94 + radius} ${130 - radius * 0.86},${94 + radius / 2} ${130 - radius * 0.86},${94 - radius / 2}`} className="radar-grid-polygon" />
        ))}
        {[0, 60, 120, 180, 240, 300].map((angle) => {
          const rad = ((angle - 90) * Math.PI) / 180;
          return <line key={angle} x1="130" y1="94" x2={130 + Math.cos(rad) * 78} y2={94 + Math.sin(rad) * 78} className="radar-axis-line" />;
        })}
        <polygon points="130,36 183,68 176,124 130,158 82,122 74,70" className="radar-fill-shape" />
        <polyline points="130,36 183,68 176,124 130,158 82,122 74,70 130,36" className="radar-outline-shape" />
        {[
          ["Processos", 130, 16], ["Pessoas", 214, 66], ["Dados", 212, 132],
          ["Tecnologia", 130, 182], ["Gestão", 44, 132], ["Estratégia", 44, 66],
        ].map(([label, x, y]) => (
          <text key={label} x={x} y={y} textAnchor="middle" className="radar-label-text">{label}</text>
        ))}
      </svg>
    </article>
  );
}

function SectionThreeDashboard() {
  return (
    <div className="section-three-dashboard" aria-label="Painel de diagnóstico comercial">
      <div className="dashboard-title-row">
        <span aria-hidden="true" />
        <h3>Diagnóstico Comercial</h3>
        <i aria-hidden="true" />
      </div>
      <div className="diagnostic-metrics-grid">
        {diagnosticMetrics.slice(0, 4).map((metric) => <MetricCard key={metric.title} {...metric} />)}
      </div>
      <div className="diagnostic-chart-grid">
        <RevenueLineChart />
        <FunnelChart />
        <CustomerJourney />
        <DemandQualityDonut />
        <ProcessBottlenecks />
        <CommercialMaturityRadar />
      </div>
      <div className="diagnostic-insights">
        {diagnosticInsights.map((item) => (
          <p key={item.text}>
            <span aria-hidden="true">
              <Image
                src={item.icon}
                alt=""
                width={20}
                height={20}
                className="diagnostic-insight-icon-image"
              />
            </span>
            {item.text}
          </p>
        ))}
      </div>
      <div className="diagnostic-dashboard-footer">
        <span aria-hidden="true" />
        <p>Método <b>•</b> Processo <b>•</b> Inteligência <b>•</b> Performance</p>
        <span aria-hidden="true" />
      </div>
    </div>
  );
}

function MethodRevenueVisual() {
  return (
    <div className="method-revenue-visual">
      <div className="method-revenue-background" aria-hidden="true" />
      <Image
        src="/assets/assessoria-comercial/brand/3/marco-aurelio-sessao4.png.png"
        alt=""
        width={1536}
        height={1024}
        sizes="(max-width: 1024px) 100vw, 62vw"
        className="method-revenue-statue"
        priority={false}
      />
    </div>
  );
}

function DiagnosticAssetPanel() {
  return <SectionThreeDashboard />;
}


function PersonalizedRadar() {
  const gridPolygons = [
    "360,260 399,276 415,315 399,354 360,370 321,354 305,315 321,276",
    "360,205 438,237 470,315 438,393 360,425 282,393 250,315 282,237",
    "360,150 477,198 525,315 477,432 360,480 243,432 195,315 243,198",
    "360,95 516,159 580,315 516,471 360,535 204,471 140,315 204,159",
  ];
  const majorGridPolygon = "360,80 526,149 595,315 526,481 360,550 194,481 125,315 194,149";
  const outerPoints = [
    [360, 80],
    [526, 149],
    [595, 315],
    [526, 481],
    [360, 550],
    [194, 481],
    [125, 315],
    [194, 149],
  ];
  const innerPoints = [
    [360, 135], [494, 188], [552, 315], [506, 461],
    [360, 503], [214, 461], [178, 315], [226, 188],
  ];
  const redPoints = [
    [360, 205], [430, 258], [462, 315], [500, 448],
    [360, 405], [234, 430], [250, 315], [285, 248],
  ];

  return (
    <div className="personalized-radar">
      <svg
        viewBox="0 0 720 620"
        role="img"
        aria-label="Radar da assessoria personalizada com oito pilares comerciais"
        className="personalized-radar-svg"
      >
        {[55, 105, 155, 205].map((radius) => (
          <circle
            key={radius}
            cx="360"
            cy="315"
            r={radius}
            className="personalized-radar-circle-grid"
          />
        ))}
        {gridPolygons.map((polygon) => (
          <polygon
            key={polygon}
            points={polygon}
            className="personalized-radar-octagon personalized-radar-octagon-minor"
          />
        ))}
        <polygon
          points={majorGridPolygon}
          className="personalized-radar-octagon personalized-radar-octagon-major"
        />
        <line x1="360" y1="315" x2="360" y2="80" className="personalized-radar-axis" />
        <line x1="360" y1="315" x2="526" y2="149" className="personalized-radar-axis" />
        <line x1="360" y1="315" x2="595" y2="315" className="personalized-radar-axis" />
        <line x1="360" y1="315" x2="526" y2="481" className="personalized-radar-axis" />
        <line x1="360" y1="315" x2="360" y2="550" className="personalized-radar-axis" />
        <line x1="360" y1="315" x2="194" y2="481" className="personalized-radar-axis" />
        <line x1="360" y1="315" x2="125" y2="315" className="personalized-radar-axis" />
        <line x1="360" y1="315" x2="194" y2="149" className="personalized-radar-axis" />
        <polygon
          points="360,104 508,165 570,315 512,463 360,520 211,462 150,315 211,166"
          className="personalized-radar-series personalized-radar-series-blue"
        />
        <polygon
          points="360,205 470,238 520,315 505,472 360,460 220,458 258,315 248,246"
          className="personalized-radar-series personalized-radar-series-gold"
        />
        <polygon
          points="360,205 430,258 462,315 500,448 360,405 234,430 250,315 285,248"
          className="personalized-radar-series personalized-radar-series-red"
        />
        {outerPoints.map(([x, y]) => (
          <circle
            key={`${x}-${y}`}
            cx={x}
            cy={y}
            r="5.5"
            className="personalized-radar-point"
          />
        ))}
        {innerPoints.map(([x, y]) => (
          <circle
            key={`inner-${x}-${y}`}
            cx={x}
            cy={y}
            r="4.2"
            className="personalized-radar-point personalized-radar-point-inner"
          />
        ))}
        {redPoints.map(([x, y]) => (
          <circle
            key={`red-${x}-${y}`}
            cx={x}
            cy={y}
            r="3.5"
            className="personalized-radar-point personalized-radar-point-red"
          />
        ))}
        <text x="360" y="38" textAnchor="middle" className="personalized-radar-label personalized-radar-label-top">
          <tspan x="360">Treinamento</tspan>
          <tspan x="360" dy="24">Comercial</tspan>
        </text>
        <text x="520" y="152" className="personalized-radar-label personalized-radar-label-crm">CRM</text>
        <text x="574" y="308" textAnchor="start" className="personalized-radar-label personalized-radar-label-ads">
          <tspan x="574">Anúncios</tspan>
          <tspan x="574" dy="24">online</tspan>
        </text>
        <text x="542" y="508" textAnchor="start" className="personalized-radar-label personalized-radar-label-performance-right">
          <tspan x="542">Marketing de</tspan>
          <tspan x="542" dy="24">Performance</tspan>
        </text>
        <text x="126" y="328" textAnchor="end" className="personalized-radar-label personalized-radar-label-processes">Processos</text>
        <text x="178" y="526" textAnchor="end" className="personalized-radar-label personalized-radar-label-technology">
          <tspan x="178">Tecnologia e</tspan>
          <tspan x="178" dy="24">automações</tspan>
        </text>
        <text x="168" y="150" textAnchor="end" className="personalized-radar-label">
          <tspan x="168">Gestão</tspan>
          <tspan x="168" dy="24">de Projetos</tspan>
        </text>
      </svg>
    </div>
  );
}

function HeroPrimaryButton() {
  return (
    <a
      href="#formulario"
      className="hero-primary-button"
    >
      QUERO MAIS INFORMAÇÕES
    </a>
  );
}

export function AssessoriaComercialPage() {
  return (
    <main className="min-h-screen bg-[#FBF8F4] text-[#090E1F]">
      <section id="topo" className="hero-section">
        <div className="hero-mobile-visual" aria-hidden="true">
          <div className="hero-mobile-background" />
          <div className="hero-mobile-statue" />
        </div>
        <div className="hero-shell">
          <div className="hero-main">
            <div className="hero-copy">
              <p className="hero-eyebrow">
                <span className="hero-eyebrow-desktop">
                  ASSESSORIA DE VENDAS E MARKETING DE PERFORMANCE
                </span>
                <span className="hero-eyebrow-mobile">
                  ASSESSORIA COMERCIAL E MARKETING DE PERFORMANCE
                </span>
              </p>
              <h1 className="hero-title">
                <span className="hero-title-desktop">
                  <span className="hero-title-line">Seu comercial não</span>
                  <span className="hero-title-line">
                    <span className="hero-title-highlight">perde vendas</span> só para
                  </span>
                  <span className="hero-title-line">concorrentes.</span>
                  <span className="hero-title-line">Ele também perde para</span>
                  <span className="hero-title-line">
                    <span className="hero-title-highlight">o próprio processo.</span>
                  </span>
                </span>
                <span className="hero-title-mobile">
                  <span className="hero-title-line">Seu comercial não</span>
                  <span className="hero-title-line">
                    <span className="hero-title-highlight">perde vendas</span> só para
                  </span>
                  <span className="hero-title-line">concorrentes.</span>
                  <span className="hero-title-line">Ele também perde para</span>
                  <span className="hero-title-line">
                    <span className="hero-title-highlight">o próprio processo.</span>
                  </span>
                </span>
              </h1>
              <div className="hero-title-rule" aria-hidden="true" />
              <p className="hero-support">
                Descubra onde suas oportunidades estão travando e transforme
                esforço em crescimento, clareza, método e controle.
              </p>
              <p className="hero-diagnostic-note">
                Agende seu diagnóstico comercial online com um especialista do Grupo Vittore.
              </p>
              <div className="hero-actions">
                <HeroPrimaryButton />
              </div>
              <div className="hero-pillars" aria-label="Pilares da assessoria">
                {heroPillars.map((item) => (
                  <div key={item.label} className="hero-pillar">
                    <span aria-hidden="true">
                      <Image
                        src={item.icon}
                        alt=""
                        width={32}
                        height={32}
                        className="hero-benefit-icon-image"
                      />
                    </span>
                    <p>{item.label}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="hero-visual" aria-hidden="true" />
          </div>

          <div className="hero-proof-grid" aria-label="Diferenciais do Grupo Vittore">
            {heroProofItems.map((item) => (
              <div key={item.label} className="hero-proof-item">
                <span aria-hidden="true">
                  <Image
                    src={item.icon}
                    alt=""
                    width={32}
                    height={32}
                    className="hero-benefit-icon-image"
                  />
                </span>
                <p>{item.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Section id="formulario" className="form-section clean-off-white">
        <div className="form-section-grid">
          <div className="form-copy">
            <h2 className="section-title section-title-left form-title-desktop">
              <span className="form-title-line">Agende uma reunião online,</span>
              <span className="form-title-line">receba um diagnóstico comercial</span>
              <span className="form-title-line">e descubra onde a sua empresa</span>
              <span className="form-title-line">pode estar <span className="form-title-highlight">perdendo vendas</span></span>
              <span className="form-title-line">dentro do próprio processo.</span>
            </h2>
            <h2 className="section-title section-title-left form-title-mobile">
              Agende uma reunião online, receba um diagnóstico comercial e
              descubra onde sua empresa pode estar{" "}
              <span className="form-title-highlight">perdendo vendas</span>{" "}
              dentro do próprio processo.
            </h2>
            <Ornament className="my-9 justify-start" />
            <div className="form-info-grid">
              <PremiumCard className="form-info-card">
                <p>Faça sua inscrição gratuita através de um rápido formulário.</p>
              </PremiumCard>
              <PremiumCard className="form-info-card">
                <p>
                  Em até 8h um especialista do Grupo Vittore entrará em contato
                  para marcar a reunião online de diagnóstico da sua empresa.
                </p>
              </PremiumCard>
            </div>
          </div>
          <LeadForm />
        </div>
      </Section>

      <Section id="diagnostico" className="diagnostic-section clean-off-white">
        <div className="diagnostic-section-grid">
          <div className="diagnostic-copy">
            <p className="section-eyebrow-left">PROCESSO COMERCIAL</p>
            <span className="section-small-rule" />
            <h2 className="section-title section-title-left">
              <span className="diagnostic-title-line">Você não tem lucro,</span>
              <span className="diagnostic-title-line diagnostic-title-accent">previsibilidade e nem</span>
              <span className="diagnostic-title-line diagnostic-title-accent">escala por esse motivo</span>
            </h2>
            <div className="diagnostic-points">
              <p>
                O seu time comercial evita o contato direto com o cliente, foge
                até de uma ligação por medo de ouvir um não ou conduzir mal a
                conversa.
              </p>
              <p>
                Se o cliente não chega praticamente decidido, eles não conseguem
                transformar o interesse em uma oportunidade real de venda.
              </p>
              <p>
                E as agências de marketing que aparecem prometem resultados
                extraordinários, mas no fim continuam presas em curtidas,
                comentários e seguidores.
              </p>
            </div>
          </div>
          <DiagnosticAssetPanel />
        </div>
      </Section>

      <section id="metodo-receita" className="method-revenue-section">
        <div className="method-revenue-overlay">
          <div className="method-revenue-shell">
            <div className="method-revenue-mobile-visual">
              <MethodRevenueVisual />
            </div>
            <div className="method-revenue-copy">
              <p className="section-eyebrow-left">MÉTODO E RECEITA</p>
              <span className="section-small-rule" />
              <h2 className="method-revenue-title">
                <span className="method-title-desktop">
                  <span className="method-title-line">Você não precisa de mais marketing,</span>
                  <span className="method-title-line method-title-accent">precisa de vendas acontecendo</span>
                  <span className="method-title-line method-title-accent">com método.</span>
                </span>
                <span className="method-title-mobile">
                  <span className="method-title-line">Você não precisa de</span>
                  <span className="method-title-line">mais marketing,</span>
                  <span className="method-title-line method-title-accent">precisa de vendas</span>
                  <span className="method-title-line method-title-accent">acontecendo com método.</span>
                </span>
              </h2>
              <div className="method-revenue-text">
                <p>
                  <span className="method-description-line">
                    É por isso que o Grupo Vittore concentra estratégia, tempo e
                  </span>
                  <span className="method-description-line">
                    execução no que realmente importa:
                  </span>
                </p>
                <strong>transformar oportunidades em receita.</strong>
                <p className="method-revenue-complement">
                  Inspirados pela visão estoica de <strong>Marco Aurélio</strong>,
                  acreditamos que grandes decisões não nascem do improviso, mas da{" "}
                  <em>clareza</em>. No crescimento de uma empresa, vender mais não
                  depende apenas de força, movimento ou volume, depende de{" "}
                  <em>método</em>, <em>controle</em> e <em>direção</em>.
                </p>
                <div className="method-revenue-actions">
                  <HeroPrimaryButton />
                </div>
              </div>
            </div>
            <MethodRevenueVisual />
          </div>
        </div>
      </section>

      <WorkSection />

      <Section id="clientes-parceiros" className="clients-section">
        <TitleBlock
          className="clients-title-block"
          eyebrow="CLIENTES E PARCEIROS"
          eyebrowVariant="dots"
          title="Nosso único objetivo é claro"
          red={
            <>
              <span className="client-claim-line">
                Fazer com que cada <span className="client-claim-accent">venda do seu negócio</span>
              </span>
              <span className="client-claim-line">
                seja <span className="client-claim-accent">previsível, lucrativa e recorrente.</span>
              </span>
            </>
          }
        >
          <p>
            Empresas que já acreditam no trabalho do Grupo Vittore e contam com
            a nossa assessoria comercial para vender com mais método,
            previsibilidade e controle.
          </p>
        </TitleBlock>
        <div className="client-logo-panel">
          <div className="client-logo-viewport">
            <div className="client-logo-track">
              {clientLogos.concat(clientLogos).map((client, index) => (
                <div
                  key={`${client.src}-${index}`}
                  className="client-logo-slot"
                  aria-hidden={index >= clientLogos.length}
                >
                  <div className="client-logo-image-wrap">
                    <Image
                      src={client.src}
                      alt={index < clientLogos.length ? client.alt : ""}
                      width={500}
                      height={220}
                      sizes="(max-width: 640px) 44vw, (max-width: 1100px) 30vw, 250px"
                      className="client-logo-image"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Section>

      <Section id="assessoria-vendas" className="sales-section">
        <TitleBlock
          className="sales-title-block"
          eyebrow="ASSESSORIA DE VENDAS"
          eyebrowVariant="dots"
          title={
            <>
              <span className="sales-title-line">O que faz parte da assessoria</span>
              <span className="sales-title-line">
                de vendas do Grupo Vittore?
              </span>
            </>
          }
        >
          <p>
            Uma estrutura comercial pensada para organizar o processo, atrair
            oportunidades certas e aumentar a conversão com mais método,
            controle e previsibilidade.
          </p>
        </TitleBlock>
        <ServiceCarousel />
      </Section>

      <section id="assessoria-personalizada" className="personalized-section">
        <div className="personalized-overlay">
          <div className="personalized-shell">
            <div className="personalized-copy">
              <p className="section-eyebrow-left">ASSESSORIA PERSONALIZADA</p>
              <span className="section-small-rule" />
              <h2>
                <span className="personalized-title-line">Por que o nosso</span>
                <span className="personalized-title-line">serviço não tem</span>
                <span className="personalized-title-line">planos <span className="personalized-title-accent">Black, Gold</span></span>
                <span className="personalized-title-line">ou <span className="personalized-title-accent">Platinum</span>?</span>
              </h2>
              <div className="personalized-description personalized-description-desktop">
                <p>
                  Porque, ao contrário do que o mercado faz, que é vender
                  serviços padrão de baixa qualidade, nós trabalhamos com
                  projetos personalizados.
                </p>
                <p>
                  Com cinco anos de atuação no mercado, entendemos que negócios
                  não funcionam com base em “receitinha de bolo”, que você copia
                  e cola de um negócio para o outro, mas sim com negócio de
                  ponta a ponta.
                </p>
              </div>
            </div>
            <PersonalizedRadar />
            <div className="personalized-description personalized-description-mobile">
              <p>
                Porque, ao contrário do que o mercado faz, que é vender
                serviços padrão de baixa qualidade, nós trabalhamos com
                projetos personalizados.
              </p>
              <p>
                Com cinco anos de atuação no mercado, entendemos que negócios
                não funcionam com base em “receitinha de bolo”, que você copia
                e cola de um negócio para o outro, mas sim com negócio de
                ponta a ponta.
              </p>
            </div>
            <strong className="personalized-close">
              <span className="personalized-close-copy personalized-close-copy-desktop">
                <span className="personalized-close-line">POR ISSO, O DIAGNÓSTICO, O PLANO E O SERVIÇO</span>
                <span className="personalized-close-line">QUE APRESENTAMOS SÃO <span>EXCLUSIVOS</span> PARA O <span>SEU NEGÓCIO.</span></span>
              </span>
              <span className="personalized-close-copy personalized-close-copy-mobile">
                <span className="personalized-close-line">POR ISSO, O DIAGNÓSTICO,</span>
                <span className="personalized-close-line">O PLANO E O SERVIÇO QUE</span>
                <span className="personalized-close-line">APRESENTAMOS SÃO <span>EXCLUSIVOS</span></span>
                <span className="personalized-close-line">PARA O <span>SEU NEGÓCIO.</span></span>
              </span>
            </strong>
          </div>
        </div>
      </section>

      <TechnologySection />

      <Section className="faq-section">
        <TitleBlock
          className="faq-title-block"
          eyebrow="FAQ"
          title="Tire suas dúvidas antes de começar"
        />
        <div className="faq-list">
          {faqItems.map((item) => (
            <details key={item.question} className="faq-item">
              <summary>
                {item.question}
                <span aria-hidden="true">+</span>
              </summary>
              <div>
                {item.answer.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </details>
          ))}
        </div>
      </Section>

      <footer id="rodape" className="site-footer">
        <div className="site-footer-shell">
          <div className="site-footer-main">
            <div className="site-footer-brand">
              <Image
                src="/assets/assessoria-comercial/brand/logotipo-principal-rodape.png.png"
                alt="Grupo Vittore"
                width={2174}
                height={1080}
                className="site-footer-logo"
              />
              <div className="site-footer-copy">
                <p>Grupo Vittore</p>
                <p>Hub de Crescimento Empresarial</p>
                <p>Marketing, Vendas, Tecnologia e IA</p>
              </div>
            </div>
            <a className="site-footer-top-link" href="#topo">
              <span aria-hidden="true" />
              Retornar ao topo
            </a>
          </div>
          <div className="site-footer-bottom">
            <p>2026 © Grupo Vittore. Todos os direitos reservados.</p>
            <nav className="site-footer-links" aria-label="Links legais">
              <Link href="/politicas-de-privacidade">Políticas de privacidade</Link>
              <Link href="/termos-de-uso">Termos de uso</Link>
            </nav>
          </div>
        </div>
      </footer>
    </main>
  );
}
