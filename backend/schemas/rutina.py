# backend/schemas/rutina.py
from pydantic import BaseModel, Field, validator
from typing import List, Optional
from datetime import datetime

dias_validos = {"Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo"}

class EjercicioBase(BaseModel):
    nombre: str = Field(..., min_length=1, max_length=100)
    dia_semana: str
    series: int = Field(..., gt=0)
    repeticiones: int = Field(..., gt=0)
    peso: Optional[float] = Field(None, ge=0)
    notas: Optional[str] = Field(None, max_length=500)
    orden: int = Field(0, ge=0)

    @validator("dia_semana")
    def validar_dia_semana(cls, v):
        if v not in dias_validos:
            raise ValueError(f"Día inválido. Debe ser uno de: {', '.join(dias_validos)}")
        return v

class EjercicioCreate(EjercicioBase):
    pass

class EjercicioRead(EjercicioBase):
    id: int

class RutinaBase(BaseModel):
    nombre: str = Field(..., min_length=1, max_length=100)
    descripcion: Optional[str] = Field(None, max_length=500)

class RutinaCreate(RutinaBase):
    ejercicios: List[EjercicioCreate] = Field(default_factory=list)

class RutinaUpdate(BaseModel):
    nombre: Optional[str] = Field(None, min_length=1, max_length=100)
    descripcion: Optional[str] = Field(None, max_length=500)
    ejercicios: Optional[List[EjercicioCreate]] = None

class RutinaRead(RutinaBase):
    id: int
    fecha_creacion: datetime
    ejercicios: List[EjercicioRead] = []