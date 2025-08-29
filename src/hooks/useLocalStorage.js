// src/hooks/useLocalStorage.js
// Hook genérico para sincronizar estado com localStorage.
// Uso: const [valor, setValor] = useLocalStorage('chave', valorInicial)


import { useEffect, useState } from 'react';


export default function useLocalStorage(key, initialValue) {
// Lê o valor inicial do localStorage apenas uma vez
const [value, setValue] = useState(() => {
try {
const stored = localStorage.getItem(key);
return stored ? JSON.parse(stored) : initialValue;
} catch {
return initialValue;
}
});


// Sempre que "value" mudar, persistimos no localStorage
useEffect(() => {
try {
localStorage.setItem(key, JSON.stringify(value));
} catch {
// Silencia erros de quota/privacidade
}
}, [key, value]);


return [value, setValue];
}