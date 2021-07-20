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
           <div className={"botones-detalle"}>
             <br/>
             <Link to={'/home'} className="btn">
               {'Home'} 
             </Link>
             <Link to={'/lista'} className="btn">
              {'Volver al listado'} 
             </Link>  
           </div>
             
           {receta ? (
            <>
              <div >
                 <h2>{receta.nombre}</h2>
                 <p className="receta-dietas">{`Tipo de dietas: ${receta.tipo_dieta}`}</p>
                 <div className="receta-datos-adic">
                   <p className="receta-datos">{`Puntuacion: ${receta.puntuacion}`}</p>
                   <p className="receta-datos">{`Nivel Salud: ${receta.nivel_salud}`}</p>
                   <p className="receta-datos">{`Id: ${receta.idApi}`}</p>
                 <div/>
              </div>

              <div className="caja-detalle">
                <img src={receta.imagen} width="350" alt=''/>
                <div>
                  <p  className="receta-detalle" > {receta.resumen}</p>
                </div>   
              </div>
              <hr/>
              <div>
                {`Paso a paso: ${receta.paso_a_paso}`}
              </div>
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