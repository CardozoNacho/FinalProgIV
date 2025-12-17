from sqlmodel import SQLModel, Field, Relationship
from typing import List
from datetime import datetime

# Días válidos
dias_semana = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo"]


class Ejercicio(SQLModel, table=True):
    """Tabla 'ejercicio' en la base de datos"""
    id: int | None = Field(default=None, primary_key=True)
    nombre: str = Field(min_length=1, max_length=100)
    dia_semana: str = Field(max_length=10)
    series: int = Field(gt=0)           # debe ser > 0
    repeticiones: int = Field(gt=0)     # debe ser > 0
    peso: float | None = Field(ge=0, default=None)  # si existe, debe ser >= 0
    notas: str | None = Field(default=None, max_length=500)
    orden: int = Field(default=0, ge=0)  # orden dentro del día >= 0

    # Relación con Rutina
    rutina_id: int = Field(foreign_key="rutina.id", ondelete="CASCADE")
    rutina: "Rutina" = Relationship(back_populates="ejercicios")


class Rutina(SQLModel, table=True):
    """Tabla 'rutina' en la base de datos"""
    id: int | None = Field(default=None, primary_key=True)
    nombre: str = Field(min_length=1, max_length=100, unique=True)
    descripcion: str | None = Field(default=None, max_length=500)
    fecha_creacion: datetime = Field(default_factory=datetime.utcnow)

    # Relación: una rutina tiene muchos ejercicios
    ejercicios: List["Ejercicio"] = Relationship(
        back_populates="rutina",
        sa_relationship_kwargs={"cascade": "all, delete-orphan"}
    )