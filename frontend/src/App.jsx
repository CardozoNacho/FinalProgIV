// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import ListaRutinasPage from './pages/ListaRutinasPage';
import DetalleRutinaPage from './pages/DetalleRutinaPage';
import CrearRutinaPage from './pages/CrearRutinaPage';
import EditarRutinaPage from './pages/EditarRutinaPage';

export default function App() {
  return (
    <Router>
      <Navbar />
      <div className="App">
        <Routes>
          <Route path="/" element={<ListaRutinasPage />} />
          <Route path="/rutinas/:id" element={<DetalleRutinaPage />} />
          <Route path="/crear" element={<CrearRutinaPage />} />
          <Route path="/editar/:id" element={<EditarRutinaPage />} />
        </Routes>
      </div>
    </Router>
  );
}