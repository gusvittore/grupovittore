import Image from "next/image";

const applications = [
  {
    content: (
      <>
        Mapeamos oportunidades de automação e inteligência artificial para
        simplificar processos operacionais,{" "}
        <strong>reduzir tarefas manuais e diminuir custos invisíveis</strong>{" "}
        na rotina da empresa.
      </>
    ),
  },
  {
    content: (
      <>
        Aplicamos tecnologia nas ações de marketing e vendas para gerar dados
        mais claros, <strong>melhorar a leitura da performance</strong> e apoiar
        decisões com mais precisão.
      </>
    ),
  },
  {
    content: (
      <>
        Acompanhamos os indicadores continuamente para entender o que está
        funcionando, corrigir gargalos e <strong>aumentar a conversão</strong>{" "}
        com mais controle sobre margens, esforço e resultado.
      </>
    ),
  },
];

export function TechnologySection() {
  return (
    <section id="inteligencia-tecnologia" className="technology-section">
      <div className="technology-shell">
        <div className="technology-copy">
          <p className="technology-eyebrow">
            TECNOLOGIA QUE GERA RESULTADO
          </p>
          <h2>
            <span className="technology-title-line">Inteligência, Tecnologia</span>
            <strong className="technology-title-line technology-title-accent">e Automação</strong>
          </h2>
          <div className="technology-title-ornament" aria-hidden="true">
            <span />
            <i />
          </div>
          <p className="technology-intro">
            Ajudamos sua empresa a identificar, implementar e usar a tecnologia
            certa para ganhar eficiência, reduzir desperdícios e transformar
            dados em decisões mais lucrativas.
          </p>

          <h3>
            Aplicações estratégicas
            <span aria-hidden="true" />
          </h3>
          <div className="technology-applications">
            {applications.map((application, index) => (
              <article key={index} className="technology-application">
                <span className="technology-application-marker" aria-hidden="true">
                  <i />
                </span>
                <p>{application.content}</p>
              </article>
            ))}
          </div>
          <div className="technology-cta">
            <a href="#formulario" className="hero-primary-button">
              QUERO MAIS INFORMAÇÕES
            </a>
          </div>
        </div>

        <div className="technology-visual" aria-label="Ecossistema de tecnologia conectado ao Grupo Vittore">
          <Image
            src="/brand/fluxogram-sessao9-2.png.png"
            alt="Fluxograma de tecnologia, automação e inteligência conectado ao Grupo Vittore"
            width={1254}
            height={1254}
            sizes="(max-width: 1100px) 100vw, 64vw"
            className="technology-flow-image"
          />
        </div>
      </div>
    </section>
  );
}
