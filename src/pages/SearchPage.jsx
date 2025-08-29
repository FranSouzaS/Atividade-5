import { useEffect, useState } from 'react';
import { searchMovies } from '../api/omdb';
import MovieCard from '../components/MovieCards';
import Pagination from '../components/Pagination';


export default function SearchPage() {
    // Estado do formulário (campo controlado)
    const [input, setInput] = useState('');
    // Termo efetivo usado na busca (setado no submit)
    const [term, setTerm] = useState('');
    // Página atual da busca
    const [page, setPage] = useState(1);
    // Resultados e total
    const [results, setResults] = useState([]);
    const [total, setTotal] = useState(0);
    // Estados de UI
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');


    // Dispara a busca quando "term" ou "page" mudarem
    useEffect(() => {
        // Se não há termo, não busca
        if (!term) return;


        let isCancelled = false; // proteção simples contra race conditions


        async function fetchData() {
            setLoading(true);
            setError('');
            try {
                const { results, total } = await searchMovies(term, page);
                if (!isCancelled) {
                    setResults(results);
                    setTotal(total);
                }
            } catch (err) {
                if (!isCancelled) {
                    setError(err.message || 'Erro inesperado');
                    setResults([]);
                    setTotal(0);
                }
            } finally {
                if (!isCancelled) setLoading(false);
            }
        }


        fetchData();


        return () => {
            isCancelled = true;
        };
    }, [term, page]);


    // Submit do formulário: define o termo e reseta para a página 1
    function handleSubmit(e) {
        e.preventDefault();
        setPage(1);
        setTerm(input.trim());
    }


    return (
        <div className="container">
            <h1>Buscar filmes</h1>


            {/* Formulário */}
            <form className="search-form" onSubmit={handleSubmit}>
                <input
                    className="input"
                    type="text"
                    placeholder="Digite um título (ex: Harry Potter)"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                />
                <button className="btn" type="submit">Buscar</button>
            </form>


            {/* Estados de UI */}
            {loading && <div className="loading">Carregando…</div>}
            {error && <div className="error">{error}</div>}


            {/* Lista de resultados */}
            <div className="grid">
                {results.map((m) => (
                    <MovieCard key={m.imdbID} movie={m} />
                ))}
            </div>


            {/* Paginação */}
            {!loading && results.length > 0 && (
                <Pagination
                    currentPage={page}
                    totalItems={total}
                    onPageChange={(p) => setPage(p)}
                />
            )}
        </div>
    );
}
