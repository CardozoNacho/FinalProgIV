# backend/main.py
from fastapi import FastAPI
from contextlib import asynccontextmanager
from database import create_db_and_tables
from routers import rutinas
from fastapi.middleware.cors import CORSMiddleware

@asynccontextmanager
async def lifespan(app: FastAPI):
    create_db_and_tables()
    yield

app = FastAPI(
    title="Gym Routines API",
    description="API RESTful para gestión de rutinas de gimnasio",
    version="1.0.0",
    lifespan=lifespan
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(rutinas.router, prefix="/api")