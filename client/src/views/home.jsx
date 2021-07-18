import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useHistory } from 'react-router-dom';
import axios from "axios";
import { getRecetas } from "./actions.js";
// import Lista from "../components/Lista";
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

    let history = useHistory();

    function handleChangeTitle(event) {
      setTitle( event.target.value );
    }

    function handleChangePuntuacion(event) {
      setPuntuacion( event.target.value );
      }
    
    const ordenamiento_handleChange = (event) => {
        setOrdenamiento(event.target.value);
  
      }  
    
    function aplicar(){
        switch (ordenamiento) {
          case 'nombre-a' : dispatch(orderRecetasNombre('A'))
           break
          case 'nombre-d': dispatch(orderRecetasNombre('D'))
           break
          case 'puntuacion-a': dispatch(orderRecetasPuntuacion('A'))
            break
          case 'puntuacion-d': dispatch(orderRecetasPuntuacion('D'))
            break  
    
          default: console.log('no se selecciona nada');
        }
        history.push('/lista')
      }
    
 
    function handleSubmit(event) {
        event.preventDefault();
        // Usamos el title que tenemos guardado en nuestro estado interno y que fue ingresado en el form
        // con el handleChange
        dispatch(getRecetas(title));
        setTitle('');
        history.push('/lista')
              
      }

      function handleAllChecked(event) {
        let dietasv = dietas
        dietasv.forEach(dieta => dieta.isChecked = event.target.checked) 
        setDietas(dietasv => dietasv)
        console.log('All: ',dietas)
       }
      
      function handleCheckChieldElement(event) {
        let dietasv = dietas
        dietasv.forEach(dieta => {
           if (dieta.value === event.target.value)
              dieta.isChecked =  event.target.checked
        })
        setDietas(dietasv => dietasv)
        console.log('child: ',dietas)
      }  

      function filtrarPuntuacion ()  {
        dispatch(filterPuntuacion(puntuacion))
        history.push('/lista')
      }

      function resetearFiltros () {
        dispatch(resetFilter())
        history.push('/lista')
      }

      function filtrarDietas () {
        dispatch(filterDietas(dietas))
        history.push('/lista')
      }

     
    return (
        <>
         <h1 className="titulo-home">Que tipo de comida desea cocinar hoy ? </h1>
         <div>
           
         </div>
         <br/> 
          
         <form className="form-container" onSubmit={(e) => handleSubmit(e)}>
          <div className='barraHome'>
           <label className="labels-home" htmlFor="title" >Comida: </label>
           <input type="text" className="cajaTitle" id="title" autoComplete="off" placeholder="Ravioles con tuco..."   value={title} onChange={(e) => handleChangeTitle(e)}></input>
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
          <label className="labels-home" htmlFor="puntuacion">Puntuacion: </label>
          <input type="text" id="puntuacion" autoComplete="off" placeholder="0 a 100" value={puntuacion} onChange={(e) => handleChangePuntuacion(e)}></input>
          <button onClick={filtrarPuntuacion}>Aplicar filtro:</button>
          <button onClick={resetearFiltros}>Reset filtros</button><br/>
         </div>  


         <div className="filtros">
          <p> Seleccione las dietas </p>
          
          <input type="checkbox" onChange={handleAllChecked}  value="checkedall" /> Check / Uncheck All
          <button onClick={filtrarDietas}>Filtrar</button>
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

        {/*  <Lista/>  */}
        <div>
         <Link to={'/lista'} className="btn">
              {'Listado'} 
          </Link>  
        </div>
        <br/><br/><br/>
        <div>
          <button onClick={()=> history.push('/check')}>Test clase</button>
          <button onClick={()=> history.push('/checkFunc')}>Test funcional</button>
        </div>  
    </>

    )
}
export default Home;

// <label className="label" htmlFor="puntuacion">Puntuacion minima: </label>
// <input type="text" id="puntuacion" autoComplete="off" value={puntuacion} onChange={(e) => handleChangePuntuacion(e)}></input>

// <button onClick={() => dispatch(filterPuntuacion(puntuacion))}>Filtrar puntuacion mínima:</button>

//  <button onClick={() => filterPuntuacionArrow}>Filtrar puntuacion mínima:</button>

//           <Link to={'/form'} className="btn">
// {'Ingresar receta'} 
// </Link>  