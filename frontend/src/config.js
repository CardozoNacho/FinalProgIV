// src/config.js
// Centraliza la URL del backend para fácil configuración
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/';

export { API_BASE_URL };