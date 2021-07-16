import React, { useState } from 'react';
import { Link , useHistory} from 'react-router-dom';
import axios from "axios";
import '../components/AppCheck.css'
import  CheckBox  from '../components/CheckBox'

const initialState = 
{
  nombre: '',
  resumen: '',
  puntuacion: '',
  nivel: '',
  instrucciones: '',
  dietas: [],
  errors: {
      nombre: '',
      resumen: '',
      puntuacion: '',
      nivel: ''
    },
    disabled: true
};

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
  //console.log('dietasInput: ', dietasInput);

function InputForm() {
  const [input, setInput] = useState(initialState);
  const [dietas, setDietas] = useState(dietasInput);
  const { push } = useHistory() ;
  
  function handleSubmit(e) {
    e.preventDefault();
    if(!input.nombre || !input.resumen) {
        alert('Faltan campos obligatorios')
    }
    else{
      let dietasId = [];
      dietas.forEach(item => item.isChecked && dietasId.push(item.id))

      let receta = {
        nombre: input.nombre,
        resumen: input.resumen,
        puntuacion: input.puntuacion,
        nivel: input.nivel,
        instrucciones: input.instrucciones,
        dietas : dietasId
        
      }
     // alert('Form ok para postear');
     //dispatch(postReceta(receta))
     axios.post('http://localhost:3001/api/recipes',receta)
      .then((response) => {
       push(`/recipes/${response.data.id}`)
      });
     
     setInput(initialState);
     // Por alguna razon dietasInput hay que inicializarlo pues queda cargado con los checks
     dietasInput.forEach(item => item.isChecked = false)
     setDietas(dietasInput);
     //console.log('dietasinput: ',dietasInput) ;
    }
  }

  function handleChange(e) {
    const { value, name } = e.target;
    let errors = input.errors;

    switch (name) {
      case 'nombre': 
        errors.nombre = (value.length === 0 || value == null || /^\s+$/.test(value)) ? 'Campo mandatorio !' : '';
        break;
      case 'resumen': 
        errors.resumen = (value.length === 0 || value == null || /^\s+$/.test(value)) ? 'Campo mandatorio !' : '';
        break;
        case 'puntuacion': 
        errors.puntuacion = (isNaN(value) || value > 100 || value < 0 ) ? 'el valor debe ser numerico' : '';
        break;
        case 'nivel': 
        errors.nivel = (isNaN(value) || value > 100 || value < 0 ) ? 'el valor debe ser numerico' : '';
        break;
    
      default:
        break;
    }
    // Verifico si hubo errores para habilitar o deshabilitar el boton de submit
    let valid = true;
    Object.values(errors).forEach( (val) => val.length > 0 && (valid = false));

    setInput({
      ...input,
      [name]: value,
      errors,
      disabled: !valid 
    });

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
    
    <Link to={'/home'} className="btn-ing">
      {'Home'} 
    </Link>

    <form onSubmit={handleSubmit}> 
     <fieldset><legend>Ingreso de receta propia</legend>
      <label className="label-receta" for="nombre">Titulo:</label> 
      <input
        name="nombre"
        type="text"
        className="input-receta"
        value={input.nombre}
        onChange={handleChange}
        placeholder="Titulo de la receta" /><br/>
        {input.errors.nombre.length === 0 ? null : <div>{input.errors.nombre}</div>}
        
      <label className="label-receta" for="resumen">Resumen:</label>  
      <input
        name="resumen"
        type="text"
        className="input-receta"
        value={input.resumen}
        onChange={handleChange}
        placeholder="Un breve resumen del plato..." /><br/>
        {input.errors.resumen.length === 0 ? null : <div>{input.errors.resumen}</div>}
        
      <label className="label-receta" for="puntuacion">Puntuación:</label>  
      <input
        name="puntuacion"
        type="text"
        className="input-receta"
        value={input.puntuacion}
        onChange={handleChange}
        placeholder="Opcional,  de 0 a 100" /><br/>
        {input.errors.puntuacion.length === 0 ? null : <div>{input.errors.puntuacion}</div>}
        
      <label className="label-receta" for="nivel">Nivel salud:</label>  
      <input
        name="nivel"
        type="text"
        className="input-receta"
        value={input.nivel}
        onChange={handleChange}
        placeholder="Opcional, valor de 0 a 100" /><br/>
        {input.errors.nivel.length === 0 ? null : <div>{input.errors.nivel}</div>}
        
      <label className="label-receta" for="instrucciones">Paso a paso:</label> <br/>   
      <textarea
        className="textarea"
        name="instrucciones"
        type="text"
        value={input.instrucciones}
        onChange={handleChange}
        placeholder="Opcional: pasos de la elaboracion del plato..." />

      <div className="AppCheck">
       <p> Seleccione las dietas </p>
       <input type="checkbox" onChange={handleAllChecked}  value="checkedall" /> Check / Uncheck All
        <ul>
        {
          dietas.map((dieta, index) => {
            return (<CheckBox key={index} handleCheckChieldElement={handleCheckChieldElement} checked={dieta.isChecked} value={dieta.value} />)
          })
        }
        </ul>
      </div>
      
      
      <input className="btn-submit" disabled={input.disabled} type="submit" value="Submit" />
      <br/>
 </fieldset>
    </form>
   </> 
  )
}

export default InputForm;