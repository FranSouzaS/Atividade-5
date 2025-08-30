# Atividade 5 - React + OMDB

App em **React (Vite)** que usa a API do **OMDb** para **buscar filmes**, **ver detalhes** e **salvar favoritos** no **localStorage**.

## Funcionalidades

- **Busca** por título (lista com **pôster, título, ano** e botão **Detalhes**)
- **Paginação** dos resultados
- **Página de detalhes** (Diretor, Elenco, Sinopse/Plot, Avaliação/IMDb)
- **Favoritos** (adicionar/remover, persistência em `localStorage`)
- **Loading & Erros** (indicador e mensagens amigáveis)


### Como rodar 

bash
npm install
npm run dev

---

# opcional:
npm run build && npm run preview
Configuração da API (OMDb)
Gere sua API Key em https://www.omdbapi.com/

Crie um arquivo .env na raiz do projeto (não enviar para o Git):

env
Copiar código
VITE_OMDB_API_KEY=SUACHAVEAQUI
VITE_OMDB_BASE_URL=https://www.omdbapi.com/
Reinicie o servidor (npm run dev) após criar/alterar o .env.

Endpoints usados
Busca: /?s=<termo>&page=<n>&apikey=<KEY> → retorna Search[] e totalResults

Detalhes: /?i=<imdbID>&plot=full&apikey=<KEY> → Director, Actors, Plot, imdbRating, etc.

## Estrutura do projeto


## Estrutura do Projeto

`text`
.
├─ src/
│  ├─ api/
│  │  └─ omdb.js               # funções para consumir a API OMDb
│  ├─ assets/                  # imagens, ícones, fontes
│  ├─ components/              # componentes reutilizáveis
│  │  ├─ MovieCards.jsx
│  │  └─ Pagination.jsx
│  ├─ context/
│  │  └─ FavoritesContext.jsx  # contexto de favoritos
│  ├─ hooks/
│  │  └─ useLocalStorage.js    # hook para persistir no localStorage
│  ├─ pages/                   # páginas (Home, Details, Favorites, ...)
│  ├─ App.jsx
│  ├─ main.jsx
│  └─ styles.css               # estilos globais
├─ .env                        # variáveis locais (NÃO versionar)
├─ .gitignore
├─ eslint.config.js
├─ index.html
└─ package.json



## Dicas rápidas

Em projetos Vite, variáveis precisam começar com VITE_.

Calcule a paginação com totalResults (10 por página no OMDb).

Guarde os favoritos no localStorage (ex.: chave @movies/favorites).

Se aparecer Invalid API key: revise a key, o prefixo VITE_ e o .env.

## Checklist
- Busca funcionando (pôster, título, ano, botão de detalhes)

- Paginação entre páginas

- Detalhes completos (diretor, elenco, sinopse, avaliação)

- Favoritar/desfavoritar com localStorage

- Loading e mensagens de erro

- .env configurado e ignorado no Git

- README atualizado (este arquivo)


