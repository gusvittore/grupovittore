# Blog Grupo Vittore — Regras para Codex e Hermes

## Escopo

O blog é implementado dentro do projeto, na rota `/blog`, sem subdomínio. A arquitetura futura prevista é `/blog/[slug]` para artigos e `/blog/categoria/[categoria]` para categorias.

## Preservação obrigatória

Não alterar `/assessoria-comercial`, formulário, `/api/leads`, Supabase, ClickUp, envio de e-mail, Netlify Functions, `/obrigado`, `/obrigado-qualificado`, `/politicas-de-privacidade`, `/termos-de-uso` ou a home `/` sem necessidade estrita e autorização específica.

Não mover ou renomear assets existentes. Não instalar dependências sem necessidade. Não criar CMS, banco, API ou sistema real de visualizações nesta etapa.

## Direção visual

- fundo off-white;
- azul marinho como base textual;
- dourado usado com moderação;
- títulos serifados controlados;
- descrições legíveis;
- cards organizados e não comprimidos;
- respiro editorial;
- experiência mobile sem overflow.

## Validação

Antes de finalizar:

- executar testes focados do blog;
- executar `npm run lint`;
- executar `npm run build`;
- verificar `/blog`, `/`, `/sobre` e `/assessoria-comercial`;
- confirmar que os arquivos protegidos não mudaram;
- testar busca e filtros no browser;
- revisar `/blog` em 390px, 430px e 768px;
- revisar `/` e `/sobre` em 390px, 430px e 768px quando a rodada incluir responsividade mobile;
- não fazer commit automaticamente.
