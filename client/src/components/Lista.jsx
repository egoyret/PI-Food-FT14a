import { useDispatch, useSelector } from "react-redux";
import { useEffect, useRef } from "react";
import { Link } from 'react-router-dom';
import { orderRecetas, filterPuntuacion, resetFilter } from "../views/actions.js";

function Lista() {

  const list = useSelector(state => state.recetas)

 const dispatch = useDispatch() 

 const myRef = useRef(null);
 function agregaSegundos() {
  // Busca en el DOM algo que tenga el atributo ref con el texto myRef (definido en el useEffect)
  // y toma el value del current el cual apunta al elemnto de entrada correspondiente
  let ref = myRef.current.value
  console.log(ref);
}
// Esto es para que el cursor se posicione (focus) en el campo que se necesita
useEffect(() => {
   myRef.current.focus()
}, [])



return (
    <>
      <button onClick={() => dispatch(orderRecetas())}>Ordenar</button>
      <button onClick={() => dispatch(filterPuntuacion(30))}>Filtrar</button>
      <button onClick={() => dispatch(resetFilter())}>Reset</button>
      <button>
      { <input type="number" ref={myRef} onChange={agregaSegundos} placeholder="Ingresa Segundos" autoComplete="off"/>}
      </button>




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
