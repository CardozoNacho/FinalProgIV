# Backend - Sistema de Gestión de Rutinas de Gimnasio - Cardozo Peragallo Carlos Ignacio

API RESTful desarrollada con **FastAPI** para la gestión de rutinas de entrenamiento en gimnasio. Proporciona endpoints para crear, leer, actualizar y eliminar rutinas y sus ejercicios.

## 📋 Requisitos previos

- **Python 3.10+**
- **PostgreSQL 12+** instalado y en ejecución
- Acceso a una terminal o consola

## Dependencias
- FastAPI 0.115+
- SQLModel 0.0.22+
- Uvicorn 0.32.1
- Pydantic v2
- psycopg2-binary 2.9.10

## ⚙️ Instalación

1. Clonar el repositorio:
   ```bash
   git clone https://github.com/CardozoNacho/FinalProgIV.git
   cd FinalProgIV/backend
   ```
2. Crear y activar un entorno virtual:
   python -m venv venv
   # Windows:
   venv\Scripts\activate
   # macOS/Linux:
   source venv/bin/activate
3. Instalar dependencias:
   pip install -r requirements.txt
4. Configuración de la Base de Datos
- Crear una base de datos en PostgreSQL llamada gym_routines_db
- Crear un archivo .env en la carpeta backend/ con la siguiente estructura:
  ```
  DATABASE_URL=postgresql://usuario:contraseña@localhost:5432/gym_routines_db
   ```
   Reemplazar usuario y contraseña con tus credenciales de PostgreSQL.
   La aplicación creará automáticamente las tablas al iniciar.

5. Ejecutar la aplicación:
   ```bash
   uvicorn main:app --reload --port 8000
   ```

- Documentación (Swagger UI): http://localhost:8000/docs

## Estructura del proyecto

```
backend/
├── main.py            # Punto de entrada de la API
├── models/            # Modelos de base de datos (SQLModel)
├── schemas/           # Esquemas de validación (Pydantic)
├── routers/           # Rutas de la API
├── database.py        # Configuración de la conexión a la base de datos
├── requirements.txt   # Dependencias de Python
└── .env               # Configuración de variables de entorno
```

## Funcionalidades

- ✅ **CRUD completo** de rutinas y ejercicios
- ✅ **Búsqueda por nombre** (parcial, no case-sensitive)
- ✅ **Eliminación en cascada** (al borrar rutina, se borran sus ejercicios)

## Endpoints

| Método   | Ruta                | Descripción                                         |
| -------- | ------------------- | --------------------------------------------------- |
| `GET`    | `/api/`             | Listar rutinas                                      |
| `GET`    | `/api/{id}`         | Obtener detalle de una rutina                       |
| `GET`    | `/api/buscar`       | Buscar por nombre                                   |
| `POST`   | `/api/`             | Crear rutina con ejercicios anidados                |
| `PUT`    | `/api/{id}`         | Actualizar rutina                                   |
| `DELETE` | `/api/{id}`         | Eliminar rutina                                     |

## Datos de Prueba 

```
{
  "nombre": "Fuerza Tren Superior",
  "descripcion": "Rutina enfocada en el desarrollo de fuerza en pecho, espalda y brazos.",
  "ejercicios": [
    {
      "nombre": "Press banca",
      "dia_semana": "Lunes",
      "series": 4,
      "repeticiones": 6,
      "peso": 80,
      "notas": "Descanso de 2 minutos",
      "orden": 1
    },
    {
      "nombre": "Remo con barra",
      "dia_semana": "Lunes",
      "series": 4,
      "repeticiones": 8,
      "peso": 70,
      "notas": "Espalda recta",
      "orden": 2
    },
    {
      "nombre": "Curl bíceps con barra",
      "dia_semana": "Lunes",
      "series": 3,
      "repeticiones": 10,
      "peso": 30,
      "notas": "Controlar la bajada",
      "orden": 3
    }
  ]
}
{
  "nombre": "Piernas y Glúteos",
  "descripcion": "Entrenamiento completo para tren inferior.",
  "ejercicios": [
    {
      "nombre": "Sentadilla",
      "dia_semana": "Martes",
      "series": 4,
      "repeticiones": 8,
      "peso": 90,
      "notas": "Profundidad controlada",
      "orden": 1
    },
    {
      "nombre": "Prensa de piernas",
      "dia_semana": "Martes",
      "series": 3,
      "repeticiones": 12,
      "peso": 160,
      "notas": "No bloquear rodillas",
      "orden": 2
    },
    {
      "nombre": "Curl femoral",
      "dia_semana": "Martes",
      "series": 3,
      "repeticiones": 12,
      "peso": 50,
      "notas": "Movimiento lento",
      "orden": 3
    }
  ]
}
{
  "nombre": "Funcional Full Body",
  "descripcion": "Rutina funcional para todo el cuerpo con enfoque cardiovascular.",
  "ejercicios": [
    {
      "nombre": "Burpees",
      "dia_semana": "Miércoles",
      "series": 4,
      "repeticiones": 15,
      "peso": 0,
      "notas": "Ritmo constante",
      "orden": 1
    },
    {
      "nombre": "Kettlebell swing",
      "dia_semana": "Miércoles",
      "series": 4,
      "repeticiones": 20,
      "peso": 16,
      "notas": "Impulso de cadera",
      "orden": 2
    },
    {
      "nombre": "Plancha abdominal",
      "dia_semana": "Miércoles",
      "series": 3,
      "repeticiones": 30,
      "peso": 0,
      "notas": "Segundos",
      "orden": 3
    }
  ]
}
{
  "nombre": "Hipertrofia Espalda y Hombros",
  "descripcion": "Rutina para ganar masa muscular en espalda y hombros.",
  "ejercicios": [
    {
      "nombre": "Dominadas asistidas",
      "dia_semana": "Jueves",
      "series": 4,
      "repeticiones": 10,
      "peso": 0,
      "notas": "Controlar el movimiento",
      "orden": 1
    },
    {
      "nombre": "Jalón al pecho",
      "dia_semana": "Jueves",
      "series": 3,
      "repeticiones": 12,
      "peso": 60,
      "notas": "Apretar escápulas",
      "orden": 2
    },
    {
      "nombre": "Elevaciones laterales",
      "dia_semana": "Jueves",
      "series": 3,
      "repeticiones": 15,
      "peso": 10,
      "notas": "Sin balanceo",
      "orden": 3
    }
  ]
}
{
  "nombre": "Core y Estabilidad",
  "descripcion": "Entrenamiento centrado en abdomen y estabilidad corporal.",
  "ejercicios": [
    {
      "nombre": "Crunch abdominal",
      "dia_semana": "Viernes",
      "series": 4,
      "repeticiones": 20,
      "peso": 0,
      "notas": "No tirar del cuello",
      "orden": 1
    },
    {
      "nombre": "Russian twist",
      "dia_semana": "Viernes",
      "series": 3,
      "repeticiones": 16,
      "peso": 10,
      "notas": "Giro controlado",
      "orden": 2
    },
    {
      "nombre": "Plancha lateral",
      "dia_semana": "Viernes",
      "series": 3,
      "repeticiones": 30,
      "peso": 0,
      "notas": "Segundos por lado",
      "orden": 3
    }
  ]
}
```
## Autor

- Cardozo Peragallo Carlos Ignacio
- carloscardozoperagallo@alu.frp.utn.edu.ar
- GitHub: (https://github.com/CardozoNacho)
