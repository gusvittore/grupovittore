# Consentimento de cookies — comportamento global

O aviso de cookies é um componente global renderizado pelo layout raiz. Ele não adiciona rastreadores, pixels, Google Analytics ou scripts externos.

## Exibição

- aparece somente quando não há escolha de consentimento salva;
- fica fixado no canto inferior direito em desktop;
- usa largura segura e margens laterais em mobile;
- é um card discreto e não modal, sem bloquear a navegação;
- contém os botões `Aceitar` e `Recusar` e o link para `/politicas-de-privacidade`.

## Persistência

A chave de `localStorage` é:

```text
cookie-consent-choice
```

Valores válidos:

```text
accepted
rejected
```

Depois de uma escolha, o card deixa de aparecer em novas navegações no mesmo navegador. Para testar a primeira visita, limpar a chave antes de atualizar a rota.

## Escopo

A manutenção do consentimento não deve modificar fluxos de leads, APIs, integrações ou o visual aprovado das páginas institucionais.
