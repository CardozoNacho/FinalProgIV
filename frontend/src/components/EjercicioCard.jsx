// src/components/EjercicioCard.jsx
import React from 'react';

function EjercicioCard({ ejercicio }) {
  return (
    <div className="ejercicio-card">
      <h4 className="ejercicio-nombre">{ejercicio.nombre}</h4>
      <p className="ejercicio-detalles">
        {ejercicio.series} series × {ejercicio.repeticiones} repeticiones
        {ejercicio.peso !== null && (
          <span> | Peso: {ejercicio.peso} kg</span>
        )}
      </p>
      {ejercicio.notas && (
        <p className="ejercicio-notas">
          <em>{ejercicio.notas}</em>
        </p>
      )}
      <small className="ejercicio-orden">Orden: {ejercicio.orden}</small>
    </div>
  );
}

export default EjercicioCard;