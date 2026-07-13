# Seção 5 e Novo Off-White Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Aplicar o novo fundo claro, corrigir os títulos das seções 3 e 4 e reproduzir a seção 5 com gráficos renderizados em código.

**Architecture:** As seções claras compartilharão uma superfície lisa `#FBF8F4`, sem padrões repetitivos. A seção 5 será extraída para um componente servidor próprio, composto por cards semânticos e quatro visualizações em SVG/CSS inline, mantendo o asset de fundo existente.

**Tech Stack:** Next.js 16.2.9, React 19, TypeScript, Tailwind CSS 4, CSS global e SVG inline.

---

### Task 1: Contrato de regressão

**Files:**
- Modify: `tests/sections-2-3-4.test.mjs`

- [ ] Exigir `#FBF8F4` nas superfícies claras e ausência de `background-image` em `.page-grid`.
- [ ] Exigir as quebras manuais de quatro linhas na seção 3 e três linhas na seção 4.
- [ ] Exigir o componente `WorkSection` e seus quatro gráficos em código.
- [ ] Rejeitar qualquer referência aos quatro PNGs antigos da seção 5.
- [ ] Rodar o teste e confirmar falha no estado atual.

### Task 2: Superfícies claras

**Files:**
- Modify: `src/app/globals.css`
- Modify: `src/app/page.tsx`
- Modify: `src/app/_components/lead-form.tsx`
- Modify: `src/app/_components/service-carousel.tsx`

- [ ] Aplicar `#FBF8F4` às seções 2, 3, 4, 6, 7, 9 e 10.
- [ ] Remover o grid repetitivo de `.page-grid`.
- [ ] Atualizar cards e controles claros dessas seções sem alterar sua estrutura.

### Task 3: Títulos

**Files:**
- Modify: `src/app/page.tsx`
- Modify: `src/app/globals.css`

- [ ] Dividir o título da seção 3 nas quatro linhas especificadas.
- [ ] Dividir o título da seção 4 nas três linhas especificadas.
- [ ] Ajustar presença, peso e responsividade dos títulos.

### Task 4: Seção 5

**Files:**
- Create: `src/app/_components/work-section.tsx`
- Modify: `src/app/page.tsx`
- Modify: `src/app/globals.css`

- [ ] Criar quatro cards principais com ícones SVG inline.
- [ ] Criar gráfico de linha de oportunidades em SVG.
- [ ] Criar donut de distribuição em CSS.
- [ ] Criar indicadores-chave com barras CSS.
- [ ] Criar desempenho comercial com barras CSS.
- [ ] Reproduzir cabeçalho, grid e faixa final conforme a referência.

### Task 5: Verificação

**Files:**
- Verify: `src/app/page.tsx`
- Verify: `src/app/globals.css`
- Verify: `src/app/_components/work-section.tsx`

- [ ] Rodar contrato, ESLint e TypeScript.
- [ ] Rodar build de produção.
- [ ] Validar responsividade e confirmar ausência de imagens nos gráficos.
