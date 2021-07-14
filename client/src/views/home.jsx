import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from 'react-router-dom';
import axios from "axios";
import { getRecetas } from "./actions.js";
import Lista from "../components/Lista";
import '../components/AppCheck.css'
import { orderRecetasNombre, orderRecetasPuntuacion, filterPuntuacion, filterDietas, resetFilter } from "../views/actions.js";
import  CheckBox  from '../components/CheckBox'

  // Cargo las dietas
  var dietasInput = [];
  let obj = {};
  axios.get('http://localhost:3001/api/diets/types')
  .then((response) => {
    response.data.forEach(item =>
     {obj = {id: item.id, value: item.nombre, isChecked: false}
     dietasInput.push(obj)}
    )
  });

function Home() {

    const dispatch = useDispatch() 
    const [puntuacion, setPuntuacion] = useState(0);
    const [ordenamiento, setOrdenamiento] = useState(''); 
    const [title, setTitle] = useState('');
    const [dietas, setDietas] = useState(dietasInput);

    function handleChangeTitle(event) {
      setTitle( event.target.value );
    }

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
    
 
    function handleSubmit(event) {
        event.preventDefault();
        // Usamos el title que tenemos guardado en nuestro estado interno y que fue ingresado en el form
        // con el handleChange
        dispatch(getRecetas(title));
        setTitle('');
               
      }

      function handleAllChecked(event) {
        let dietasv = dietas
        dietasv.forEach(dieta => dieta.isChecked = event.target.checked) 
        setDietas(dietasv)
       }
      
      function handleCheckChieldElement(event) {
        let dietasv = dietas
        dietasv.forEach(dieta => {
           if (dieta.value === event.target.value)
              dieta.isChecked =  event.target.checked
        })
        setDietas(dietasv)
      }  

    return (
        <>
         <div>
           <br/> 
          <Link to={'/form'} className="btn">
              {'Ingresar receta'} 
          </Link>  
         </div>
         <br/> <br/>
         
         <form className="form-container" onSubmit={(e) => handleSubmit(e)}>
          <div className='barraHome'>
           <label className="label" htmlFor="title">Comida: </label>
           <input type="text" className="cajaTitle" id="title" autoComplete="off" value={title} onChange={(e) => handleChangeTitle(e)}></input>
           <button type="submit">BUSCAR</button><br/>
          </div>
         </form>

         <div className="ordenamiento">
          <label>Ordenamiento:
            <select value={ordenamiento} onChange={ordenamiento_handleChange}>
              <option value="nombre-a">Nombre ascedente</option>
              <option value="nombre-d">Nombre descendente</option>
              <option value="puntuacion-a">Puntuacion ascendemte</option>
              <option value="puntuacion-d">Puntuacion descendente</option>
            </select>
          </label>
          <button className="aplicar" onClick={aplicar}>Aplicar</button>
         </div> 

         <div className="filtros">
          <button onClick={() => dispatch(filterPuntuacion(puntuacion))}>Filtrar puntuacion mínima:</button>
          <input type="text" id="puntuacion" autoComplete="off" value={puntuacion} onChange={(e) => handleChangePuntuacion(e)}></input>
          <button onClick={() => dispatch(resetFilter())}>Reset filtros</button><br/>
         </div>  


         <div className="filtros">
          <p> Seleccione las dietas </p>
          
          <input type="checkbox" onChange={handleAllChecked}  value="checkedall" /> Check / Uncheck All
          <button onClick={() => dispatch(filterDietas(dietas))}>Filtrar</button>
          <ul>
           {
            dietas.map((dieta, index) => {
            return (<CheckBox key={index} handleCheckChieldElement={handleCheckChieldElement} checked={dieta.isChecked} value={dieta.value} />)
            })
           }
          </ul>
         </div>
         <br/>

         {/* Aqui listo todas las recetas */}

         <Lista/> 
       

         </>

    )
}
export default Home;

// <label className="label" htmlFor="puntuacion">Puntuacion minima: </label>
// <input type="text" id="puntuacion" autoComplete="off" value={puntuacion} onChange={(e) => handleChangePuntuacion(e)}></input>


