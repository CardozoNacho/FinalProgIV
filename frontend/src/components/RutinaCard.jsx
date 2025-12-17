// src/components/RutinaCard.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { useRutinas } from '../contexts/RutinasContext';

function RutinaCard({ rutina }) {
  const { eliminarRutina } = useRutinas();

  const handleDelete = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (window.confirm(`¿Eliminar "${rutina.nombre}"?`)) {
      eliminarRutina(rutina.id);
    }
  };

  return (
    <div className="rutina-card">
      <Link to={`/rutinas/${rutina.id}`} className="rutina-title">
        {rutina.nombre}
      </Link>
      <p className="rutina-description">{rutina.descripcion || 'Sin descripción'}</p>

      <div className="rutina-actions">
        <Link to={`/editar/${rutina.id}`} className="btn btn-edit">
          Editar
        </Link>
        <button onClick={handleDelete} className="btn btn-delete">
          Eliminar
        </button>
      </div>
    </div>
  );
}

export default RutinaCard;