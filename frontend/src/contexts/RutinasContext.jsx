// src/contexts/RutinasContext.jsx
import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { API_BASE_URL } from '../config';

const RutinasContext = createContext();

export function RutinasProvider({ children }) {
  const [rutinas, setRutinas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchRutinas = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/api/rutinas`);
      if (!response.ok) throw new Error('Error al obtener las rutinas');
      const data = await response.json();
      setRutinas(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  const buscarRutinas = useCallback(async (texto) => {
  if (!texto.trim()) {
    fetchRutinas();
    return;
  }
  setLoading(true);
  try {
    const response = await fetch(`${API_BASE_URL}/api/rutinas/buscar?nombre=${encodeURIComponent(texto)}`);
    if (!response.ok) {
      if (response.status === 422) {
        // Si el backend da 422, es un error de validación → probablemente no hay resultados
        setRutinas([]);
      } else {
        throw new Error('Error al buscar rutinas');
      }
    } else {
      const data = await response.json();
      setRutinas(data);
    }
  } catch (err) {
    setError(err.message);
    setRutinas([]); // Mostrar lista vacía en caso de error
  } finally {
    setLoading(false);
  }
}, [fetchRutinas]);

  const crearRutina = useCallback(async (nuevaRutina) => {
    setLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/api/rutinas`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(nuevaRutina),
      });
      if (!response.ok) throw new Error('Error al crear la rutina');
      const data = await response.json();
      setRutinas(prev => [...prev, data]);
      return data;
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  const actualizarRutina = useCallback(async (id, rutinaActualizada) => {
    setLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/api/rutinas/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(rutinaActualizada),
      });
      if (!response.ok) throw new Error('Error al actualizar la rutina');
      const data = await response.json();
      setRutinas(prev => prev.map(r => r.id === id ? data : r));
      return data;
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  const eliminarRutina = useCallback(async (id) => {
    setLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/api/rutinas/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) throw new Error('Error al eliminar la rutina');
      setRutinas(prev => prev.filter(r => r.id !== id));
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  // Cargar rutinas al montar
  useEffect(() => {
    fetchRutinas();
  }, [fetchRutinas]);

  return (
    <RutinasContext.Provider value={{
      rutinas,
      loading,
      error,
      fetchRutinas,
      buscarRutinas,
      crearRutina,
      actualizarRutina,
      eliminarRutina,
    }}>
      {children}
    </RutinasContext.Provider>
  );
}

export function useRutinas() {
  return useContext(RutinasContext);
}