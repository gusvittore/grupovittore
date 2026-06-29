import type { Metadata } from "next";
import Link from "next/link";
import { LegalPage } from "../_components/legal-page";

export const metadata: Metadata = {
  title: "Termos de Uso | Grupo Vittore",
  description:
    "Conheça os termos que regulam o acesso e a utilização do site do Grupo Vittore.",
};

export default function TermsOfUsePage() {
  return (
    <LegalPage
      title="Termos de Uso"
      subtitle="Estes Termos de Uso regulam o acesso e a utilização do site do Grupo Vittore, incluindo páginas, conteúdos, formulários e canais digitais vinculados à empresa."
      sections={[
        {
          title: "Aceitação dos termos",
          children: (
            <p>
              Ao acessar o site ou utilizar seus formulários, o usuário declara
              estar ciente destes termos. Esta base informativa não substitui
              revisão jurídica final.
            </p>
          ),
        },
        {
          title: "Sobre o Grupo Vittore",
          children: (
            <p>
              O Grupo Vittore atua como Hub de Crescimento Empresarial, com
              soluções relacionadas a marketing, vendas, tecnologia, automações,
              inteligência artificial, assessoria comercial, consultoria,
              projetos personalizados e outras frentes comerciais da empresa.
            </p>
          ),
        },
        {
          title: "Uso do site",
          children: (
            <>
              <p>Ao utilizar o site, o usuário se compromete a:</p>
              <ul>
                <li>fornecer informações verdadeiras;</li>
                <li>não usar o site para fins ilícitos;</li>
                <li>não tentar comprometer a segurança do site;</li>
                <li>não copiar, reproduzir ou explorar conteúdos sem autorização;</li>
                <li>respeitar direitos de propriedade intelectual.</li>
              </ul>
            </>
          ),
        },
        {
          title: "Formulários e solicitações comerciais",
          children: (
            <p>
              O preenchimento de formulários não garante contratação, resultado
              ou atendimento automático. As informações enviadas poderão ser
              usadas para análise comercial, contato e qualificação da
              solicitação.
            </p>
          ),
        },
        {
          title: "Conteúdos informativos",
          children: (
            <p>
              Os conteúdos do site têm finalidade informativa e comercial, não
              constituindo promessa, consultoria individualizada ou garantia de
              resultado específico.
            </p>
          ),
        },
        {
          title: "Propriedade intelectual",
          children: (
            <p>
              Textos, imagens, layout, identidade visual, elementos gráficos,
              marcas, logotipos e conteúdos pertencem ao Grupo Vittore ou são
              utilizados mediante autorização ou licença. É proibida a
              reprodução sem autorização.
            </p>
          ),
        },
        {
          title: "Links externos e ferramentas de terceiros",
          children: (
            <p>
              O site pode conter links para WhatsApp, redes sociais, ferramentas
              de agendamento, plataformas de pagamento ou outros serviços
              externos. O Grupo Vittore não controla integralmente esses
              ambientes.
            </p>
          ),
        },
        {
          title: "Limitação de responsabilidade",
          children: (
            <p>
              O Grupo Vittore busca manter informações atualizadas, mas não
              garante ausência total de erros, indisponibilidades temporárias ou
              falhas técnicas.
            </p>
          ),
        },
        {
          title: "Privacidade e dados pessoais",
          children: (
            <p>
              O tratamento de dados pessoais é descrito na{" "}
              <Link
                className="font-bold text-[#000717] underline decoration-[#B29157] transition hover:text-[#960000]"
                href="/politicas-de-privacidade"
              >
                Política de Privacidade
              </Link>
              .
            </p>
          ),
        },
        {
          title: "Alterações dos termos",
          children: (
            <p>
              Estes Termos de Uso podem ser alterados periodicamente. A versão
              mais recente estará disponível nesta página.
            </p>
          ),
        },
        {
          title: "Lei aplicável",
          children: <p>Estes termos são regidos pelas leis brasileiras.</p>,
        },
        {
          title: "Contato",
          children: (
            <p>
              Para dúvidas sobre estes Termos de Uso, o usuário pode entrar em
              contato pelos canais oficiais do Grupo Vittore. E-mail:{" "}
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
