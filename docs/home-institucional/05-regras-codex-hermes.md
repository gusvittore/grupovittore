Home Institucional - Regras para Codex e Hermes

## Escopo oficial

Estas regras existem para orientar qualquer trabalho futuro na home institucional do Grupo Vittore, rota `/`, com base exclusiva nos documentos de `docs/home-institucional/` e nas referencias visuais da pasta correspondente.

## Regras principais

- usar somente `docs/home-institucional` para decisoes da home;
- usar `public/assets/home-institucional/references` como referencia visual principal;
- nao usar `docs/assessoria-comercial` para alterar a home, exceto quando for apenas para manter coerencia de marca;
- nao alterar `/assessoria-comercial` sem autorizacao;
- nao alterar `/api/leads`;
- nao alterar formulario;
- nao alterar Supabase;
- nao alterar ClickUp;
- nao alterar e-mail automatico;
- nao mover assets sem atualizar caminhos;
- nao criar landing de materiais graficos agora;
- nao criar blog completo agora;
- nao inventar artigos reais;
- nao fazer commit automaticamente;
- sempre rodar `npm run build`;
- sempre informar arquivos alterados.

## Regras de referencia visual

- a implementacao da home deve partir primeiro das referencias visuais de `public/assets/home-institucional/references`;
- a home deve ser tratada como pagina institucional principal, nao como landing agressiva;
- a direcao visual deve manter coerencia com a marca Grupo Vittore;
- a landing `/assessoria-comercial` continua sendo a referencia de profundidade para a frente comercial, nao a base estrutural da home.

## Regras de conteudo

- a home deve apresentar o ecossistema do Grupo Vittore;
- Materiais Graficos Personalizados devem ter destaque proprio;
- Assessoria Comercial deve aparecer como principal frente estrategica;
- Blog deve aparecer apenas como previa institucional nesta etapa;
- nao transformar cards do blog em artigos reais sem aprovacao;
- nao criar novas frentes fora das documentadas.

## Regras de seguranca de escopo

- nao editar arquivos fora de `docs/home-institucional/` quando a tarefa for apenas de documentacao;
- nao editar `docs/assessoria-comercial` nesta etapa;
- nao editar `docs/global` nesta etapa;
- nao editar codigo quando o escopo oficial for somente documentacao;
- qualquer divergencia entre nome esperado e nome real de asset deve ser registrada antes de orientar implementacao futura.

## Checklist obrigatorio antes de qualquer alteracao

1. Confirmar rota alvo.
2. Confirmar pasta de docs alvo.
3. Confirmar pasta de referencia visual alvo.
4. Confirmar que nao vai mexer em integracoes.
5. Confirmar que nao vai alterar a landing aprovada.
6. Rodar build ao final.

## Confirmacoes esperadas antes de trabalhar na home

Antes de executar alteracoes na home institucional, Codex ou Hermes devem validar internamente:

- rota alvo: `/`;
- pasta de documentacao alvo: `docs/home-institucional/`;
- pasta de referencia visual alvo: `public/assets/home-institucional/references/`;
- integracoes preservadas: API, formulario, Supabase, ClickUp e e-mail;
- landing aprovada preservada: `/assessoria-comercial`;
- build validado ao final.

## Resultado esperado

Qualquer trabalho futuro na home institucional deve:

- respeitar este conjunto de documentos;
- manter fidelidade as referencias visuais;
- preservar as integracoes existentes;
- deixar claro o que foi alterado;
- finalizar com `npm run build`;
- evitar escopo paralelo nao solicitado.
