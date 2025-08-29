// src/context/FavoritesContext.jsx
// Contexto para guardar favoritos globalmente (e persistidos via useLocalStorage).


import { createContext, useContext, useMemo } from 'react';
import useLocalStorage from '../hooks/useLocalStorage';


const FavoritesContext = createContext();


export function FavoritesProvider({ children }) {
// Array de filmes favoritos (guardamos ao menos imdbID, Title, Year, Poster)
const [favorites, setFavorites] = useLocalStorage('favorites', []);


// Verifica se um id já está na lista
function isFavorite(id) {
return favorites.some((f) => f.imdbID === id);
}


// Adiciona ou remove um filme
function toggleFavorite(movie) {
setFavorites((prev) => {
const exists = prev.some((f) => f.imdbID === movie.imdbID);
if (exists) {
return prev.filter((f) => f.imdbID !== movie.imdbID);
}
// Guardamos um payload enxuto
const compact = {
imdbID: movie.imdbID,
Title: movie.Title,
Year: movie.Year,
Poster: movie.Poster,
};
return [...prev, compact];
});
}


const value = useMemo(() => ({ favorites, isFavorite, toggleFavorite }), [favorites]);


return <FavoritesContext.Provider value={value}>{children}</FavoritesContext.Provider>;
}


export function useFavorites() {
const ctx = useContext(FavoritesContext);
if (!ctx) throw new Error('useFavorites deve ser usado dentro de <FavoritesProvider>');
return ctx;
}