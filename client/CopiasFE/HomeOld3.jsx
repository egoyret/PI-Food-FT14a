import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from 'react-router-dom';
import { getRecetas } from "./actions.js";
// import axios from "axios";

function Home() {
    // Version React
/*  const [recetas, setRecetas] = useState([])
    useEffect( () =>{
     axios.get('http://localhost:3001/api/recipes?name=pasta')
     .then(response => {
      console.log(response.data)  ; 
      setRecetas(response.data);
     })
    },[]); */

    // Version Redux (usando hooks en vez de connect para traer datos del store)
    const recetas = useSelector(state => state.recetas)
    function ordenar(campo) {  recetas.sort(function(a, b) {
      if (a[campo] > b[campo]) { return 1;}
      if (a[campo] < b[campo]) { return -1;}
      return 0;
      })
    }
    ordenar('puntuacion');

    const dispatch = useDispatch() 
  
    const [title, setTitle] = useState('');
    const [puntuacion, setPuntuacion] = useState(0);

    function handleChangeTitle(event) {
      setTitle( event.target.value );
    }
    function handleChangePuntuacion(event) {
        setPuntuacion( event.target.value );
      }

    function handleSubmit(event) {
        event.preventDefault();
        // Usamos el title que tenemos guardado en nuestro estado interno y que fue ingresado en el form
        // con el handleChange
        dispatch(getRecetas(title, puntuacion));
        // Para limpiar el form del dato anterior
        setTitle('');
        setPuntuacion('');
        
      }

    return (
        <>
         <form className="form-container" onSubmit={(e) => handleSubmit(e)}>
          <div>
          
           <label className="label" htmlFor="title">Comida: </label>
           <input type="text" id="title" autoComplete="off" value={title} onChange={(e) => handleChangeTitle(e)}></input>

            <label className="label" htmlFor="title">Puntuacion minima: </label>
            <input type="text" id="puntuacion" autoComplete="off" value={puntuacion} onChange={(e) => handleChangePuntuacion(e)}></input>
            <button type="submit">BUSCAR</button>
          </div>
          
         </form>
         <Link to={'/form'}>
             {'Ingresar receta'} 
         </Link>

           {/* Aqui listo todas las recetas */}
         <ul style={{list_style_type: "none"}}>
        
          {recetas.map((r) => 
          <>
           <li key={r.idApi}>
            <Link to={`/recipes/${r.idApi}-${r.fuente}`}>
             {r.nombre} 
            </Link>
           </li>
           <li key={r.idApi}>{`puntuación: ${r.puntuacion}`}</li>
           
           <li key={r.idApi}>{`Id: ${r.idApi}`}</li>
           <img src={r.imagen} alt=''/>
          </>
            )}
         </ul>

        </>

    )
}
export default Home;

/*          <hr />
         <h3>RECETAS</h3>
         <ul>
             {recetas.map((r) => (
              <li key={r.idApi}>{r.nombre}</li>
             ))}
         </ul> */


// <button onClick={() => props.addMovieFavourite({title: mov.Title, id: mov.imdbID})}>  Fav</button> 
