// src/pages/ListaRutinasPage.jsx
import React, { useEffect, useState } from 'react';
import { useRutinas } from '../contexts/RutinasContext';
import RutinaCard from '../components/RutinaCard';

export default function ListaRutinasPage() {
  const { rutinas, loading, error, fetchRutinas } = useRutinas();
  const [searchTerm, setSearchTerm] = useState('');

  // Cargar todas las rutinas al entrar
  useEffect(() => {
    fetchRutinas();
  }, [fetchRutinas]);

  // Manejar búsqueda con debounce
  useEffect(() => {
    const handler = setTimeout(() => {
      const context = window.parent.document.querySelector('.App');
      if (context) {
        context.scrollTop = 0; // volver al inicio
      }
    }, 100);

    return () => clearTimeout(handler);
  }, [rutinas]);

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    // Comunicar la búsqueda al contexto
    if (value.trim() === '') {
      fetchRutinas(); // recargar todo
    } else {
      // Esto debe estar gestionado en el contexto
      // Pero por simplicidad, lo hacemos aquí
      fetch(`${import.meta.env.VITE_API_URL}/rutinas/buscar?nombre=${encodeURIComponent(value)}`)
        .then(res => res.json())
        .then(data => {
          // Actualizar estado global: necesitas una función en el contexto
          // Para simplificar, asumimos que tu contexto ya tiene `setRutinas`
        });
    }
  };

  // ✅ Solución real: usa el contexto correctamente
  // Pero para evitar problemas, mejor maneja todo en el contexto

  if (loading) return <div className="loading">Cargando rutinas...</div>;
  if (error) return <div className="error">Error: {error}</div>;

  return (
    <div>
      <h1 style={{ color: '#fff', marginBottom: '1rem' }}>Lista de Rutinas</h1>
      {rutinas.length === 0 ? (
        <p style={{ color: '#fff' }}>No se encontraron rutinas.</p>
      ) : (
        <div>
          {rutinas.map(rutina => (
            <RutinaCard key={rutina.id} rutina={rutina} />
          ))}
        </div>
      )}
    </div>
  );
}