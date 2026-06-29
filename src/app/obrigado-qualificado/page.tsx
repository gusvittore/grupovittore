import type { Metadata } from "next";
import { ThankYouPage } from "../_components/thank-you-page";

export const metadata: Metadata = {
  title: "Diagnóstico solicitado com sucesso | Grupo Vittore",
  description:
    "Confirmação de solicitação de diagnóstico comercial com o Grupo Vittore.",
};

export default function ThankYouPageQualified() {
  return (
    <ThankYouPage
      variant="dark"
      eyebrow="Diagnóstico comercial"
      title="Diagnóstico solicitado com sucesso"
      action={{
        label: "Falar com o Consultor",
        href: "https://wa.me/5511947035134?text=Ol%C3%A1%2C%20acabei%20de%20solicitar%20um%20diagn%C3%B3stico%20comercial%20e%20gostaria%20de%20mais%20informa%C3%A7%C3%B5es.",
        external: true,
      }}
      paragraphs={[
        "Recebemos suas informações. Pelo perfil informado, sua empresa pode ter oportunidades importantes de melhoria entre marketing, vendas, tecnologia e processo comercial.",
        "Nossa equipe irá analisar os dados enviados e poderá entrar em contato para entender melhor o cenário, os gargalos e os próximos passos para um diagnóstico mais estratégico.",
        "Normalmente, o próximo passo é uma conversa inicial para entender se faz sentido avançarmos com uma análise mais profunda da operação comercial.",
      ]}
    />
  );
}
