import React, { useState, useEffect } from 'react'
import { useSelector } from "react-redux";
import { Link } from 'react-router-dom';

// 12jul21: me canse de hacerlo funcionar con setList, no va.
// no hago ordenamientos aca


function Lista(props) {
  // let list = useSelector(state => state.recetas)  
  //console.log('Recetas: ', RecetasCap);
  const test = [
    { nombre: 'juan', puntuacion: 50, idApi: 1 },
    { nombre: 'alberto', puntuacion: 40, idApi: 2 },
    { nombre: 'aragor', puntuacion: 2000, idApi: 3 },
  ];
  const list = props.recetas;
  //console.log('recetas: ', recetas);
  
  //const [list, setList] = React.useState(recetas);

  // setList(() => recetas);

  //console.log('list: ', list);
  
  //if(RecetasCap.length>0) {setList(RecetasCap)};
  //console.log('list: ', list);
  // utilizo useEffect para ejecutar este código sólo una vez

/*   useEffect(() => {
    console.log('Yo soy useEfect');
    
    // copio la lista con [...list] y la ordeno con sort()
    let sortedList = [...list].sort((a, b) => (a.nombre > b.nombre ? 1 : a.nombre < b.nombre ? -1 : 0))
    // actualizo el estado con la nueva lista ya ordenada
    setList(sortedList)
    
  },[])
  */ 

return (
    <>
      <button
          onClick={() =>{
              let newSortedList = [...list].sort((a, b) => (a.nombre > b.nombre ? 1 : a.nombre < b.nombre ? -1 : 0))
              if(newSortedList[0] === list[0])
              newSortedList = [...list].sort((b, a) => (a.nombre > b.nombre ? 1 : a.nombre < b.nombre ? -1 : 0))
            }}
      >Ordenar</button>

      

       {/* Aqui listo todas las recetas */}
       {list ? (
       <ul style={{listStyleType: "none"}}>
        {list.map((r) => 
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
       ) : (
        <div>Cargando...</div>
       )}


    </>
)
}

export default Lista;
