import React, { useState } from 'react'
import './AppCheck.css'
import  CheckBox  from './CheckBox'
import axios from "axios";

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


function AppCheck(){
  const initialState = dietasInput;
  const [dietas, setDietas] = useState(initialState); 
    
  function handleAllChecked(event) {
    let dietasv = dietas
    dietasv.forEach(dieta => dieta.isChecked = event.target.checked) 
    setDietas(dietasv)
    console.log(dietas);
  }

  function handleCheckChieldElement(event) {
    let dietasv = dietas
    dietasv.forEach(dieta => {
       if (dieta.value === event.target.value)
          dieta.isChecked =  event.target.checked
    })
    setDietas(dietasv)
    console.log(dietas);
  }
  
    return (
      <div className="AppCheck">
      <h1> Check and Uncheck All Example </h1>
      <p><b>Componente Funcional</b></p>
      <input type="checkbox" onChange={handleAllChecked}  value="checkedall" /> Check / Uncheck All
        <ul>
        {
          dietas.map((dieta, index) => {
            return (<CheckBox key={index} handleCheckChieldElement={handleCheckChieldElement} checked={dieta.isChecked} value={dieta.value} />)
          })
        }
        </ul>
      </div>
    );
  }

export default AppCheck;
