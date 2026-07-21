# WhatsApp e conversÃ£o

## Objetivo do WhatsApp

O WhatsApp Ã© o principal canal de conversÃ£o da landing page.

A pÃ¡gina deve levar o visitante a iniciar uma conversa com intenÃ§Ã£o clara.

## CTA principal

> Quero mais informaÃ§Ãµes

## Mensagem padrÃ£o

```txt
OlÃ¡, vim pelo site do Grupo Vittore e quero mais informaÃ§Ãµes sobre materiais grÃ¡ficos personalizados.
```

## Mensagens por seÃ§Ã£o

### Hero

```txt
OlÃ¡, vim pelo site do Grupo Vittore e quero mais informaÃ§Ãµes sobre materiais grÃ¡ficos personalizados.
```

### CartÃµes de visita

```txt
OlÃ¡, vim pelo site do Grupo Vittore e quero mais informaÃ§Ãµes sobre cartÃµes de visita personalizados.
```

### Pastas e envelopes

```txt
OlÃ¡, vim pelo site do Grupo Vittore e quero mais informaÃ§Ãµes sobre pastas e envelopes personalizados.
```

### Panfletos e folders

```txt
OlÃ¡, vim pelo site do Grupo Vittore e quero mais informaÃ§Ãµes sobre panfletos e folders personalizados.
```

### Blocos de anotaÃ§Ãµes

```txt
OlÃ¡, vim pelo site do Grupo Vittore e quero mais informaÃ§Ãµes sobre blocos de anotaÃ§Ãµes personalizados.
```

### CTA final

```txt
OlÃ¡, vim pelo site do Grupo Vittore e quero criar materiais grÃ¡ficos personalizados para minha marca.
```

## Regras

- NÃ£o inventar nÃºmero de WhatsApp.
- Usar o nÃºmero oficial jÃ¡ configurado no projeto, se existir.
- Se nÃ£o existir nÃºmero configurado, criar constante ou placeholder claro para o Gustavo preencher.
- NÃ£o espalhar nÃºmero manualmente em vÃ¡rios componentes.
- Centralizar a URL de WhatsApp em um helper, constante ou config, se fizer sentido.
- Codificar a mensagem com encodeURIComponent.
- Abrir em nova aba quando adequado.
- Manter acessibilidade nos botÃµes.

## Eventos futuros

Se futuramente forem instalados Analytics, Pixel ou GTM, os cliques nos botÃµes de WhatsApp podem receber eventos como:

- `whatsapp_click_hero`
- `whatsapp_click_cartoes`
- `whatsapp_click_pastas`
- `whatsapp_click_folders`
- `whatsapp_click_blocos`
- `whatsapp_click_cta_final`

NÃ£o implementar rastreamento agora se o projeto ainda nÃ£o usa.

