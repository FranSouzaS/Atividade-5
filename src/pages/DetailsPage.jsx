import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { fetchMovieDetails } from '../api/omdb';
import { useFavorites } from '../context/FavoritesContext';


const FALLBACK_POSTER = 'https://via.placeholder.com/300x450?text=Sem+Poster';


export default function DetailsPage() {
    // Pega o :id da URL (imdbID)
    const { id } = useParams();


    // Estados de UI
    const [movie, setMovie] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');


    // Ações de favoritos
    const { isFavorite, toggleFavorite } = useFavorites();


    useEffect(() => {
        let isCancelled = false;
        async function load() {
            setLoading(true);
            setError('');
            try {
                const data = await fetchMovieDetails(id);
                if (!isCancelled) setMovie(data);
            } catch (err) {
                if (!isCancelled) setError(err.message || 'Erro ao carregar detalhes');
            } finally {
                if (!isCancelled) setLoading(false);
            }
        }
        load();
        return () => {
            isCancelled = true;
        };
    }, [id]);


    if (loading) return <div className="container"><div className="loading">Carregando…</div></div>;
    if (error) return <div className="container"><div className="error">{error}</div></div>;
    if (!movie) return null;


    const poster = movie.Poster && movie.Poster !== 'N/A' ? movie.Poster : FALLBACK_POSTER;
    const fav = isFavorite(movie.imdbID);


    return (
        <div className="container">
            <Link className="link" to="/">← Voltar</Link>


            <div className="details">
                <img className="poster" src={poster} alt={`Pôster de ${movie.Title}`} />


                <div className="info">
                    <h1>{movie.Title} ({movie.Year})</h1>
                    <p><strong>Diretor:</strong> {movie.Director}</p>
                    <p><strong>Elenco:</strong> {movie.Actors}</p>
                    <p><strong>Gênero:</strong> {movie.Genre}</p>
                    <p><strong>Duração:</strong> {movie.Runtime}</p>
                    <p><strong>Avaliação IMDb:</strong> {movie.imdbRating}</p>
                    <p><strong>Sinopse:</strong> {movie.Plot}</p>


                    <button
                        className={`btn ${fav ? 'btn-secondary' : 'btn-outline'}`}
                        onClick={() => toggleFavorite(movie)}
                    >
                        {fav ? 'Remover dos favoritos' : 'Adicionar aos favoritos'}
                    </button>
                </div>
            </div>
        </div>
    );
}