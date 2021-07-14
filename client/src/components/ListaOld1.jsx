import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { Link } from 'react-router-dom';
import { orderRecetasNombre, orderRecetasPuntuacion, filterPuntuacion, resetFilter } from "../views/actions.js";

function Lista() {

const list = useSelector(state => state.recetas)
const [puntuacion, setPuntuacion] = useState(0);
const [ordenamiento, setOrdenamiento] = useState('');

const dispatch = useDispatch() 

function handleChangePuntuacion(event) {
  setPuntuacion( event.target.value );
  }

  function ordenamiento_handleChange(event) {
    setOrdenamiento(event.target.value);
    aplicar();
  }  

  function aplicar(){
    switch (ordenamiento) {
      case 'nombre-a' : dispatch(orderRecetasNombre('A'))
       break
      case 'nombre-d': dispatch(orderRecetasNombre('D'))
       break
      case 'puntuacion-a': dispatch(orderRecetasPuntuacion('A'))
        break
      case 'puntuacion-b': dispatch(orderRecetasPuntuacion('D'))
        break  

      default: console.log('no se selecciona nada');
    }
  }

 
return (
    <>
      <br/>
{/*       <button onClick={() => dispatch(orderRecetasNombre('A'))}>Ordenar por nombre Asc</button><br/>
      <button onClick={() => dispatch(orderRecetasNombre('D'))}>Ordenar por nombre Desc</button><br/>
      <button onClick={() => dispatch(orderRecetasPuntuacion('A'))}>Ordenar por puntuacion Asc</button><br/>
      <button onClick={() => dispatch(orderRecetasPuntuacion('D'))}>Ordenar por puntuacion Desc</button><br/>
 */}     
      <button onClick={() => dispatch(filterPuntuacion(puntuacion))}>Filtrar puntuacion mínima:</button>
    
      <input type="text" id="puntuacion" autoComplete="off" value={puntuacion} onChange={(e) => handleChangePuntuacion(e)}></input><br/>
      <button onClick={() => dispatch(resetFilter())}>Reset filtros</button><br/>
      <label>
            Seleccionar ordenamiento:
            <select value={ordenamiento} onChange={ordenamiento_handleChange}>
              <option value="nombre-a">Nombre ascedente</option>
              <option value="nombre-d">Nombre descendente</option>
              <option value="puntuacion-a">Puntuacion ascendemte</option>
              <option value="puntuacion-d">Puntuacion descendente</option>
            </select>
          </label>
        <button onClick={aplicar}>Aplicar</button>  



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
