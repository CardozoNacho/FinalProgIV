# backend/routers/rutinas.py
from fastapi import APIRouter, HTTPException, Depends, Query
from sqlmodel import Session, select
from sqlalchemy.orm import selectinload
from typing import List
from models.rutina import Rutina as RutinaModel, Ejercicio as EjercicioModel
from schemas.rutina import RutinaCreate, RutinaRead, RutinaUpdate
from database import get_session

router = APIRouter()

@router.get("/rutinas", response_model=List[RutinaRead])
def listar_rutinas(session: Session = Depends(get_session)):
    return session.exec(
        select(RutinaModel).options(selectinload(RutinaModel.ejercicios))
    ).all()
    
    
@router.get("/rutinas/buscar", response_model=List[RutinaRead])
def buscar_rutinas(nombre: str = Query(..., min_length=1), session: Session = Depends(get_session)):
    return session.exec(
        select(RutinaModel)
        .options(selectinload(RutinaModel.ejercicios))
        .where(RutinaModel.nombre.ilike(f"%{nombre}%"))
    ).all()

@router.get("/rutinas/{id}", response_model=RutinaRead)
def obtener_rutina(id: int, session: Session = Depends(get_session)):
    rutina = session.exec(
        select(RutinaModel)
        .options(selectinload(RutinaModel.ejercicios))
        .where(RutinaModel.id == id)
    ).first()
    if not rutina:
        raise HTTPException(status_code=404, detail="Rutina no encontrada")
    return rutina



@router.post("/rutinas", response_model=RutinaRead, status_code=201)
def crear_rutina(rutina_data: RutinaCreate, session: Session = Depends(get_session)):
    rutina_existente = session.exec(
        select(RutinaModel).where(RutinaModel.nombre == rutina_data.nombre)
    ).first()
    if rutina_existente:
        raise HTTPException(status_code=400, detail="Ya existe una rutina con ese nombre")
    
    nueva_rutina = RutinaModel(
        nombre=rutina_data.nombre,
        descripcion=rutina_data.descripcion
    )
    session.add(nueva_rutina)
    session.flush()
    
    for ej in rutina_data.ejercicios:
        nuevo_ej = EjercicioModel(
            nombre=ej.nombre,
            dia_semana=ej.dia_semana,
            series=ej.series,
            repeticiones=ej.repeticiones,
            peso=ej.peso,
            notas=ej.notas,
            orden=ej.orden,
            rutina_id=nueva_rutina.id
        )
        session.add(nuevo_ej)
    
    session.commit()
    session.refresh(nueva_rutina)
    return nueva_rutina

@router.put("/rutinas/{id}", response_model=RutinaRead)
def actualizar_rutina(id: int, rutina_data: RutinaUpdate, session: Session = Depends(get_session)):
    db_rutina = session.get(RutinaModel, id)
    if not db_rutina:
        raise HTTPException(status_code=404, detail="Rutina no encontrada")
    
    if rutina_data.nombre is not None:
        if rutina_data.nombre != db_rutina.nombre:
            existente = session.exec(
                select(RutinaModel).where(RutinaModel.nombre == rutina_data.nombre)
            ).first()
            if existente:
                raise HTTPException(status_code=400, detail="Ya existe otra rutina con ese nombre")
        db_rutina.nombre = rutina_data.nombre
    
    if rutina_data.descripcion is not None:
        db_rutina.descripcion = rutina_data.descripcion
    
    if rutina_data.ejercicios is not None:
        db_rutina.ejercicios.clear()
        session.flush()
        for ej in rutina_data.ejercicios:
            nuevo_ej = EjercicioModel(
                nombre=ej.nombre,
                dia_semana=ej.dia_semana,
                series=ej.series,
                repeticiones=ej.repeticiones,
                peso=ej.peso,
                notas=ej.notas,
                orden=ej.orden,
                rutina_id=id
            )
            session.add(nuevo_ej)
    
    session.add(db_rutina)
    session.commit()
    session.refresh(db_rutina)
    return db_rutina

@router.delete("/rutinas/{id}", status_code=204)
def eliminar_rutina(id: int, session: Session = Depends(get_session)):
    rutina = session.get(RutinaModel, id)
    if not rutina:
        raise HTTPException(status_code=404, detail="Rutina no encontrada")
    session.delete(rutina)
    session.commit()
    return