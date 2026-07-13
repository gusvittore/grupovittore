# Ajuste das Seções 3 e 4 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Corrigir a diagramação da seção 3 e reconstruir a seção 4 com apenas texto, fundo existente e busto existente.

**Architecture:** Preservar a estrutura geral da página e limitar alterações a `page.tsx` e aos seletores CSS das seções 3 e 4. A seção 4 usará `background-sessao-4.png.png` como fundo e `marco-aurelio-sessao4.png.png` como único elemento visual em primeiro plano.

**Tech Stack:** Next.js 16.2.9, React 19, TypeScript, CSS global, SVG inline.

---

### Task 1: Contrato visual

**Files:**
- Modify: `tests/sections-2-3-4.test.mjs`

- [ ] Exigir as três linhas explícitas do título da seção 3.
- [ ] Exigir título limpo em “Evolução de receita” e conectores sólidos com seta.
- [ ] Exigir fundo existente e ausência de cards/gráficos recriados na seção 4.
- [ ] Rodar o teste e confirmar falha antes da implementação.

### Task 2: Seção 3

**Files:**
- Modify: `src/app/page.tsx`
- Modify: `src/app/globals.css`

- [ ] Separar o título em três spans de linha.
- [ ] Remover o ícone do título do gráfico de receita.
- [ ] Substituir o conector tracejado por linha fina com ponta de seta.

### Task 3: Seção 4

**Files:**
- Modify: `src/app/page.tsx`
- Modify: `src/app/globals.css`

- [ ] Reduzir `MethodRevenueVisual` ao busto existente.
- [ ] Remover CSS dos cards, widgets e gráficos recriados.
- [ ] Aplicar o asset de fundo existente e posicionar o busto à direita.
- [ ] Ajustar responsividade sem alterar a seção seguinte.

### Task 4: Verificação

**Files:**
- Verify: `src/app/page.tsx`
- Verify: `src/app/globals.css`

- [ ] Rodar teste de contrato, lint e build.
- [ ] Iniciar o projeto e validar estrutura/computed styles em desktop e mobile sem exportar imagens.
