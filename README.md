# OrdenaLab — Laboratório Interativo de Algoritmos de Ordenação

Projeto educacional desenvolvido para a disciplina de Estrutura de Dados. O site recebe uma sequência numérica informada pelo visitante e demonstra sua ordenação.

## Funcionalidades

- Entrada de números separados por vírgula, espaço ou ponto e vírgula.
- Validação de entradas vazias e valores inválidos.
- Ordenação crescente ou decrescente.
- Dois algoritmos implementados manualmente em JavaScript: Bubble Sort e Selection Sort.
- Exibição lado a lado da lista original e da lista ordenada.
- Contagem de comparações e trocas.
- Registro das etapas do algoritmo.
- Suporte a números negativos e valores repetidos.
- Interface responsiva para computador e celular.

## Tecnologias

- HTML5
- CSS3
- JavaScript puro
- GitHub para versionamento
- GitHub Pages para hospedagem gratuita

## Como executar localmente

1. Baixe ou clone este repositório.
2. Mantenha `index.html`, `style.css` e `script.js` na mesma pasta.
3. Abra o arquivo `index.html` em um navegador.

Não é necessário instalar dependências nem configurar servidor.

## Como publicar no GitHub Pages

1. Crie um repositório público no GitHub chamado `laboratorio-ordenacao`.
2. Envie os arquivos `index.html`, `style.css`, `script.js` e `README.md` para a raiz do repositório.
3. No repositório, abra **Settings** → **Pages**.
4. Em **Build and deployment**, selecione **Deploy from a branch**.
5. Escolha a branch `main` e a pasta `/(root)`, depois clique em **Save**.
6. Aguarde a publicação. O GitHub exibirá o endereço público na seção Pages.

Depois de publicar, atualize este README com os links reais:

- **Site publicado:** `https://SEU-USUARIO.github.io/laboratorio-ordenacao/`
- **Repositório:** `https://github.com/SEU-USUARIO/laboratorio-ordenacao`

Substitua `SEU-USUARIO` pelo seu nome de usuário do GitHub.

## Testes recomendados

| Cenário | Entrada | Resultado crescente esperado |
|---|---|---|
| Sequência comum | `5, 2, 8, 1` | `1, 2, 5, 8` |
| Valores repetidos | `4, 2, 4, 1` | `1, 2, 4, 4` |
| Valores negativos | `3, -5, 0, -1` | `-5, -1, 0, 3` |
| Um elemento | `7` | `7` |
| Entrada vazia | *(vazio)* | Mensagem para informar números |
| Entrada inválida | `3, abc, 2` | Mensagem de erro compreensível |
| Ordem decrescente | `1, 5, 3` | `5, 3, 1` |

Teste os cenários com os dois algoritmos. A implementação principal não usa `Array.sort()` para ordenar.

## Autores

Adicione aqui os nomes dos integrantes do grupo.

## Melhorias futuras

- Permitir que o usuário avance etapa por etapa.
- Exibir animação visual das comparações.
- Incluir outros algoritmos, como Insertion Sort e Merge Sort.
