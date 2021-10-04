import React, { Component } from 'react'
import './AppCheck.css'
import  CheckBox  from './CheckBox'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      dietas: props.listaDietas
    }
  }
  
  handleAllChecked = (event) => {
    let dietas = this.state.dietas
    dietas.forEach(dieta => dieta.isChecked = event.target.checked) 
    this.setState({dietas: dietas})
    console.log(this.state.dietas);
    this.props.selectDietas(this.state.dietas)
  }

  handleCheckChieldElement = (event) => {
    let dietas = this.state.dietas
    dietas.forEach(dieta => {
       if (dieta.value === event.target.value)
          dieta.isChecked =  event.target.checked
    })
    this.setState({dietas: dietas})
    console.log(this.state.dietas);
    this.props.selectDietas(this.state.dietas)
  }

    render() {
    return (
      <div className="AppCheck">
      <p> Seleccione las dietas </p>
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
