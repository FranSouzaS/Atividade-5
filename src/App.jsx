// src/App.jsx
// Define as rotas e um layout simples de navegação.


import { Link, Route, Routes } from 'react-router-dom';
import SearchPage from './pages/SearchPage';
import DetailsPage from './pages/DetailsPage';
import FavoritesPage from './pages/FavoritesPage';


export default function App() {
return (
<div>
{/* Navbar mínima */}
<nav className="navbar">
<div className="container navbar-inner">
<Link className="brand" to="/">🎬 MovieApp</Link>
<div className="nav-links">
<Link className="link" to="/">Buscar</Link>
<Link className="link" to="/favorites">Favoritos</Link>
</div>
</div>
</nav>


<Routes>
<Route path="/" element={<SearchPage />} />
<Route path="/movie/:id" element={<DetailsPage />} />
<Route path="/favorites" element={<FavoritesPage />} />
</Routes>
</div>
);
}