# Refino das Seções 1–7 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Refinar as seções 1–7 da landing page sem alterar a estrutura aprovada, aproximando as seções 5–7 das referências e corrigindo o carrossel para avançar um serviço por clique.

**Architecture:** Os ajustes pontuais permanecem em `page.tsx` e `lead-form.tsx`; a seção 5 continua isolada em `work-section.tsx`; o carrossel mantém sua fronteira Client Component e passa a controlar um índice ativo, rolando até o deslocamento real de cada card. A apresentação fica centralizada em `globals.css`, reutilizando somente os assets existentes.

**Tech Stack:** Next.js 16.2.9 App Router, React 19, TypeScript, Tailwind CSS 4, CSS global e `next/image`.

---

### Task 1: Contratos de regressão

**Files:**
- Create: `tests/sections-1-7-adjustments.test.mjs`

- [ ] Exigir a remoção dos ícones dos botões da Hero e formulário.
- [ ] Exigir o controle visual próprio das setas dos selects.
- [ ] Exigir a quebra de três linhas da seção 3 e o peso da seção 4.
- [ ] Exigir os nove serviços, suas nove imagens e rolagem por índice.
- [ ] Rodar `node --test tests/sections-1-7-adjustments.test.mjs` e confirmar falha.

### Task 2: Ajustes pontuais das seções 1–4

**Files:**
- Modify: `src/app/page.tsx`
- Modify: `src/app/_components/lead-form.tsx`
- Modify: `src/app/globals.css`

- [ ] Remover somente os ícones dos dois botões e o filete inferior do botão do formulário.
- [ ] Adicionar seta visual interna e consistente aos dois selects.
- [ ] Reorganizar o título da seção 3 em três linhas explícitas.
- [ ] Igualar família, peso e presença do título da seção 4 aos demais títulos claros.

### Task 3: Fidelidade das seções 5–6

**Files:**
- Modify: `src/app/_components/work-section.tsx`
- Modify: `src/app/page.tsx`
- Modify: `src/app/globals.css`

- [ ] Reposicionar o fundo, ampliar cabeçalho e subtítulo e ajustar as proporções da seção 5.
- [ ] Refinar cards, gráficos e chamada final sem converter gráficos em imagens.
- [ ] Aproximar título, subtítulo e faixa de placeholders da seção 6 da referência.

### Task 4: Carrossel da seção 7

**Files:**
- Modify: `src/app/_components/service-carousel.tsx`
- Modify: `src/app/globals.css`

- [ ] Mapear as nove imagens locais aos nove serviços na ordem definida.
- [ ] Renderizar imagem, número, título, descrição e CTA em cada card.
- [ ] Manter o primeiro card totalmente dentro do container.
- [ ] Avançar/recuar exatamente um índice e rolar ao `offsetLeft` do card correspondente.
- [ ] Atualizar dots e estados desabilitados das setas.

### Task 5: Verificação

**Files:**
- Verify: `src/app/page.tsx`
- Verify: `src/app/_components/lead-form.tsx`
- Verify: `src/app/_components/work-section.tsx`
- Verify: `src/app/_components/service-carousel.tsx`
- Verify: `src/app/globals.css`

- [ ] Rodar os testes Node.
- [ ] Rodar `npm run lint`.
- [ ] Rodar `npx tsc --noEmit`.
- [ ] Rodar `npm run build`.
- [ ] Iniciar `npm run dev` e validar desktop/mobile por captura local.
