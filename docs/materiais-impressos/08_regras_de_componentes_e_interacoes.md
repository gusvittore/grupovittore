# Regras atualizadas de componentes e interações

## Botões principais

A página deve usar poucos botões e todos devem direcionar para o WhatsApp.

CTA principal:

```txt
Quero mais informações
```

CTA secundário possível na Hero:

```txt
Conhecer materiais
```

Se o botão secundário for usado, ele pode rolar para a seção de prova social ou para a seção Feito sob encomenda.

Não criar CTAs individuais por produto.

## CTAs removidos

Remover CTAs antigos como:

```txt
Quero criar meu cartão premium
Quero uma apresentação mais profissional
Quero criar meu folder personalizado
Quero blocos personalizados
```

A página não terá mais seções individuais de produto.

## WhatsApp

Mensagem padrão:

```txt
Olá, vim pelo site do Grupo Vittore e quero mais informações sobre materiais gráficos personalizados.
```

Regras:

```txt
não inventar número
usar número oficial do projeto, se existir
se não houver número, usar placeholder claro
centralizar a URL em constante/helper, se possível
usar encodeURIComponent
não alterar integrações da Assessoria Comercial
```

## Prova social em movimento

A seção de depoimentos deve aparecer como Seção 2.

Manter ou ajustar a estrutura atual:

```txt
duas linhas de depoimentos
linha superior da direita para esquerda
linha inferior da esquerda para direita
5 estrelas em cada card
mais de 200 avaliações no Google
todas 5 estrelas
```

Regras:

```txt
animação suave
não exagerar velocidade
pausar no hover se possível
respeitar prefers-reduced-motion se possível
mobile legível
sem overflow horizontal
sem nomes falsos
```

## FAQ

A FAQ deve ficar em acordeon ou cards interativos, seguindo o padrão atual.

Regras:

```txt
fundo off-white
texto azul marinho
perguntas centralizadas ou em bloco central
boa área de clique no mobile
sem excesso de animação
```

## Rodapé

Manter o rodapé atual exatamente como está.

Não alterar componente de rodapé se ele já estiver correto.

## Interações que não devem ser criadas

Não criar:

```txt
formulário
popup
modal
chat próprio
integração com Supabase
integração com ClickUp
rastreamento novo
carrossel de produtos
cards individuais de produtos
```

## Responsividade

Testar:

```txt
360px
375px
390px
430px
desktop
```

Garantir:

```txt
sem overflow horizontal
sem palavra cortada
Hero legível
depoimentos funcionando
FAQ funcionando
CTA final legível
rodapé preservado
```
