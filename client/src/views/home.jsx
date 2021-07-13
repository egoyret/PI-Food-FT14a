import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from 'react-router-dom';
import { getRecetas } from "./actions.js";
import Lista from "../components/Lista";



function Home() {

    // Version Redux (usando hooks en vez de connect para traer datos del store)
   // const recetas = useSelector(state => state.recetas)

   // const recetas = useSelector(state => state.recetas)

    const dispatch = useDispatch() 
  
    const [title, setTitle] = useState('');
    const [puntuacion, setPuntuacion] = useState(0);
    const [orden, setOrden] = useState('P');
    const [sentido, setSentido] = useState('D');

    function handleChangeTitle(event) {
      setTitle( event.target.value );
    }
    function handleChangePuntuacion(event) {
      setPuntuacion( event.target.value );
    }

    //function handleChangeOrden(event) {
    //   setOrden( event.target.value );
    //}

    //function handleChangeSentido(event) {
    //  setSentido( event.target.value );
   //}


    function handleSubmit(event) {
        event.preventDefault();
        // Usamos el title que tenemos guardado en nuestro estado interno y que fue ingresado en el form
        // con el handleChange
        dispatch(getRecetas(title, puntuacion, orden, sentido));
        setTitle('');
        setPuntuacion('');
      }


    return (
        <>
         <form className="form-container" onSubmit={(e) => handleSubmit(e)}>
          <div className='barraHome'>
           <label className="label" htmlFor="title">Comida: </label>
           <input type="text" id="title" autoComplete="off" value={title} onChange={(e) => handleChangeTitle(e)}></input>
           <label className="label" htmlFor="puntuacion">Puntuacion minima: </label>
           <input type="text" id="puntuacion" autoComplete="off" value={puntuacion} onChange={(e) => handleChangePuntuacion(e)}></input>
           <button type="submit">BUSCAR</button>
          </div>
         </form>
         
        <div>
          <Link to={'/form'}>
              {'Ingresar receta'} 
          </Link>  
          <Link to={'/check'}>
              {'Prueba Check'} 
          </Link>  
          <Link to={'/checkFunc'}>
              {'Prueba Check Func'} 
          </Link>  

        </div>


           {/* Aqui listo todas las recetas */}

         <Lista/> 

         </>

    )
}
export default Home;


