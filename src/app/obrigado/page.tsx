import type { Metadata } from "next";
import { ThankYouPage } from "../_components/thank-you-page";

export const metadata: Metadata = {
  title: "Recebemos suas informações | Grupo Vittore",
  description:
    "Confirmação de recebimento das informações enviadas ao Grupo Vittore.",
};

export default function ThankYouPageNonQualified() {
  return (
    <ThankYouPage
      variant="light"
      eyebrow="Grupo Vittore"
      title="Recebemos suas informações"
      action={null}
      paragraphs={[
        "Obrigado pelo interesse no Grupo Vittore. As informações foram recebidas e nossa equipe poderá analisar o seu contato para entender o melhor caminho no momento atual da sua empresa.",
        "Enquanto isso, você pode acompanhar nossos conteúdos e materiais para entender melhor como marketing, vendas e tecnologia podem ajudar uma operação comercial a evoluir com mais método.",
      ]}
    />
  );
}
