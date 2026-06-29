import type { Metadata } from "next";
import { LegalPage } from "../_components/legal-page";

export const metadata: Metadata = {
  title: "Política de Privacidade | Grupo Vittore",
  description:
    "Entenda como o Grupo Vittore coleta, utiliza, armazena e protege dados pessoais em seus canais digitais.",
};

export default function PrivacyPolicyPage() {
  return (
    <LegalPage
      title="Política de Privacidade"
      subtitle="Esta Política de Privacidade explica como o Grupo Vittore coleta, utiliza, armazena e protege os dados pessoais fornecidos por usuários em nossos canais digitais."
      sections={[
        {
          title: "Informações gerais",
          children: (
            <p>
              Esta política se aplica aos usuários que acessam o site, preenchem
              formulários, entram em contato pelo WhatsApp, solicitam
              diagnóstico, orçamento ou informações sobre os serviços do Grupo
              Vittore. Esta base informativa não substitui revisão jurídica
              final.
            </p>
          ),
        },
        {
          title: "Dados que podemos coletar",
          children: (
            <>
              <p>Podemos coletar dados fornecidos diretamente pelo usuário ou gerados durante a navegação.</p>
              <ul>
                <li>nome;</li>
                <li>telefone/WhatsApp;</li>
                <li>e-mail;</li>
                <li>empresa;</li>
                <li>segmento;</li>
                <li>faixa de faturamento;</li>
                <li>cargo ou função, se informado;</li>
                <li>informações enviadas voluntariamente em formulários ou mensagens;</li>
                <li>
                  dados de navegação, como cookies, páginas acessadas, origem do
                  acesso e informações técnicas do dispositivo, quando aplicável.
                </li>
              </ul>
            </>
          ),
        },
        {
          title: "Como usamos os dados",
          children: (
            <>
              <p>Os dados podem ser utilizados para finalidades comerciais, operacionais e legais.</p>
              <ul>
                <li>responder solicitações;</li>
                <li>entrar em contato com leads;</li>
                <li>agendar diagnóstico comercial;</li>
                <li>enviar informações sobre serviços;</li>
                <li>qualificar oportunidades comerciais;</li>
                <li>melhorar a experiência do usuário;</li>
                <li>analisar desempenho de campanhas;</li>
                <li>cumprir obrigações legais e regulatórias;</li>
                <li>proteger direitos do Grupo Vittore.</li>
              </ul>
            </>
          ),
        },
        {
          title: "Base legal para tratamento",
          children: (
            <p>
              O tratamento de dados pode ocorrer com base em consentimento,
              execução de procedimentos preliminares relacionados à solicitação
              do usuário, legítimo interesse, cumprimento de obrigação legal ou
              regulatória e exercício regular de direitos.
            </p>
          ),
        },
        {
          title: "Compartilhamento de dados",
          children: (
            <>
              <p>
                Os dados podem ser compartilhados apenas quando necessário para
                as finalidades descritas nesta política.
              </p>
              <ul>
                <li>ferramentas de CRM;</li>
                <li>plataformas de automação;</li>
                <li>ferramentas de análise e marketing;</li>
                <li>provedores de hospedagem;</li>
                <li>ferramentas de comunicação;</li>
                <li>parceiros operacionais quando necessário para atendimento.</li>
              </ul>
            </>
          ),
        },
        {
          title: "Cookies e tecnologias de rastreamento",
          children: (
            <>
              <p>
                O site pode usar cookies e tecnologias semelhantes para
                funcionamento, análise de navegação, mensuração de campanhas,
                melhoria de experiência e remarketing, se aplicável.
              </p>
              <p>
                O usuário pode configurar o navegador para bloquear cookies,
                ciente de que algumas funcionalidades podem ser impactadas.
              </p>
            </>
          ),
        },
        {
          title: "Armazenamento e segurança",
          children: (
            <p>
              O Grupo Vittore adota medidas técnicas e organizacionais razoáveis
              para proteger dados pessoais contra acesso não autorizado, perda,
              alteração ou uso indevido.
            </p>
          ),
        },
        {
          title: "Direitos do titular dos dados",
          children: (
            <>
              <p>O usuário pode solicitar, quando aplicável:</p>
              <ul>
                <li>confirmação da existência de tratamento;</li>
                <li>acesso aos dados;</li>
                <li>correção de dados incompletos, inexatos ou desatualizados;</li>
                <li>anonimização, bloqueio ou eliminação de dados desnecessários;</li>
                <li>portabilidade, quando aplicável;</li>
                <li>informação sobre compartilhamento;</li>
                <li>revogação do consentimento, quando aplicável;</li>
                <li>eliminação de dados tratados com consentimento, quando aplicável.</li>
              </ul>
            </>
          ),
        },
        {
          title: "Retenção dos dados",
          children: (
            <p>
              Os dados serão mantidos pelo tempo necessário para cumprir as
              finalidades informadas, obrigações legais, resolução de disputas ou
              exercício regular de direitos.
            </p>
          ),
        },
        {
          title: "Links para sites de terceiros",
          children: (
            <p>
              O site pode conter links para canais externos, como WhatsApp,
              redes sociais, ferramentas de agendamento ou plataformas de
              terceiros. Esses ambientes possuem suas próprias políticas e
              práticas de privacidade.
            </p>
          ),
        },
        {
          title: "Alterações nesta política",
          children: (
            <p>
              Esta política pode ser atualizada periodicamente. A versão vigente
              estará disponível nesta página com a data da última atualização.
            </p>
          ),
        },
        {
          title: "Contato",
          children: (
            <p>
              Para dúvidas, solicitações ou exercício de direitos relacionados a
              dados pessoais, o usuário pode entrar em contato pelos canais
              oficiais do Grupo Vittore. E-mail:{" "}
              <a className="font-bold text-[#000717] underline decoration-[#B29157]" href="mailto:contato@grupovittore.com.br">
                contato@grupovittore.com.br
              </a>
              .
            </p>
          ),
        },
      ]}
    />
  );
}
