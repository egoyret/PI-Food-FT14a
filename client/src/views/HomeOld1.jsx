import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from 'react-router-dom';
import { getRecetas } from "./actions.js";
import Lista from "../components/Lista";




function Home() {


    const dispatch = useDispatch() 
  
    const [title, setTitle] = useState('');

    function handleChangeTitle(event) {
      setTitle( event.target.value );
    }
 
    function handleSubmit(event) {
        event.preventDefault();
        // Usamos el title que tenemos guardado en nuestro estado interno y que fue ingresado en el form
        // con el handleChange
        dispatch(getRecetas(title));
        setTitle('');
               
      }

    return (
        <>
         <form className="form-container" onSubmit={(e) => handleSubmit(e)}>
          <div className='barraHome'>
           <label className="label" htmlFor="title">Comida: </label>
           <input type="text" id="title" autoComplete="off" value={title} onChange={(e) => handleChangeTitle(e)}></input>
 
           <button type="submit">BUSCAR</button><br/>
          </div>
         </form>
         
        <div>
          <Link to={'/form'}>
              {'Ingresar receta'} 
          </Link>  
        </div>


           {/* Aqui listo todas las recetas */}

         <Lista/> 
       

         </>

    )
}
export default Home;

// <label className="label" htmlFor="puntuacion">Puntuacion minima: </label>
// <input type="text" id="puntuacion" autoComplete="off" value={puntuacion} onChange={(e) => handleChangePuntuacion(e)}></input>


