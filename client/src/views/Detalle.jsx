import React from 'react'
import { getReceta } from './actions'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from "react-router-dom"
import { Link } from 'react-router-dom';

function Detalle(){
    const receta = useSelector((state) => state.receta);
    const dispatch = useDispatch()
    const {idReceta} = useParams()
    console.log('idReceta: ', idReceta);
    useEffect(() => {
        dispatch(getReceta(idReceta))
    },[idReceta, dispatch]);

   return (
       <div>
            <Link to={'/'}>
             {'Home'} 
            </Link>
      
           {receta ? (
           <>
             <h2>{receta.nombre}</h2>
             <span>{receta.tipo_dieta}</span>
             <p>{`Puntuacion: ${receta.puntuacion}`}</p>
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