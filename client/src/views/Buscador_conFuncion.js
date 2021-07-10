import React, { useState } from "react";
import { connect } from "react-redux";
import { Link } from 'react-router-dom';
import './Buscador.css';
import { addMovieFavourite, getMovies} from '../../actions/index.js';

// Con componente funcional:

export function BuscadorFunc(props) {

  const [title, setTitle] = useState('');

  function handleChange(event) {
    setTitle( event.target.value );
  }
  function handleSubmit(event) {
    event.preventDefault();
    // Usamos el title que tenemos guardado en nuestro estado interno y que fue ingresado en el form
    // con el handleChange
    props.getMovies(title)
    // Para limpiar el form del dato anterior
    setTitle('')
  }
  //const { title } = title;
  return (
    <div>
      <h2>Buscador Funcional</h2>
      <form className="form-container" onSubmit={(e) => handleSubmit(e)}>
        <div>
          <label className="label" htmlFor="title">Película: </label>
          <input
            type="text"
            id="title"
            autoComplete="off"
            value={title}
            onChange={(e) => handleChange(e)}
          />
        </div>
        <button type="submit">BUSCAR</button>
      </form>
      <ul>
       {/* Aqui tienes que escribir tu codigo para mostrar la lista de peliculas */}
       {props.movies.map((mov) => 
       <li key={mov.imdbID}>
         <Link to={`/movie/${mov.imdbID}`}>
          {mov.Title} 
        </Link>
       <button onClick={() => props.addMovieFavourite({title: mov.Title, id: mov.imdbID})}>  Fav</button> 
       </li>)}
      </ul>
    </div>
  );

}

function mapStateToProps(state){
  return {movies: state.moviesLoaded};
}

export default connect(mapStateToProps, {getMovies, addMovieFavourite})(BuscadorFunc);



/* export class Buscador extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: ""
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChange(event) {
    this.setState({ title: event.target.value });
  }
  handleSubmit(event) {
    event.preventDefault();
    // Usamos el title que tenemos guardado en nuestro estado interno y que fue ingresado en el form
    // con el handleChange
    this.props.getMovies(this.state.title)
    // Para limpiar el form del dato anterior
    this.setState({title:''})
  }

  render() {
    const { title } = this.state;
    return (
      <div>
        <h2>Buscador</h2>
        <form className="form-container" onSubmit={(e) => this.handleSubmit(e)}>
          <div>
            <label className="label" htmlFor="title">Película: </label>
            <input
              type="text"
              id="title"
              autoComplete="off"
              value={title}
              onChange={(e) => this.handleChange(e)}
            />
          </div>
          <button type="submit">BUSCAR</button>
        </form>
        <ul>
         
         {this.props.movies.map((mov) => 
         <li key={mov.imdbID}>
           <Link to={`/movie/${mov.imdbID}`}>
            {mov.Title} 
          </Link>
         <button onClick={() => this.props.addMovieFavourite({title: mov.Title, id: mov.imdbID})}>  Fav</button> 
         </li>)}
        </ul>
      </div>
    );
  }
}
 */


