import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from 'react-router-dom';
import { getRecetas } from "./actions.js";
import { orderRecetas } from "./actions.js";
// import axios from "axios";

function Home() {

    // Version Redux (usando hooks en vez de connect para traer datos del store)
    const recetas = useSelector(state => state.recetas)

   /*  function ordenar(campo) {  recetas.sort(function(a, b) {
      console.log('Ordenando por ', campo);
      if (a[campo] > b[campo]) { return 1;}
      if (a[campo] < b[campo]) { return -1;}
      return 0;
      })
    } */


    // ordenar('puntuacion');

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

    function handleChangeOrden(event) {
       setOrden( event.target.value );
    }

    function handleChangeOrdenNew(event) {
      setOrden( event.target.value );
   }


    function handleChangeSentido(event) {
      setSentido( event.target.value );
   }


    function handleSubmit(event) {
        event.preventDefault();
        // Usamos el title que tenemos guardado en nuestro estado interno y que fue ingresado en el form
        // con el handleChange
        dispatch(getRecetas(title, puntuacion, orden, sentido));
        //console.log('orden: ',orden)
        // orden === 'P' ? ordenar('puntuacion') : ordenar('nombre');
        // Para limpiar el form del dato anterior
        setTitle('');
        setPuntuacion('');
      }

    function handleSubmitOrden(event) {
      event.preventDefault();
      console.log('handlesubmit orden');
      dispatch(orderRecetas())
    }  

    return (
        <>
         <form className="form-container" onSubmit={(e) => handleSubmit(e)}>
          <div className='barraHome'>
           <label className="label" htmlFor="title">Comida: </label>
           <input type="text" id="title" autoComplete="off" value={title} onChange={(e) => handleChangeTitle(e)}></input>
           <label className="label" htmlFor="puntuacion">Puntuacion minima: </label>
           <input type="text" id="puntuacion" autoComplete="off" value={puntuacion} onChange={(e) => handleChangePuntuacion(e)}></input>
           <label className="label" htmlFor="orden">Ordenar por (P/N): </label>
           <input type="text" id="orden" autoComplete="off" value={orden} onChange={(e) => handleChangeOrden(e)}></input>
           <label className="label" htmlFor="sentido">Sentido (A/D): </label>
           <input type="text" id="sentido" autoComplete="off" value={sentido} onChange={(e) => handleChangeSentido(e)}></input>
           <button type="submit">BUSCAR</button>
          </div>
         </form>
         <form onSubmit={(e) => handleSubmitOrden(e)}>
          <label>Ordenar por (P/N): </label>
          <input type="text" id="orden" autoComplete="off" value={orden} onChange={(e) => handleChangeOrdenNew(e)}></input>
          <button type="submit">Aplicar</button>
         </form>
         
        <div>
          <Link to={'/form'}>
              {'Ingresar receta'} 
          </Link>  
        </div>


           {/* Aqui listo todas las recetas */}
         <ul style={{list_style_type: "none"}}>
          {recetas.map((r) => 
            <li key={r.idApi}>
              <Link to={`/recipes/${r.idApi}-${r.fuente}`}>
                {r.nombre} 
              </Link>
              <span>{`   puntuación: ${r.puntuacion}`}</span>
              <p>{`Id: ${r.idApi}`}</p>
              <img src={r.imagen} alt=''/>
           </li>
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

    // Version React
/*  const [recetas, setRecetas] = useState([])
    useEffect( () =>{
     axios.get('http://localhost:3001/api/recipes?name=pasta')
     .then(response => {
      console.log(response.data)  ; 
      setRecetas(response.data);
     })
    },[]); */
