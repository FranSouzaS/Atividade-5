import MovieCard from '../components/MovieCards';
import { useFavorites } from '../context/FavoritesContext';


export default function FavoritesPage() {
const { favorites } = useFavorites();


return (
<div className="container">
<h1>Meus favoritos</h1>


{favorites.length === 0 ? (
<p>Nenhum favorito ainda. Vá à busca e adicione alguns! 🍿</p>
) : (
<div className="grid">
{favorites.map((m) => (
<MovieCard key={m.imdbID} movie={m} />
))}
</div>
)}
</div>
);
}