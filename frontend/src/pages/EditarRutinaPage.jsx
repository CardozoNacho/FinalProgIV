import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useRutinas } from '../contexts/RutinasContext';

export default function EditarRutinaPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { rutinas, actualizarRutina } = useRutinas();

  const [nombre, setNombre] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [ejercicios, setEjercicios] = useState([]);

  useEffect(() => {
    const found = rutinas.find(r => r.id === parseInt(id));
    if (found) {
      setNombre(found.nombre);
      setDescripcion(found.descripcion || '');
      setEjercicios(found.ejercicios.map(ej => ({ ...ej })));
    }
  }, [id, rutinas]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const rutinaActualizada = {
      nombre,
      descripcion,
      ejercicios: ejercicios.map(ej => ({
        ...ej,
        peso: ej.peso === '' ? null : ej.peso
      }))
    };

    const ok = await actualizarRutina(parseInt(id), rutinaActualizada);
    if (ok) {
      navigate('/');
    }
  };

  const agregarEjercicio = () => {
    setEjercicios([
      ...ejercicios,
      {
        nombre: '',
        dia_semana: 'Lunes',
        series: 3,
        repeticiones: 10,
        peso: null,
        notas: '',
        orden: ejercicios.length + 1
      }
    ]);
  };

  const eliminarEjercicio = (index) => {
    setEjercicios(ejercicios.filter((_, i) => i !== index));
  };

  const actualizarEjercicio = (index, campo, valor) => {
    const copia = [...ejercicios];
    copia[index][campo] = valor;
    setEjercicios(copia);
  };

  if (!nombre) return <div className="loading">Cargando...</div>;

  return (
    <div className="form-container">
      <h1>Editar Rutina</h1>

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Nombre</label>
          <input value={nombre} onChange={e => setNombre(e.target.value)} required />
        </div>

        <div className="form-group">
          <label>Descripción</label>
          <textarea value={descripcion} onChange={e => setDescripcion(e.target.value)} />
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
                <label>Nombre</label>
                <input
                  value={ej.nombre}
                  onChange={e => actualizarEjercicio(index, 'nombre', e.target.value)}
                  required
                />
              </div>

              <div className="form-group">
                <label>Día</label>
                <select
                  value={ej.dia_semana}
                  onChange={e => actualizarEjercicio(index, 'dia_semana', e.target.value)}
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
                <label>Series</label>
                <input
                  type="number"
                  min="1"
                  value={ej.series}
                  onChange={e => actualizarEjercicio(index, 'series', parseInt(e.target.value))}
                />
              </div>

              <div className="form-group">
                <label>Repeticiones</label>
                <input
                  type="number"
                  min="1"
                  value={ej.repeticiones}
                  onChange={e => actualizarEjercicio(index, 'repeticiones', parseInt(e.target.value))}
                />
              </div>

              <div className="form-group">
                <label>Peso (kg)</label>
                <input
                  type="number"
                  min="0"
                  step="0.1"
                  value={ej.peso ?? ''}
                  onChange={e =>
                    actualizarEjercicio(index, 'peso', e.target.value === '' ? null : e.target.value)
                  }
                />
              </div>

              <div className="form-group">
                <label>Notas</label>
                <textarea
                  value={ej.notas}
                  onChange={e => actualizarEjercicio(index, 'notas', e.target.value)}
                />
              </div>

              <div className="form-group">
                <label>Orden</label>
                <input
                  type="number"
                  min="1"
                  value={ej.orden}
                  onChange={e => actualizarEjercicio(index, 'orden', parseInt(e.target.value))}
                />
              </div>
            </div>
          ))}

          <button type="button" className="btn btn-secondary" style={{ marginRight: '10px' }} onClick={agregarEjercicio}>
            + Agregar Ejercicio
          </button>
        </div>

        <div style={{ marginTop: '1.5rem' }}>
          <button type="submit" className="btn btn-secondary" style={{ marginRight: '10px' }}>
            Guardar cambios
          </button>
          <Link to="/" className="btn btn-secondary" style={{ marginRight: '10px' }}>
            Cancelar
          </Link>
        </div>
      </form>
    </div>
  );
}
