# Implementação Técnica das Capas dos Artigos do Blog

## Finalidade deste documento

Este documento define como o Hermes deve receber, organizar, otimizar, implementar e validar as imagens de capa dos artigos do blog do Grupo Vittore.

O Hermes não é responsável pela criação visual da capa.

As etapas de:

- definição do conceito;
- direção de arte;
- elaboração do briefing;
- geração da imagem;
- escolha da composição;
- revisão estética;
- aprovação visual;

acontecem fora do Hermes.

A imagem será criada no ChatGPT, revisada pelo usuário e entregue ao projeto como um arquivo aprovado.

A responsabilidade do Hermes começa quando a imagem já existe.

---

# Responsabilidades relacionadas à capa

## Responsabilidade do ChatGPT

O ChatGPT é responsável por:

- analisar o artigo;
- criar o conceito visual;
- criar o briefing;
- gerar a imagem;
- realizar ajustes visuais solicitados;
- entregar a versão final;
- propor um nome de arquivo quando necessário;
- sugerir o alt text com base na imagem final.

## Responsabilidade do usuário

O usuário é responsável por:

- aprovar o conceito;
- aprovar a imagem;
- solicitar alterações;
- definir qual versão será utilizada;
- colocar o arquivo final no projeto, quando fizer isso manualmente;
- informar ao Hermes qual imagem deve ser utilizada;
- autorizar substituições de imagens já publicadas.

## Responsabilidade do Hermes

O Hermes é responsável por:

- identificar a imagem aprovada;
- analisar a estrutura atual do projeto;
- localizar a pasta correta;
- mover ou copiar o arquivo quando solicitado;
- renomear o arquivo quando necessário;
- converter o formato quando apropriado;
- otimizar o peso;
- preservar a qualidade visual;
- atualizar o frontmatter;
- implementar a imagem no template;
- validar cards;
- validar desktop;
- validar mobile;
- validar compartilhamento;
- informar tudo que foi alterado.

---

# Limites da atuação do Hermes

O Hermes não deve:

- criar imagens;
- gerar novas capas;
- elaborar prompts de geração;
- alterar o conceito visual;
- redesenhar a composição;
- adicionar objetos;
- remover objetos;
- trocar o fundo;
- mudar a iluminação;
- aplicar filtros;
- adicionar texto;
- adicionar logotipo;
- inserir molduras;
- criar variações;
- escolher outra imagem sem autorização;
- substituir a imagem aprovada;
- recortar elementos importantes;
- editar cores por iniciativa própria;
- modificar a capa para parecer mais comercial;
- utilizar outra imagem encontrada no projeto;
- buscar imagens na internet;
- utilizar imagens de banco;
- inventar uma capa temporária.

Se a imagem estiver ausente, incorreta ou inadequada, o Hermes deve informar o problema.

Ele não deve tentar resolver a ausência criando outra imagem.

---

# Fluxo operacional

O fluxo correto é:

```text
Artigo produzido
↓
Artigo revisado
↓
Briefing de capa criado no ChatGPT
↓
Imagem gerada
↓
Imagem revisada
↓
Imagem aprovada pelo usuário
↓
Arquivo final colocado no projeto
↓
Hermes identifica o arquivo
↓
Hermes valida nome, formato e dimensões
↓
Hermes otimiza quando necessário
↓
Hermes atualiza o frontmatter
↓
Hermes valida a página e os cards
↓
Usuário revisa o resultado final
```

Não pule a aprovação da imagem.

---

# Pré-requisitos para implementação

Antes de implementar uma capa, o Hermes deve confirmar:

- qual artigo receberá a imagem;
- qual é o slug do artigo;
- qual arquivo foi aprovado;
- onde o arquivo está localizado;
- se existe mais de uma versão;
- qual versão deve ser utilizada;
- se o artigo já possui uma capa anterior;
- se a mudança é uma inclusão ou substituição;
- se o alt text foi fornecido;
- se o artigo está em rascunho ou publicado.

Quando houver mais de uma imagem parecida, não escolha por conta própria.

Solicite ou utilize a indicação explícita do usuário.

---

# Estrutura de pastas

A imagem deve ficar na estrutura pública já utilizada pelo projeto.

Antes de criar ou mover qualquer arquivo, o Hermes deve analisar:

- a pasta `public`;
- os caminhos das imagens existentes;
- o padrão dos artigos já implementados;
- o modo como o template resolve `coverImage`;
- a organização por categorias;
- a existência de pastas específicas para o blog.

Uma estrutura possível é:

```text
public/
└── assets/
    └── blog/
        └── articles/
            └── images/
```

Outra possibilidade é:

```text
public/
└── blog/
    └── articles/
        └── images/
```

Esses exemplos não definem automaticamente o caminho real.

O Hermes deve preservar a estrutura existente.

---

# Regra contra estruturas paralelas

O Hermes não deve criar uma segunda estrutura para imagens do blog quando já existir uma estrutura funcional.

Exemplo de erro:

```text
public/blog/images/
```

já existe, mas o Hermes cria:

```text
public/assets/articles/capas/
```

Isso gera:

- duplicação;
- inconsistência;
- dificuldade de manutenção;
- caminhos diferentes;
- arquivos órfãos;
- confusão em futuras publicações.

Antes de criar uma pasta, confirme que não existe outra com a mesma finalidade.

---

# Formato esperado da capa

O padrão visual de produção é:

```text
Largura: 1600 px
Altura: 900 px
Proporção: 16:9
Orientação: horizontal
```

O Hermes deve verificar as dimensões do arquivo recebido.

Se a imagem estiver em proporção diferente, não deve esticá-la.

Se a proporção estiver incorreta, informe a pendência antes da implementação.

---

# Formatos de arquivo

Os formatos possíveis incluem:

```text
.webp
.avif
.jpg
.jpeg
.png
```

Para fotografias e capas de blog, prefira:

```text
.webp
```

quando o projeto possuir suporte adequado.

A escolha final deve considerar:

- compatibilidade;
- qualidade;
- peso;
- sistema de imagens utilizado;
- processo de build;
- comportamento do framework.

---

# Conversão de formato

O Hermes pode converter uma imagem para WebP ou AVIF quando:

- o formato original for pesado;
- o projeto adotar esse padrão;
- a conversão não causar perda visual relevante;
- a extensão do caminho for atualizada;
- a nova imagem for validada.

O Hermes não deve converter quando:

- o projeto depende do formato original;
- houver transparência necessária;
- a conversão reduzir a qualidade;
- o usuário pedir para preservar o arquivo;
- o pipeline de imagens já fizer conversão automática.

A conversão é uma decisão técnica, não uma mudança estética.

---

# Preservação do arquivo original

Quando a imagem original for necessária para futuras edições, ela pode ser preservada fora da pasta pública.

A pasta `public` deve conter preferencialmente a versão utilizada pelo site.

Evite manter na pasta pública:

```text
imagem-original.png
imagem-original-final.png
imagem-final-2.png
imagem-final-corrigida.png
imagem-aprovada.webp
```

O site deve utilizar apenas o arquivo necessário.

Não apagar o original sem autorização quando ele tiver valor de produção.

---

# Nome do arquivo

O nome recomendado é:

```text
slug-do-artigo-capa.extensao
```

Exemplo:

```text
crm-controle-operacao-comercial-capa.webp
```

Outro exemplo:

```text
trafego-processo-comercial-desorganizado-capa.webp
```

O nome deve:

- usar letras minúsculas;
- usar hífens;
- não ter espaços;
- não ter acentos;
- não ter caracteres especiais;
- representar o artigo;
- evitar códigos genéricos;
- evitar termos como `final`, `novo` ou `corrigido`.

---

# Correspondência entre arquivo e slug

O nome da imagem deve possuir relação clara com o slug.

Exemplo:

```yaml
slug: "crm-controle-operacao-comercial"
```

Imagem:

```text
crm-controle-operacao-comercial-capa.webp
```

A correspondência ajuda:

- organização;
- localização;
- manutenção;
- substituição;
- auditoria;
- prevenção de arquivos duplicados.

Não é obrigatório que o nome seja idêntico ao título completo.

---

# Renomeação de imagem

O Hermes pode renomear a imagem quando:

- o arquivo possuir nome genérico;
- houver espaços;
- houver acentos;
- o nome não seguir o padrão;
- existir risco de conflito;
- o projeto exigir convenção específica.

Antes de renomear uma imagem já utilizada, verifique:

- referências no código;
- frontmatter;
- componentes;
- Open Graph;
- cache;
- páginas publicadas;
- outros artigos.

Não renomeie um arquivo publicado sem atualizar todos os caminhos correspondentes.

---

# Duplicidade de arquivos

Antes de copiar a imagem, verifique se já existe:

- arquivo com o mesmo nome;
- arquivo com conteúdo idêntico;
- versão antiga;
- versão em outro formato;
- capa associada ao mesmo artigo.

Quando houver duplicidade, não sobrescreva automaticamente.

Confirme:

- qual é a versão aprovada;
- qual deve ser mantida;
- se a anterior pode ser removida;
- se existe página publicada utilizando o arquivo antigo.

---

# Otimização de peso

O Hermes deve verificar se o arquivo possui peso desnecessário.

A otimização pode incluir:

- conversão de formato;
- compressão;
- remoção de metadados não necessários;
- redução para as dimensões utilizadas;
- uso do componente de imagem do projeto;
- geração de tamanhos responsivos.

A otimização deve preservar:

- nitidez;
- texturas;
- contraste;
- detalhes importantes;
- aparência fotográfica;
- ausência de artefatos visuais.

Não reduzir a qualidade apenas para alcançar um número arbitrário de kilobytes.

---

# Redimensionamento

Se a imagem for maior que o necessário, ela pode ser redimensionada para:

```text
1600 × 900 px
```

quando esse for o padrão final confirmado.

Não aumentar artificialmente uma imagem menor.

O redimensionamento para cima pode causar:

- perda de nitidez;
- aparência borrada;
- artefatos;
- qualidade inadequada em telas maiores.

Quando o arquivo recebido for menor que o padrão, informe a pendência.

---

# Recorte

O Hermes não deve recortar a imagem de forma permanente sem autorização.

Recortes realizados pelo layout podem ser aceitos quando:

- seguem o comportamento existente;
- utilizam `object-fit`;
- preservam o elemento principal;
- funcionam nos cards;
- funcionam no mobile.

Se o recorte automático remover a parte principal da imagem, o Hermes deve:

- ajustar a posição focal;
- rever o componente;
- informar o problema;
- solicitar uma nova composição quando necessário.

Não criar um novo corte destrutivo por iniciativa própria.

---

# Implementação no frontmatter

A imagem deve ser associada ao artigo por meio do campo:

```yaml
coverImage:
```

Exemplo conceitual:

```yaml
coverImage: "/assets/blog/articles/images/crm-controle-operacao-comercial-capa.webp"
```

O caminho exato depende da estrutura real do projeto.

O Hermes deve:

- confirmar o caminho público;
- confirmar que o arquivo existe;
- confirmar que a rota funciona;
- usar barras corretamente;
- evitar caminho de sistema local;
- evitar URL inventada.

---

# Caminhos locais proibidos

Nunca utilizar no frontmatter caminhos como:

```text
C:\Users\Usuario\Projeto\imagem.webp
```

```text
/home/projeto/public/imagem.webp
```

```text
../public/imagem.webp
```

quando o sistema espera um caminho público.

O caminho deve seguir a forma utilizada pelo site.

Exemplo conceitual:

```text
/assets/blog/articles/images/imagem.webp
```

---

# Campo `coverAlt`

O campo `coverAlt` deve descrever a imagem aprovada.

Exemplo:

```yaml
coverAlt: "Oportunidades comerciais organizadas em etapas sobre uma mesa executiva."
```

O alt text deve:

- descrever o que aparece;
- ser objetivo;
- ser natural;
- representar o elemento principal;
- ajudar acessibilidade;
- ter relação com o artigo.

O alt text não deve:

- repetir palavras-chave;
- listar serviços;
- fazer propaganda;
- descrever elementos inexistentes;
- repetir necessariamente o título;
- começar obrigatoriamente com “imagem de”;
- utilizar texto genérico.

---

# Alt text fornecido pelo usuário

Quando o usuário fornecer um alt text aprovado, o Hermes deve preservá-lo.

O Hermes pode corrigir:

- erro de digitação;
- caractere corrompido;
- aspas que quebrem o YAML;
- formatação técnica.

Não deve reescrever o alt text por preferência pessoal.

---

# Alt text ausente

Se a imagem estiver aprovada, mas o alt text não tiver sido informado, o Hermes pode propor uma descrição objetiva com base na imagem real.

A proposta deve:

- descrever apenas o que está visível;
- evitar interpretação exagerada;
- evitar palavras-chave artificiais;
- ser apresentada ao usuário quando houver dúvida.

Se o Hermes não conseguir analisar a imagem com segurança, deve solicitar o alt text.

---

# Campos vazios antes da implementação

Enquanto não houver imagem aprovada:

```yaml
coverImage: ""
coverAlt: ""
```

Não utilizar:

```yaml
coverImage: "/imagem-temporaria.webp"
```

```yaml
coverAlt: "Imagem a ser criada"
```

Não inserir placeholders.

---

# Imagem duplicada no corpo

A capa não deve ser inserida novamente no início do corpo do Markdown quando o template já a renderiza pelo frontmatter.

Evite:

```md
![Capa do artigo](/caminho/imagem.webp)
```

logo após o frontmatter.

Isso pode causar:

- imagem duplicada;
- carregamento desnecessário;
- inconsistência visual;
- problemas de layout;
- alt texts diferentes.

---

# Template do artigo

O template deve ser responsável por:

- ler `coverImage`;
- ler `coverAlt`;
- renderizar a imagem;
- manter proporção;
- aplicar tamanhos responsivos;
- carregar a imagem de forma otimizada;
- fornecer atributos de acessibilidade;
- evitar mudanças de layout;
- gerar imagem social quando previsto.

O Hermes deve verificar como o template atual funciona antes de alterar qualquer componente.

---

# Componente de imagem

Quando o projeto utilizar Next.js, a imagem pode ser renderizada com o componente de imagem adotado pelo projeto.

O Hermes deve preservar o padrão existente.

A implementação deve considerar:

- largura;
- altura;
- proporção;
- `sizes`;
- carregamento;
- prioridade;
- qualidade;
- alt text;
- responsividade;
- posição focal.

Não alterar o sistema de imagens global apenas para publicar uma capa.

---

# Dimensões declaradas

A imagem deve possuir dimensões conhecidas ou uma proporção reservada pelo layout.

Isso ajuda a evitar mudança de layout durante o carregamento.

Quando o componente exigir:

```text
width
height
```

utilize valores coerentes com a imagem.

Exemplo:

```text
width: 1600
height: 900
```

Não utilizar dimensões fictícias que distorçam a imagem.

---

# Prioridade de carregamento

A capa principal do artigo pode ser um elemento relevante para o carregamento inicial.

O Hermes deve avaliar:

- posição da imagem;
- LCP;
- componente utilizado;
- prioridade;
- lazy loading;
- versão mobile;
- peso.

Não aplique carregamento prioritário a todas as miniaturas e cards.

A prioridade deve ser utilizada apenas quando fizer sentido.

---

# Imagens em cards

A mesma capa pode aparecer em:

- página inicial do blog;
- listagem de artigos;
- categoria;
- artigos relacionados;
- busca;
- sidebar;
- página interna.

O Hermes deve validar:

- recorte;
- nitidez;
- carregamento;
- proporção;
- elemento principal;
- ausência de distorção;
- comportamento ao lado de outras capas.

A imagem não deve ficar correta apenas na página do artigo e quebrada nos cards.

---

# Desktop

Na versão desktop, verifique:

- resolução;
- nitidez;
- proporção;
- largura;
- altura;
- recorte;
- alinhamento;
- posição focal;
- relação com o título;
- carregamento;
- ausência de distorção.

---

# Mobile

Na versão mobile, verifique:

- se o elemento principal continua visível;
- se a imagem não fica excessivamente alta;
- se não existe rolagem horizontal;
- se não ocorre distorção;
- se o corte é aceitável;
- se o carregamento está adequado;
- se o título e a capa mantêm boa hierarquia;
- se a imagem não prejudica a estabilidade da página.

Não considerar a implementação concluída sem validar mobile.

---

# Open Graph e compartilhamento

Quando o projeto utilizar a capa como imagem social, o Hermes deve confirmar:

- se `og:image` recebe a imagem correta;
- se a URL é acessível;
- se a URL absoluta é gerada corretamente;
- se o tamanho é adequado;
- se a imagem não está bloqueada;
- se o canonical está correto;
- se a imagem funciona em compartilhamentos.

A implementação pode reutilizar `coverImage`.

Não criar uma segunda imagem social sem necessidade ou solicitação.

---

# URL absoluta da imagem

O frontmatter pode utilizar um caminho relativo, enquanto o sistema de metadados gera uma URL absoluta.

Exemplo no frontmatter:

```yaml
coverImage: "/assets/blog/articles/images/artigo-capa.webp"
```

Exemplo gerado pelo sistema:

```text
https://dominio-confirmado.com.br/assets/blog/articles/images/artigo-capa.webp
```

O Hermes não deve inserir domínio fictício no Markdown.

A geração da URL absoluta deve seguir a configuração real do projeto.

---

# Artigos em rascunho

Um artigo com:

```yaml
draft: true
```

pode receber capa para revisão.

Isso não significa que deve ser publicado.

O Hermes deve manter:

```yaml
draft: true
```

até receber autorização.

A presença da imagem não altera o status editorial.

---

# Substituição de capa publicada

Uma capa já publicada só deve ser substituída com autorização.

Antes da substituição, confirme:

- arquivo novo;
- aprovação;
- nome;
- caminho;
- alt text;
- cache;
- compartilhamento;
- cards;
- página interna.

Depois da substituição:

- remova referências antigas quando necessário;
- valide o novo arquivo;
- informe se o arquivo anterior ainda existe;
- não apague a imagem antiga sem autorização quando ela puder ser necessária.

A substituição da capa não exige alterar `updatedAt` quando o texto do artigo não mudou.

---

# Cache

Depois de substituir uma imagem utilizando o mesmo nome, o navegador, a CDN ou a plataforma pode continuar exibindo a versão anterior.

O Hermes deve avaliar:

- cache do framework;
- cache da hospedagem;
- CDN;
- nome do arquivo;
- processo de deploy.

Quando necessário, utilize:

- novo nome de arquivo;
- limpeza de cache;
- novo deploy;
- invalidação apropriada.

Não altere o nome sem atualizar todas as referências.

---

# Remoção de imagem antiga

Uma imagem antiga pode ser removida quando:

- não é mais utilizada;
- não está referenciada em outro artigo;
- não é necessária para histórico;
- a substituição foi validada;
- a remoção foi autorizada.

Antes de apagar:

1. pesquise referências;
2. verifique o frontmatter;
3. verifique componentes;
4. verifique artigos relacionados;
5. verifique metadados;
6. verifique a versão publicada.

Não deixar links quebrados.

---

# Direitos de uso

O Hermes deve presumir que a imagem fornecida e aprovada pelo usuário está autorizada para o projeto.

Mesmo assim, não deve:

- buscar outra imagem na internet;
- copiar material de terceiros;
- utilizar fotografia de banco sem confirmação;
- inserir logotipo de terceiros;
- reaproveitar imagens de outros projetos;
- utilizar arquivo de cliente;
- publicar imagem com marca d'água.

Se houver indício de que a imagem não pertence ao projeto, informe a pendência.

---

# Privacidade

Não implementar imagem que apresente de forma legível:

- nome de cliente;
- telefone;
- e-mail;
- faturamento;
- dados de CRM;
- documento;
- contrato;
- proposta;
- planilha;
- informação confidencial;
- tela interna;
- endereço;
- dado pessoal.

Quando houver dúvida, não publique.

---

# Acessibilidade

Toda capa editorial deve possuir alt text adequado.

O componente também deve:

- preservar o atributo `alt`;
- não usar alt genérico;
- não repetir texto irrelevante;
- evitar imagem como única fonte de informação;
- manter contraste quando houver sobreposição;
- funcionar com tecnologias assistivas.

A capa não substitui a explicação do artigo.

---

# Performance

A implementação deve evitar:

- imagem excessivamente pesada;
- envio do arquivo original gigantesco;
- ausência de dimensões;
- carregamento de múltiplas versões sem necessidade;
- prioridade em todas as imagens;
- recálculo de layout;
- formato incompatível;
- imagens duplicadas.

O Hermes deve validar o impacto no carregamento da página.

---

# Validação do caminho

Antes de concluir, confirme:

- o arquivo está na pasta correta;
- o nome está correto;
- a extensão está correta;
- o frontmatter aponta para o arquivo;
- o caminho abre no navegador;
- não existe erro 404;
- letras maiúsculas e minúsculas coincidem;
- o deploy inclui o arquivo;
- a página publicada usa a imagem correta.

Sistemas de arquivos podem tratar maiúsculas e minúsculas de formas diferentes.

Evite inconsistência.

---

# Validação do frontmatter

Exemplo:

```yaml
coverImage: "/caminho-real/artigo-capa.webp"
coverAlt: "Descrição objetiva da imagem aprovada."
```

Confirme:

- aspas fechadas;
- caminho correto;
- alt text correto;
- ausência de campos duplicados;
- ausência de URL fictícia;
- ausência de caracteres corrompidos;
- compatibilidade com o parser.

---

# Validação de build

Depois da implementação, execute os comandos existentes no projeto.

Exemplos comuns:

```bash
npm run lint
npm run build
```

Consulte o `package.json`.

Não presuma os comandos sem verificar.

Se o projeto tiver testes específicos, execute-os.

---

# Validação visual obrigatória

Depois do build, valide no navegador:

- página inicial do blog;
- card do artigo;
- página do artigo;
- categoria;
- artigos relacionados;
- mobile;
- desktop;
- compartilhamento, quando possível.

Não considerar concluído apenas porque o build passou.

---

# Problemas que impedem a conclusão

A tarefa não está concluída quando houver:

- arquivo ausente;
- caminho quebrado;
- erro 404;
- imagem incorreta;
- imagem não aprovada;
- imagem deformada;
- imagem borrada;
- alt text ausente;
- alt text incorreto;
- frontmatter inválido;
- recorte que remove o elemento principal;
- erro no card;
- erro no mobile;
- erro de build;
- imagem excessivamente pesada;
- imagem duplicada;
- capa antiga ainda exibida;
- arquivo com informações confidenciais.

---

# Relatório após implementação

Ao concluir, o Hermes deve informar:

```text
Artigo:
Slug:
Imagem utilizada:
Arquivo original recebido:
Arquivo final utilizado:
Caminho público:
Formato:
Dimensões:
Otimização realizada:
coverImage:
coverAlt:
Arquivos modificados:
Testes executados:
Resultado em desktop:
Resultado em mobile:
Pendências:
```

Não precisa usar exatamente essa formatação quando houver um padrão de relatório no projeto.

Todas as informações relevantes devem estar presentes.

---

# Exemplo de relatório

```text
Artigo:
CRM não é só cadastro: é controle da operação comercial

Slug:
crm-controle-operacao-comercial

Imagem utilizada:
crm-controle-operacao-comercial-capa.webp

Caminho:
public/assets/blog/articles/images/crm-controle-operacao-comercial-capa.webp

Frontmatter:
coverImage atualizado
coverAlt atualizado

Otimização:
Conversão de PNG para WebP
Dimensões mantidas em 1600 × 900 px

Validações:
Página interna validada
Card do blog validado
Desktop validado
Mobile validado
Build concluído sem erros

Pendências:
Nenhuma
```

---

# Prompt operacional para implementação de capa

Quando o usuário solicitar ao Hermes a implementação de uma capa, pode utilizar:

```text
Leia primeiro:

docs/blog/artigos/README.md
docs/blog/artigos/07_implementacao_capas_blog.md

A imagem já foi criada e aprovada fora do Hermes.

Não crie, redesenhe, edite ou substitua a imagem.

Analise a estrutura atual do projeto e identifique o padrão existente para as capas do blog.

Implemente a imagem informada no artigo correspondente.

Valide:

1. nome do arquivo;
2. formato;
3. dimensões;
4. peso;
5. caminho;
6. coverImage;
7. coverAlt;
8. página interna;
9. cards;
10. desktop;
11. mobile;
12. build.

Não invente caminhos ou URLs.

Ao final, informe todos os arquivos modificados, testes executados e pendências.
```

---

# Checklist antes da implementação

- A imagem foi aprovada?
- O artigo foi identificado?
- O slug foi confirmado?
- A versão final foi indicada?
- A estrutura existente foi analisada?
- A pasta correta foi localizada?
- O arquivo já existe no projeto?
- Existe uma imagem anterior?
- O alt text foi fornecido?
- A tarefa é inclusão ou substituição?

---

# Checklist do arquivo

- O nome está adequado?
- Não possui espaços?
- Não possui acentos?
- Não possui nome genérico?
- A extensão é compatível?
- A proporção é 16:9?
- As dimensões são adequadas?
- A imagem está nítida?
- O peso está adequado?
- Não existem dados confidenciais?
- Não existe marca d'água?
- Não existe texto indesejado?

---

# Checklist do frontmatter

- `coverImage` aponta para o arquivo correto?
- `coverAlt` descreve a imagem?
- O YAML está válido?
- O caminho é público?
- Não existem placeholders?
- Não existem campos duplicados?
- O artigo correto foi alterado?
- `draft` foi preservado?
- `publishedAt` foi preservado?
- `updatedAt` foi preservado quando não houve alteração editorial?

---

# Checklist visual

- A imagem aparece?
- O elemento principal está visível?
- A proporção foi preservada?
- Não há distorção?
- Não há corte inadequado?
- A nitidez está boa?
- O card funciona?
- A página interna funciona?
- O desktop funciona?
- O mobile funciona?
- O conjunto do blog permanece consistente?

---

# Checklist técnico

- O arquivo está no repositório?
- O caminho funciona?
- O build passou?
- O lint passou?
- Não há erro no console?
- Não há 404?
- O deploy inclui a imagem?
- Open Graph recebe a imagem correta?
- O alt text está no HTML?
- O carregamento está adequado?
- Não há mudança de layout relevante?

---

# Definição de concluído

A implementação da capa está concluída quando:

- a imagem aprovada está no local correto;
- o arquivo possui nome adequado;
- o formato está compatível;
- o peso foi verificado;
- o frontmatter está atualizado;
- o alt text está correto;
- o artigo renderiza;
- o card renderiza;
- a imagem funciona em desktop;
- a imagem funciona em mobile;
- o build não possui erros relacionados;
- o Hermes informou todas as alterações;
- não existem pendências ocultas.

---

# Regra final

O Hermes não cria a capa.

O Hermes implementa a capa aprovada.

Sua função é garantir que a imagem entregue pelo usuário seja:

```text
organizada
+
otimizada
+
associada ao artigo correto
+
renderizada corretamente
+
acessível
+
responsiva
+
tecnicamente validada
```

Quando a imagem estiver ausente, não invente uma substituta.

Quando houver mais de uma versão, não escolha sem confirmação.

Quando o caminho não estiver definido, analise o projeto antes de criar uma pasta.

Quando o recorte prejudicar a imagem, corrija a implementação ou informe a necessidade de uma nova composição.

Quando a capa ainda não estiver aprovada, preserve:

```yaml
coverImage: ""
coverAlt: ""
```

A prioridade é implementar corretamente o arquivo aprovado, sem interferir na criação visual e sem alterar a decisão estética do usuário.