# Frontend - Sistema de Gestión de Rutinas de Gimnasio - Cardozo Peragallo Carlos Ignacio

Aplicación web desarrollada con **React y Vite** para la gestión de rutinas de entrenamiento. Permite al usuario interactuar con la API del backend para crear, visualizar, modificar y eliminar rutinas.

## 📋 Requisitos previos

- **Node.js 16+**
- **npm 8+** (incluido con Node.js)
- Navegador web moderno (Chrome, Firefox, Edge)

## Instalación

1. Clonar el repositorio
   git clone https://github.com/CardozoNacho/FinalProgIV.git
   cd FinalProgIV/frontend
2. Instalar dependencias:
   ```bash
   npm install
   ```
3. Configurar URL del backend:
   - Crear archivo `.env` en la raíz de frontend/ con contenido:
     VITE_API_URL=http://localhost:8000
4. Ejecutar el proyecto:
   npm run dev
5. Abrir en el navegador:
   http://localhost:5173

## Tecnologías utilizadas

- React 18 – Librería para interfaces de usuario
- Vite – Build tool rápido y moderno
- React Router DOM – Navegación entre vistas
- Fetch API – Comunicación con el backend
- CSS puro – Estilos personalizados sin frameworks externos

## Estructura del proyecto:

```
frontend/
├── public/            # Archivos estáticos (imágenes)
├── src/
│   ├── components/    # Componentes reutilizables (RutinaCard, Navbar, etc.)
│   ├── contexts/      # Gestión de estado global (RutinasContext)
│   ├── pages/         # Páginas principales (Lista, Crear, Editar, Detalle)
│   ├── config.js      # Configuración de la URL del backend
│   ├── App.jsx        # Enrutamiento principal
│   └── main.jsx       # Punto de entrada
├── package.json       # Dependencias y scripts
└── .env               # Configuración de la URL del backend
```


## Autor

- Cardozo Peragallo Carlos Ignacio
- carloscardozoperagallo@alu.frp.utn.edu.ar
- GitHub: (https://github.com/CardozoNacho)
