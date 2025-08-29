// src/api/omdb.js
// Camada de acesso à API do OMDb. Mantemos tudo isolado aqui para facilitar testes e troca de API depois.


const BASE_URL = 'https://www.omdbapi.com/'; // endpoint base do OMDb
const API_KEY = import.meta.env.VITE_OMDB_API_KEY; // lê a chave do .env


// Busca filmes por termo, com paginação (OMDb retorna 10 por página)
export async function searchMovies(query, page = 1) {
// Monta a URL com os parâmetros exigidos pela API
const url = `${BASE_URL}?apikey=${API_KEY}&s=${encodeURIComponent(query)}&page=${page}&type=movie`;


// Faz a requisição
const res = await fetch(url);
const data = await res.json();


// OMDb retorna Response:'False' quando há erro (ex: "Movie not found!")
if (data.Response === 'False') {
throw new Error(data.Error || 'Erro ao buscar filmes');
}


// Garante estruturas previsíveis
return {
results: data.Search ?? [],
total: Number(data.totalResults) || 0,
};
}


// Busca detalhes completos por imdbID
export async function fetchMovieDetails(imdbID) {
const url = `${BASE_URL}?apikey=${API_KEY}&i=${imdbID}&plot=full`;
const res = await fetch(url);
const data = await res.json();


if (data.Response === 'False') {
throw new Error(data.Error || 'Erro ao carregar detalhes');
}


return data; // objeto completo do filme
}