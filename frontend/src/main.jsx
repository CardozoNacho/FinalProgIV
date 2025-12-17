// src/main.jsx
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { RutinasProvider } from './contexts/RutinasContext'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RutinasProvider>
      <App />
    </RutinasProvider>
  </StrictMode>,
)