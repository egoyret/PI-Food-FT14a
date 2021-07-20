import axios from "axios";

export const SET_RECETAS = "SET_RECETAS";
export const SET_RECETA = "SET_RECETA";
export const CARGA_RECETA = "CARGA_RECETA";

// Aca se comunica con nuestro backend que esta operando en 3001
export function getRecetas(search, puntuacion) {
      if(puntuacion === null || puntuacion === '') {puntuacion = 0};
      return(dispatch) => {
      axios.get(`http://localhost:3001/api/recipes?name=${search}`)
     .then((response) => {
      dispatch({type: SET_RECETAS, payload: response.data.filter(r => r.puntuacion >= parseInt(puntuacion))});
     });
    }
}

export function getReceta(idReceta) {
  return(dispatch) => {
    axios.get(`http://localhost:3001/api/recipes/${idReceta}`)
   .then((response) => {
    dispatch({type: SET_RECETA, payload: response.data});
   });
  }
}

export function postReceta(receta) {
  return(dispatch) => {
    
    axios.post('http://localhost:3001/api/recipes',receta)
   .then((response) => {
    dispatch({type: CARGA_RECETA, payload: response.data});
   });
  }
}