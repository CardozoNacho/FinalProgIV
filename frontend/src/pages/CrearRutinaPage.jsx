// src/pages/CrearRutinaPage.jsx
import React, { useState } from 'react';
import { useRutinas } from '../contexts/RutinasContext';
import { useNavigate, Link } from 'react-router-dom';

export default function CrearRutinaPage() {
  const { crearRutina } = useRutinas();
  const navigate = useNavigate();

  const [nombre, setNombre] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [ejercicios, setEjercicios] = useState([
    { nombre: '', dia_semana: 'Lunes', series: 3, repeticiones: 10, peso: null, notas: '', orden: 1 }
  ]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const nuevaRutina = {
      nombre,
      descripcion,
      ejercicios: ejercicios.map(ej => ({
        ...ej,
        peso: ej.peso === '' ? null : parseFloat(ej.peso)
      }))
    };

    const creada = await crearRutina(nuevaRutina);
    if (creada) {
      navigate('/');
    }
  };

  const agregarEjercicio = () => {
    setEjercicios([...ejercicios, {
      nombre: '',
      dia_semana: 'Lunes',
      series: 3,
      repeticiones: 10,
      peso: null,
      notas: '',
      orden: ejercicios.length + 1
    }]);
  };

  const eliminarEjercicio = (index) => {
    setEjercicios(ejercicios.filter((_, i) => i !== index));
  };

  const actualizarEjercicio = (index, campo, valor) => {
    const nuevosEjercicios = [...ejercicios];
    nuevosEjercicios[index][campo] = valor;
    setEjercicios(nuevosEjercicios);
  };

  return (
    <div className="form-container">
      <h1>Crear Nueva Rutina</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Nombre:</label>
          <input
            type="text"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Descripción:</label>
          <textarea
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
            rows="3"
          />
        </div>

        <div className="form-section">
          <h2>Ejercicios</h2>
          {ejercicios.map((ej, index) => (
            <div key={index} className="ejercicio-form">
              <button
                type="button"
                className="btn btn-delete"
                onClick={() => eliminarEjercicio(index)}
              >
                Eliminar ejercicio
              </button>

              <div className="form-group">
                <label>Nombre:</label>
                <input
                  type="text"
                  value={ej.nombre}
                  onChange={(e) => actualizarEjercicio(index, 'nombre', e.target.value)}
                  required
                />
              </div>

              <div className="form-group">
                <label>Día:</label>
                <select
                  value={ej.dia_semana}
                  onChange={(e) => actualizarEjercicio(index, 'dia_semana', e.target.value)}
                >
                  <option>Lunes</option>
                  <option>Martes</option>
                  <option>Miércoles</option>
                  <option>Jueves</option>
                  <option>Viernes</option>
                  <option>Sábado</option>
                  <option>Domingo</option>
                </select>
              </div>

              <div className="form-group">
                <label>Series:</label>
                <input
                  type="number"
                  value={ej.series}
                  onChange={(e) => actualizarEjercicio(index, 'series', parseInt(e.target.value))}
                  min="1"
                  required
                />
              </div>

              <div className="form-group">
                <label>Repeticiones:</label>
                <input
                  type="number"
                  value={ej.repeticiones}
                  onChange={(e) => actualizarEjercicio(index, 'repeticiones', parseInt(e.target.value))}
                  min="1"
                  required
                />
              </div>

              <div className="form-group">
                <label>Peso (kg):</label>
                <input
                  type="number"
                  value={ej.peso === null ? '' : ej.peso}
                  onChange={(e) => actualizarEjercicio(index, 'peso', e.target.value === '' ? null : parseFloat(e.target.value))}
                  min="0"
                  step="0.1"
                />
              </div>

              <div className="form-group">
                <label>Notas:</label>
                <textarea
                  value={ej.notas}
                  onChange={(e) => actualizarEjercicio(index, 'notas', e.target.value)}
                  rows="2"
                />
              </div>

              <div className="form-group">
                <label>Orden:</label>
                <input
                  type="number"
                  value={ej.orden}
                  onChange={(e) => actualizarEjercicio(index, 'orden', parseInt(e.target.value))}
                  min="1"
                  required
                />
              </div>
            </div>
          ))}

          <button
            type="button"
            onClick={agregarEjercicio}
            className="btn btn-secondary"
            style={{ marginRight: '10px' }}
          >
            + Agregar Ejercicio
          </button>
        </div>

        <div style={{ marginTop: '1.5rem' }}>
          <button type="submit" className="btn btn-secondary" style={{ marginRight: '10px' }}>
            Crear Rutina
          </button>
          <Link to="/" className="btn btn-secondary" style={{ marginRight: '10px' }}>
            Cancelar
          </Link>
        </div>
      </form>
    </div>
  );
}