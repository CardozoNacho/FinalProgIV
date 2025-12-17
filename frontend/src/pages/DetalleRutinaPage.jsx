import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useRutinas } from '../contexts/RutinasContext';
import EjercicioCard from '../components/EjercicioCard';

function DetalleRutinaPage() {
  const { id } = useParams();
  const { rutinas, loading, error } = useRutinas();
  const [rutina, setRutina] = useState(null);

  useEffect(() => {
    const found = rutinas.find(r => r.id === parseInt(id));
    setRutina(found);
  }, [id, rutinas]);

  if (loading) return <div className="loading">Cargando rutina...</div>;
  if (error) return <div className="error">Error: {error}</div>;
  if (!rutina) return <div className="error">Rutina no encontrada.</div>;

  // Agrupar ejercicios por día
  const ejerciciosPorDia = {};
  rutina.ejercicios?.forEach(ej => {
    if (!ejerciciosPorDia[ej.dia_semana]) {
      ejerciciosPorDia[ej.dia_semana] = [];
    }
    ejerciciosPorDia[ej.dia_semana].push(ej);
  });

  return (
    <div className="detalle-rutina">
      <h1>{rutina.nombre}</h1>
      <p>{rutina.descripcion || 'Sin descripción'}</p>

      <div className="rutina-actions">
        <Link to={`/editar/${rutina.id}`} className="btn btn-edit">
          Editar
        </Link>
        <button
          className="btn btn-delete"
          onClick={() => window.confirm(`¿Eliminar "${rutina.nombre}"?`)}
        >
          Eliminar
        </button>
      </div>

      <div className="dia-seccion">
        {Object.keys(ejerciciosPorDia).map(dia => (
          <div key={dia} className="dia-card">
            <h3>{dia}</h3>
            <div className="ejercicios-dia">
              {ejerciciosPorDia[dia]
                .sort((a, b) => a.orden - b.orden)
                .map(ej => (
                  <EjercicioCard key={ej.id} ejercicio={ej} />
                ))}
            </div>
          </div>
        ))}
      </div>

      <div style={{ marginTop: '2rem' }}>
        <Link to="/" className="btn btn-secondary">
          ← Volver a la lista
        </Link>
      </div>
    </div>
  );
}

export default DetalleRutinaPage;
