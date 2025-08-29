// src/components/Pagination.jsx
// Componente simples de paginação. O OMDb retorna até ~10 itens por página.


export default function Pagination({ currentPage, totalItems, pageSize = 10, onPageChange }) {
    // Calcula total de páginas
    const totalPages = Math.max(1, Math.ceil(totalItems / pageSize));
    
    
    // Evita renderizar se só há 1 página
    if (totalPages <= 1) return null;
    
    
    // Para não poluir com MUITOS botões, limitamos um range ao redor da página atual
    const windowSize = 2; // mostra 2 antes/depois
    const start = Math.max(1, currentPage - windowSize);
    const end = Math.min(totalPages, currentPage + windowSize);
    
    
    const pages = [];
    for (let p = start; p <= end; p++) pages.push(p);
    
    
    return (
    <div className="pagination">
    <button
    className="btn"
    disabled={currentPage === 1}
    onClick={() => onPageChange(currentPage - 1)}
    >
    « Anterior
    </button>
    
    
    {start > 1 && (
    <>
    <button className="btn" onClick={() => onPageChange(1)}>1</button>
    {start > 2 && <span className="dots">…</span>}
    </>
    )}
    
    
    {pages.map((p) => (
    <button
    key={p}
    className={`btn ${p === currentPage ? 'btn-secondary' : ''}`}
    onClick={() => onPageChange(p)}
    >
    {p}
    </button>
    ))}
    
    
    {end < totalPages && (
    <>
    {end < totalPages - 1 && <span className="dots">…</span>}
    <button className="btn" onClick={() => onPageChange(totalPages)}>{totalPages}</button>
    </>
    )}
    
    
    <button
    className="btn"
    disabled={currentPage === totalPages}
    onClick={() => onPageChange(currentPage + 1)}
    >
    Próxima »
    </button>
    </div>
    );
    }