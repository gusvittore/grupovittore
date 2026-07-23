# Prompt base atualizado para Hermes, LP Materiais Impressos

Use este prompt para reestruturar a página `/materiais-impressos`.

```txt
Hermes, precisamos reestruturar a landing page de Materiais Impressos do Grupo Vittore.

A página já existe, mas a estrutura atual está longa demais e com seções individuais de produtos. Vamos simplificar totalmente.

==================================================
ROTA OFICIAL
==================================================

Trabalhar somente na rota:

/materiais-impressos

Não criar nova rota.

==================================================
ANTES DE IMPLEMENTAR
==================================================

Leia todos os arquivos da pasta:

docs/materiais-impressos/

Trate esses documentos como regras obrigatórias.

Atenção especial para:

README.md
01_briefing_estrategico.md
04_estrutura_da_landing_page.md
05_copy_final_landing_page.md
06_direcao_visual_e_identidade.md
07_regras_de_imagens_e_assets.md
08_regras_de_componentes_e_interacoes.md
11_prompt_base_hermes.md
12_checklist_validacao.md

==================================================
OBJETIVO
==================================================

Reestruturar a página /materiais-impressos para ter somente 6 seções:

1. Hero, fundo azul marinho
2. Confiança comprovada, depoimentos Google, fundo off-white
3. Feito sob encomenda, fundo azul marinho
4. FAQ, fundo off-white
5. CTA final, fundo azul marinho
6. Rodapé, manter exatamente como está

==================================================
REMOVER SEÇÕES ANTIGAS
==================================================

Remover totalmente da página:

- seção de cartões de visita
- seção de pastas e envelopes
- seção de panfletos e folders
- seção de blocos de anotações
- qualquer seção individual de produto
- mockups repetidos dessas seções
- CTAs individuais de produto

A página pode citar cartões, pastas, envelopes, folders, panfletos e blocos na copy, mas não deve ter uma seção para cada um.

==================================================
REGRAS ABSOLUTAS DE PROTEÇÃO
==================================================

NÃO alterar /assessoria-comercial.
NÃO alterar formulário da Assessoria Comercial.
NÃO alterar /api/leads.
NÃO alterar Supabase.
NÃO alterar ClickUp.
NÃO alterar envio de e-mail.
NÃO alterar Netlify Functions.
NÃO alterar /obrigado.
NÃO alterar /obrigado-qualificado.
NÃO alterar /politicas-de-privacidade.
NÃO alterar /termos-de-uso.
NÃO alterar a Home Institucional.
NÃO alterar /blog.
NÃO alterar artigos.
NÃO alterar páginas individuais dos artigos.
NÃO alterar página Sobre.
NÃO alterar header global.
NÃO alterar menu mobile.
NÃO alterar logotipo.
NÃO alterar rodapé atual da página, pois ele está aprovado.
NÃO instalar biblioteca nova sem necessidade.
NÃO fazer commit automaticamente.

==================================================
SEÇÃO 1, HERO
==================================================

Fundo azul marinho.

Usar a nova imagem premium aprovada pelo Gustavo como referência visual principal da Hero.

A Hero deve seguir a nova referência enviada pelo Gustavo.

Conteúdo:

Eyebrow:
Materiais Gráficos Personalizados

Título:
Autoridade que se toca: impressos premium que materializam sua marca.

Descrição:
Cartões de visita, pastas, envelopes, folders, panfletos e blocos personalizados para profissionais e empresas que querem transmitir mais confiança, sofisticação e valor em cada detalhe.

Frase de apoio:
Do conceito ao papel, presença que lidera.

CTA principal:
Quero mais informações

CTA secundário, se mantido:
Conhecer materiais

Microcopy:
Pedidos sob encomenda pelo WhatsApp. Entregamos para todo o Brasil.

Benefícios:
Acabamento premium
Atendimento personalizado
Entrega para todo Brasil
Qualidade que transmite confiança
Design estratégico para fortalecer sua marca
Materiais que geram impacto
Detalhes que fazem a diferença

Não colocar logotipo dentro da Hero.

==================================================
SEÇÃO 2, CONFIANÇA COMPROVADA
==================================================

Mover a seção de depoimentos do Google para logo depois da Hero.

Fundo off-white.

Manter o estilo visual que já foi criado, se estiver funcionando.

Conteúdo:

Eyebrow:
Confiança comprovada

Título:
Mais de 200 avaliações no Google. Todas com 5 estrelas.

Descrição:
A confiança construída com nossos clientes aparece nos detalhes: no atendimento, na orientação, na produção e no cuidado com cada entrega.

Estrutura:
- cards de depoimentos
- 5 estrelas em cada card
- duas linhas em movimento
- linha superior da direita para esquerda
- linha inferior da esquerda para direita
- mobile legível
- sem overflow horizontal

Não inventar nomes de clientes.

==================================================
SEÇÃO 3, FEITO SOB ENCOMENDA
==================================================

Fundo azul marinho.

Conteúdo:

Eyebrow:
Feito sob encomenda

Título:
Cada material é pensado para representar o nível da sua marca.

Descrição:
No Grupo Vittore, materiais gráficos não são tratados como produtos de prateleira. Cada pedido é feito sob encomenda, considerando o tipo de profissional, o público que ele atende, a imagem que deseja transmitir e o uso real do material.

Blocos:

Personalizado para cada cliente
Nada de material genérico. Cada projeto é orientado para comunicar a presença, o posicionamento e o padrão visual da sua marca.

Pedidos pelo WhatsApp
Todo atendimento acontece de forma prática pelo WhatsApp, com orientação para entender o que você precisa e qual material faz mais sentido para sua marca.

Entrega para todo o Brasil
Produzimos materiais personalizados e enviamos para clientes em todo o Brasil, mantendo cuidado na produção, acabamento e entrega.

Acabamento com intenção
Papel, textura, formato e acabamento não são detalhes aleatórios. Eles ajudam a construir a percepção que o cliente terá da sua marca.

CTA:
Falar com o Grupo Vittore

==================================================
SEÇÃO 4, FAQ
==================================================

Fundo off-white.

Conteúdo:

Eyebrow:
Dúvidas frequentes

Título:
Antes de pedir seus materiais personalizados

Perguntas:
- Os pedidos são feitos somente por encomenda?
- Vocês entregam para todo o Brasil?
- O pedido é feito pelo WhatsApp?
- Vocês trabalham para todos os públicos?
- Quais materiais vocês produzem?
- Vocês criam a arte ou preciso enviar pronta?
- Existe pedido mínimo?
- Quanto tempo demora para produzir?
- Posso pedir algo mais premium ou sofisticado?

Usar as respostas do arquivo 05_copy_final_landing_page.md.

==================================================
SEÇÃO 5, CTA FINAL
==================================================

Fundo azul marinho.

Conteúdo:

Eyebrow:
Sua marca no mundo físico

Título:
Se a sua apresentação precisa transmitir mais valor, comece pelo material que o cliente vê, toca e guarda.

Descrição:
Materiais gráficos personalizados ajudam sua marca a sair do comum e a ocupar uma presença mais profissional na mente do cliente. Do cartão à pasta, do folder ao bloco de anotações, cada detalhe pode reforçar autoridade, confiança e sofisticação.

Botão:
Quero mais informações

Microcopy:
Fale pelo WhatsApp e solicite seu material sob encomenda.

==================================================
SEÇÃO 6, RODAPÉ
==================================================

Manter exatamente como está.

O rodapé atual está perfeito e aprovado.

Não alterar:
- estrutura
- logo
- textos
- links
- cores
- espaçamentos
- tipografia
- responsividade

==================================================
WHATSAPP
==================================================

Todos os botões principais devem abrir WhatsApp.

Mensagem padrão:

Olá, vim pelo site do Grupo Vittore e quero mais informações sobre materiais gráficos personalizados.

Não inventar número.

Usar número oficial do projeto, se existir.
Se não existir, usar placeholder claro.

==================================================
RESPONSIVIDADE
==================================================

Testar em:

360px
375px
390px
430px
desktop

Garantir:

- sem overflow horizontal
- sem palavra cortada
- Hero legível
- prova social funcionando
- FAQ funcionando
- CTA final legível
- rodapé preservado
- página curta e premium

==================================================
TESTES TÉCNICOS
==================================================

Rodar:

npm run build

Verificar:
- sem erro de TypeScript
- /materiais-impressos carrega
- /assessoria-comercial preservada
- /blog preservado
- Home preservada
- /api/leads preservada

==================================================
RELATÓRIO FINAL
==================================================

Ao finalizar, informe:

1. arquivos alterados
2. se removeu as seções individuais de produto
3. se a página ficou com 6 seções
4. se a Hero usa a nova imagem aprovada
5. se a prova social foi movida para a seção 2
6. se a seção Feito sob encomenda ficou como seção 3
7. se FAQ ficou como seção 4
8. se CTA final ficou como seção 5
9. se o rodapé foi mantido exatamente como estava
10. se botões apontam para WhatsApp
11. se preservou /assessoria-comercial
12. se preservou /blog
13. se preservou Home
14. se preservou /api/leads
15. se npm run build passou
16. pendências
17. não fazer commit automaticamente
```
