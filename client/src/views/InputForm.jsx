import React, { useState } from 'react';
import { useDispatch } from "react-redux";
import { postReceta } from "./actions.js";

const initialState = 
{
  nombre: '',
  resumen: '',
  puntuacion: 0,
  nivel: 0,
  instrucciones: '',
  errors: {
      nombre: '',
      resumen: '',
      puntuacion: '',
      nivel: ''
    },
    disabled: true
};
function InputForm() {
  const [input, setInput] = useState(initialState);
  const dispatch = useDispatch() ;
 
  function handleSubmit(e) {
    e.preventDefault();
    if(!input.nombre || !input.resumen) {
        alert('Faltan campos obligatorios')
    }
    else{
      let receta = {
        nombre: input.nombre,
        resumen: input.resumen,
        puntuacion: input.puntuacion,
        nivel: input.nivel,
        instrucciones: input.instrucciones
      }
      alert('Form ok para postear');
      dispatch(postReceta(receta))
      setInput(initialState);
    }
  }

  function handleChange(e) {
    const { value, name } = e.target;
    //console.log('value: ',value, ' name: ', name)
    //console.log('input: ',input)
    let errors = input.errors;
    // console.log('errors: ',errors);
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

  return (
    <form onSubmit={handleSubmit}>  
      <label>Titulo:</label> 
      <input
        name="nombre"
        type="text"
        value={input.nombre}
        onChange={handleChange}
        placeholder="Titulo de la receta" /><br/>
        {input.errors.nombre.length === 0 ? null : <div>{input.errors.nombre}</div>}
        
      <label>Resumen:</label>  
      <input
        name="resumen"
        type="text"
        value={input.resumen}
        onChange={handleChange}
        placeholder="Un breve resumen del plato..." /><br/>
        {input.errors.resumen.length === 0 ? null : <div>{input.errors.resumen}</div>}
        
      <label>Puntuación:</label>  
      <input
        name="puntuacion"
        type="text"
        value={input.puntuacion}
        onChange={handleChange}
        placeholder="Opcional,  de 0 a 100" /><br/>
        {input.errors.puntuacion.length === 0 ? null : <div>{input.errors.puntuacion}</div>}
        
      <label>Nivel salud:</label>  
      <input
        name="nivel"
        type="text"
        value={input.nivel}
        onChange={handleChange}
        placeholder="Opcional, valor de 0 a 100" /><br/>
        {input.errors.nivel.length === 0 ? null : <div>{input.errors.nivel}</div>}
        
      <label>Paso a paso:</label>    
      <input
        name="instrucciones"
        type="text"
        value={input.instrucciones}
        onChange={handleChange}
        placeholder="Opcional: pasos de la elaboracion del plato..." /><br/>
      
      <input disabled={input.disabled} type="submit" value="Submit" />
    </form>
  )
}

export default InputForm;