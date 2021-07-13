import React from 'react'
import { getReceta, clearReceta } from './actions'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from "react-router-dom"
import { Link } from 'react-router-dom';

function Detalle(){
    const receta = useSelector((state) => state.receta);
    const dispatch = useDispatch()
    const {idReceta} = useParams()
    
    useEffect(() => {
        dispatch(getReceta(idReceta));
        return () => dispatch(clearReceta())
    },[idReceta, dispatch]);

   return (
       <div>
           <Link to={'/'}>
             {'Home'} 
            </Link>
      
           {receta ? (
            <>
             <h2>{receta.nombre}</h2>
             <span>{`Tipo de dietas: ${receta.tipo_dieta}`}</span>
             <p>{`Puntuacion: ${receta.puntuacion}`}</p>
             <p>{`Nivel Salud: ${receta.nivel_salud}`}</p>
             <p>{`Id: ${receta.idApi}`}</p>
             <img src={receta.imagen} alt=''/>

             <hr/>
             <div className="receta-detalle">{receta.resumen}</div>   
             <hr/>
             <div>{`Paso a paso: ${receta.paso_a_paso}`}</div>
 
 
            </>
           ) : (
               <div>Cargando...</div>
           )}
        </div>
   ) 
}
 //           <a href="edit" className="btn btn-primary">EDIT</a>
 //            <a href="delete" className="btn btn-danger">DELETE</a>
export default Detalle;