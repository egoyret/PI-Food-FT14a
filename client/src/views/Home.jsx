import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from 'react-router-dom';
import axios from "axios";
import { getRecetas } from "./actions.js";
import '../components/AppCheck.css'
import Lista from '../components/Lista'
import { orderRecetasNombre, orderRecetasPuntuacion, filterPuntuacion, filterDietas, resetFilter, filterTipoReceta } from "../views/actions.js";
import  AppCheck  from '../components/AppCheck'

  //  Cargo las dietas
  let dietasInput = [];
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
    const [ordenamiento, setOrdenamiento] = useState('nombre-a'); 
    const [tipoReceta, setTipoReceta] = useState('externas');
    const [title, setTitle] = useState('');
    const [busqueda, setBusqueda] = useState('');
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
    
    const tipoReceta_handleChange = (event) => {
      setTipoReceta(event.target.value);
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
    
          default: dispatch(orderRecetasNombre('A'));
        }
      }

      function aplicarTipo(){
        dispatch(filterTipoReceta(tipoReceta));
 
      }
    
 
    function handleSubmit(event) {
        event.preventDefault();
        // Usamos el title que tenemos guardado en nuestro estado interno y que fue ingresado en el form
        // con el handleChange
        setBusqueda(title);
        dispatch(getRecetas(title));
        setTitle('');
    }

    function capturaDietas(dato) {
      setDietas(dato)
    }

    function filtrarPuntuacion ()  {
        dispatch(filterPuntuacion(puntuacion))
    }

    function resetearFiltros () {
        dispatch(resetFilter())
       // inicializo el filtro de dietas con el valor inicial dietasInput
       // Por alguna razon dietasInput hay que inicializarlo previamente pues queda cargado con los checks
       dietasInput.forEach(item => item.isChecked = false)
       setDietas(dietasInput);
    }

    function filtrarDietas () {
       dispatch(filterDietas(dietas))
    }

    return (
     <>
         <h1 className="titulo-home">Que tipo de comida desea cocinar hoy ? </h1>
         <br/> 
        <div className="total-container"> 
         <div className="big-container">
             <form className="form-container" onSubmit={(e) => handleSubmit(e)}>
                <div className='barraHome'>
                  <div className='barraHome_search'>
                    <label className="labels-home" htmlFor="title" >Comida: </label>
                    <input type="text" className="cajaTitle" id="title" autoComplete="off" placeholder="Ravioles con tuco..."   value={title} onChange={(e) => handleChangeTitle(e)}></input>
                  </div>
                  <button type="submit" className="btn btn-home">BUSCAR</button><br/>
                </div>
             </form>

             <div className="barraHome">
                  <label className="labels-home">Orden:</label>
                  <div className="barraHome_search">
                   <select className="cajaTitle" value={ordenamiento} onChange={ordenamiento_handleChange}>
                     <option value="nombre-a">Nombre ascedente</option>
                     <option value="nombre-d">Nombre descendente</option>
                     <option value="puntuacion-a">Puntuacion ascendemte</option>
                     <option value="puntuacion-d">Puntuacion descendente</option>
                   </select>
                  </div>
                   <button className="btn btn-home" onClick={aplicar}>APLICAR</button>
                  
             </div> 

             <div className="barraHome">
               <label className="labels-home" htmlFor="puntuacion">Puntos: </label>
               <input type="text" className="cajaTitle" id="puntuacion" autoComplete="off" placeholder="0 a 100" value={puntuacion} onChange={(e) => handleChangePuntuacion(e)}></input>
               <button className="btn btn-home" onClick={filtrarPuntuacion}>APLICAR:</button>

              
             </div>  
             
             <div className="barraHome">
                  <label className="labels-home">Recetas: </label>
                  <select className="cajaTitle" value={tipoReceta} onChange={tipoReceta_handleChange}>
                    <option value="Todas">Todas</option>
                    <option value="Api">Externas</option>
                    <option value="Propia">Propias</option>
                  </select>
               
                <button className="btn btn-home"  onClick={aplicarTipo}>APLICAR</button>
             </div> 
             <br/>
            <div className="dietas_zone">
              <div className="dietas_detail">
               <AppCheck selectDietas={capturaDietas} listaDietas={dietasInput}/>
               <button className="btn btn-home" onClick={filtrarDietas}>Filtrar</button>
              </div>  
              <div className="reset_filters">
                <button className="btn btn-home" onClick={resetearFiltros}>Reset filtros</button><br/>
              </div>
            </div> 
             <br/>
          </div> 

         {/*  <Lista/>  */}
         <div className="small-container">
         <Lista search={busqueda}/>

{/*           <Link to={'/lista'} className="btn">
              {'Listado'} 
          </Link>   */}
         </div>
       </div>

         <br/><br/><br/>
         <div>
          {/*  Esto es solo para pruebas */} 
          <button onClick={()=> history.push('/check')}>Test clase</button>
          <button onClick={()=> history.push('/checkFunc')}>Test funcional</button>
          <button onClick={()=>console.log(dietas)}>VerDietas</button>
         </div>  
     </>
    )
}
export default Home;

// eslint-disable-next-line 
 {/*         <div className="filtros">
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
 */} 
