import Image from "next/image";

const workCards = [
  {
    number: "01",
    title: "Processo Comercial",
    body: "Criamos um processo comercial para que cada oportunidade tenha direção, acompanhamento e o próximo passo definido.",
    icon: "/icons/sessao-5-processo-comercial.png",
  },
  {
    number: "02",
    title: "Geração de Demanda",
    body: "Ajustamos a geração de demanda para atrair contatos com mais intenção de compra, e não apenas volume.",
    icon: "/icons/sessao-5-geracao-demanda.png",
  },
  {
    number: "03",
    title: "Atendimento e Follow-up",
    body: "Organizamos a forma como a sua empresa atende, conduz propostas e faz follow-up para aumentar as chances de fechamento.",
    icon: "/icons/sessao-5-atendimento.png.png",
  },
  {
    number: "04",
    title: "Dados, Rotina e Tecnologia",
    body: "Conectamos dados, rotina comercial e tecnologia para que fique claro o que está funcionando, onde a venda trava e o que precisa ser corrigido primeiro.",
    icon: "/icons/sessao-5-dados-rotina.png.png",
  },
] as const;

function WorkflowIcon({ src }: { src: (typeof workCards)[number]["icon"] }) {
  return (
    <span className="work-card-icon" aria-hidden="true">
      <Image
        src={src}
        alt=""
        width={68}
        height={68}
        className="work-card-icon-image"
      />
    </span>
  );
}

function OpportunitiesLineChart() {
  const points = "34,102 76,88 118,94 160,62 202,70 244,35";
  return (
    <article className="work-chart-card">
      <h3>EVOLUÇÃO DE OPORTUNIDADES</h3>
      <p className="work-chart-kicker">Oportunidades geradas</p>
      <svg className="work-line-chart" viewBox="0 0 280 142" role="img" aria-label="Gráfico crescente de oportunidades entre janeiro e junho">
        {[28, 58, 88, 118].map((y) => (
          <line key={y} x1="30" x2="252" y1={y} y2={y} className="work-chart-grid-line" />
        ))}
        <polyline points={points} className="work-chart-line-shadow" />
        <polyline points={points} className="work-chart-line" />
        {[[34, 102], [76, 88], [118, 94], [160, 62], [202, 70], [244, 35]].map(([x, y]) => (
          <circle key={`${x}-${y}`} cx={x} cy={y} r="4" className="work-chart-point" />
        ))}
        {["JAN", "FEV", "MAR", "ABR", "MAI", "JUN"].map((month, index) => (
          <text key={month} x={34 + index * 42} y="136" className="work-chart-label">{month}</text>
        ))}
      </svg>
    </article>
  );
}

function FunnelDistributionChart() {
  return (
    <article className="work-chart-card">
      <h3>DISTRIBUIÇÃO DE FUNIL</h3>
      <p className="work-chart-kicker">Oportunidades por etapa</p>
      <div className="work-donut-layout">
        <div className="work-donut" aria-label="40% leads, 27% qualificados, 20% propostas e 13% fechados">
          <span>100%</span>
          <small>visibilidade</small>
        </div>
        <div className="work-donut-legend">
          <p><i className="legend-gold" /> Leads <strong>40%</strong></p>
          <p><i className="legend-blue" /> Qualificados <strong>27%</strong></p>
          <p><i className="legend-light" /> Propostas <strong>20%</strong></p>
          <p><i className="legend-red" /> Fechados <strong>13%</strong></p>
        </div>
      </div>
    </article>
  );
}

function KeyIndicatorsChart() {
  const indicators = [
    ["Taxa de Conversão", "72%"],
    ["Ciclo de Vendas", "86%"],
    ["Ticket Médio", "64%"],
    ["Previsibilidade", "78%"],
  ];
  return (
    <article className="work-chart-card">
      <h3>INDICADORES-CHAVE</h3>
      <p className="work-chart-kicker">Saúde da operação</p>
      <div className="work-indicators">
        {indicators.map(([label, value]) => (
          <div className="work-indicator" key={label}>
            <span className="work-indicator-check">✓</span>
            <p>{label}<strong>{value}</strong></p>
            <div><i style={{ width: value }} /></div>
          </div>
        ))}
      </div>
    </article>
  );
}

function CommercialPerformanceBars() {
  const months = [
    ["JAN", 42],
    ["FEV", 52],
    ["MAR", 62],
    ["ABR", 73],
    ["MAI", 84],
    ["JUN", 94],
  ];
  return (
    <article className="work-chart-card">
      <h3>DESEMPENHO COMERCIAL</h3>
      <p className="work-chart-kicker">Evolução mensal</p>
      <div className="work-bars" aria-label="Barras de desempenho comercial de janeiro a junho">
        {months.map(([month, height]) => (
          <div className="work-bar-column" key={month}>
            <div className="work-bar-track">
              <i style={{ height: `${height}%` }} />
            </div>
            <span>{month}</span>
          </div>
        ))}
      </div>
    </article>
  );
}

export function WorkSection() {
  return (
    <section id="como-trabalhamos" className="work-section">
      <div className="work-section-overlay">
        <div className="work-section-shell">
          <header className="work-heading">
            <p className="work-eyebrow">
              <span className="work-eyebrow-dot" aria-hidden="true" />
              COMO TRABALHAMOS
              <span className="work-eyebrow-dot" aria-hidden="true" />
            </p>
            <h2>
              <span className="work-heading-line">Na prática, é assim que</span>
              <span className="work-heading-line">o nosso <b>trabalho</b> acontece</span>
            </h2>
            <p className="work-heading-subtitle">
              Com uma arquitetura clara entre marketing, vendas e tecnologia,
              estruturamos o caminho para que a sua empresa pare de depender
              de improvisos e comece a vender com mais controle.
            </p>
          </header>

          <div className="work-card-grid">
            {workCards.map((card) => (
              <article key={card.number} className="work-card">
                <WorkflowIcon src={card.icon} />
                <div className="work-card-content">
                  <div className="work-card-heading">
                    <p className="work-card-number">{card.number}</p>
                    <h3>{card.title}</h3>
                  </div>
                  <span className="work-card-rule" />
                  <p>{card.body}</p>
                </div>
              </article>
            ))}
          </div>

          <div className="work-chart-grid">
            <OpportunitiesLineChart />
            <FunnelDistributionChart />
            <KeyIndicatorsChart />
            <CommercialPerformanceBars />
          </div>
        </div>
      </div>
    </section>
  );
}
