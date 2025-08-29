// src/components/MovieCard.jsx
// Card de filme usado na listagem e nos favoritos.


import { Link } from 'react-router-dom';
import { useFavorites } from '../context/FavoritesContext';


const FALLBACK_POSTER = 'https://via.placeholder.com/300x450?text=Sem+Poster';


export default function MovieCard({ movie }) {
// movie vem no formato do OMDb (Search item): { Title, Year, imdbID, Poster }
const { isFavorite, toggleFavorite } = useFavorites();


const poster = movie.Poster && movie.Poster !== 'N/A' ? movie.Poster : FALLBACK_POSTER;
const fav = isFavorite(movie.imdbID);


return (
<div className="card">
{/* Pôster */}
<img className="poster" src={poster} alt={`Pôster de ${movie.Title}`} />


{/* Título + Ano */}
<div className="card-body">
<h3 className="title">{movie.Title}</h3>
<p className="year">{movie.Year}</p>


{/* Ações */}
<div className="actions">
<Link to={`/movie/${movie.imdbID}`} className="btn">
Ver detalhes
</Link>
<button
className={`btn ${fav ? 'btn-secondary' : 'btn-outline'}`}
onClick={() => toggleFavorite(movie)}
>
{fav ? 'Remover dos favoritos' : 'Favoritar'}
</button>
</div>
</div>
</div>
);
}