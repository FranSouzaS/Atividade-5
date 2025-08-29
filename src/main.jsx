// src/main.jsx
// Ponto de entrada da aplicação: React Router e Provider de Favoritos.


import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import './styles.css'
import { FavoritesProvider } from './context/FavoritesContext'


ReactDOM.createRoot(document.getElementById('root')).render(
<React.StrictMode>
<BrowserRouter>
<FavoritesProvider>
<App />
</FavoritesProvider>
</BrowserRouter>
</React.StrictMode>,
)