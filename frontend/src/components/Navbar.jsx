// src/components/Navbar.jsx
import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useRutinas } from '../contexts/RutinasContext';

export default function Navbar() {
  const { buscarRutinas, fetchRutinas } = useRutinas();
  const [searchTerm, setSearchTerm] = useState('');
  const location = useLocation();
  const navigate = useNavigate();

  // Limpiar búsqueda si estamos en crear/editar
  useEffect(() => {
    if (location.pathname.startsWith('/crear') || location.pathname.startsWith('/editar')) {
      setSearchTerm('');
    }
  }, [location.pathname]);

  // Debounce para búsqueda
  useEffect(() => {
    const handler = setTimeout(() => {
      if (searchTerm.trim() === '') {
        fetchRutinas();
      } else {
        buscarRutinas(searchTerm);
      }
    }, 300);
    return () => clearTimeout(handler);
  }, [searchTerm, buscarRutinas, fetchRutinas]);

  const handleHome = () => {
    setSearchTerm('');
    navigate('/');
  };

  return (
    <nav className="navbar">
      <div className="nav-brand">
        <Link to="/" onClick={handleHome}>
          <img src="/img/navbar-tiger.jpg" alt="Gym Routines" />
        </Link>
      </div>

      <div className="nav-search">
        <input
          type="text"
          placeholder="Buscar rutinas..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
          disabled={location.pathname.startsWith('/crear') || location.pathname.startsWith('/editar')}
        />
      </div>

      <div className="nav-actions">
        <Link to="/crear" className="btn-create">
          ➕ Crear Rutina
        </Link>
      </div>
    </nav>
  );
}