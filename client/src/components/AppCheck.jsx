import React, { Component } from 'react'
import './AppCheck.css'
import  CheckBox  from './CheckBox'
import axios from "axios";

 // Cargo las dietas
 /* var dietasInput = [];
 let obj = {};
 axios.get('http://localhost:3001/api/diets/types')
 .then((response) => {
   response.data.forEach(item =>
    {obj = {id: item.id, value: item.nombre, isChecked: false}
    dietasInput.push(obj)}
   )
 }); */

 var dietasInput = [
  {id: 1, value: "Gluten Free", isChecked: false},
  {id: 2, value: "Ketogenic", isChecked: false},
  {id: 3, value: "Vegetarian", isChecked: false},
  {id: 4, value: "Lacto-Vegetarina", isChecked: false},
  {id: 5, value: "lacto ovo vegetarian", isChecked: false},
  {id: 6, value: "Ovo-Vegetarian", isChecked: false},
  {id: 7, value: "Vegan", isChecked: false},
  {id: 8, value: "Pescatarian", isChecked: false},
  {id: 9, value: "Paleo", isChecked: false},
  {id: 10, value: "Primal", isChecked: false},
  {id: 11, value: "Whole30", isChecked: false},
  {id: 12, value: "dairy free", isChecked: false}
 ]

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      dietas: dietasInput
    }
  }
  
  handleAllChecked = (event) => {
    let dietas = this.state.dietas
    dietas.forEach(dieta => dieta.isChecked = event.target.checked) 
    this.setState({dietas: dietas})
    console.log(dietas);
  }

  handleCheckChieldElement = (event) => {
    let dietas = this.state.dietas
    dietas.forEach(dieta => {
       if (dieta.value === event.target.value)
          dieta.isChecked =  event.target.checked
    })
    this.setState({dietas: dietas})
    console.log(dietas);
  }

  


  render() {
    return (
      <div className="AppCheck">
      <h1> Check and Uncheck All Example </h1>
      <p><b>Componente de Clase</b></p>
      <input type="checkbox" onChange={this.handleAllChecked}  value="checkedall" /> Check / Uncheck All
        <ul>
        {
          this.state.dietas.map((dieta, index) => {
            return (<CheckBox key={index} handleCheckChieldElement={this.handleCheckChieldElement}  {...dieta} />)
          })
        }
        </ul>
      </div>
    );
  }
}
export default App
/* 
[
  {id: 1, value: "banana", isChecked: false},
  {id: 2, value: "apple", isChecked: false},
  {id: 3, value: "mango", isChecked: false},
  {id: 4, value: "grap", isChecked: false}
] */