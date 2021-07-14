import axios from "axios";

export const SET_RECETAS = "SET_RECETAS";
export const SET_RECETA = "SET_RECETA";
export const CARGA_RECETA = "CARGA_RECETA";
export const FILTER_PUNTUACION = "FILTER_PUNTUACION";
export const RESET_FILTER = "RESET_FILTER";
export const GET_DIETAS = "GET_DIETAS";
export const ORDER_RECETAS_NOMBRE = "ORDER_RECETAS_NOMBRE";
export const ORDER_RECETAS_PUNTUACION = "ORDER_RECETAS_PUNTUACION";
export const FILTER_DIETAS = "FILTER_DIETAS";


// Aca se comunica con nuestro backend que esta operando en 3001
export function getRecetas(search) {
      return(dispatch) => {
      axios.get(`http://localhost:3001/api/recipes?name=${search}`)
     .then((response) => {
       let recetas = response.data ;
       dispatch({type: SET_RECETAS, payload: recetas});
     });
    }
};


export function orderRecetasNombre(order) {
  return {type: ORDER_RECETAS_NOMBRE, payload: order};
}

export function orderRecetasPuntuacion(order) {
  return {type: ORDER_RECETAS_PUNTUACION, payload: order};
}

export function filterPuntuacion(valor) {
 return {type: FILTER_PUNTUACION, payload: valor};
}

export function filterDietas(dietas) {
  console.log('actions filter dietas: ', dietas)
  let arrDietas = [];
  dietas.forEach(item => {if(item.isChecked) arrDietas.push(item.value)})
  console.log('actions arrDietas: ', arrDietas)
  return {type: FILTER_DIETAS, payload: arrDietas};
}

export function resetFilter() {
  return {type: RESET_FILTER};
}

export function getReceta(idReceta) {
  return(dispatch) => {
    axios.get(`http://localhost:3001/api/recipes/${idReceta}`)
   .then((response) => {
    dispatch({type: SET_RECETA, payload: response.data});
   });
  }
}

export function getDietas() {
  return(dispatch) => {
    axios.get('http://localhost:3001/api/diets/types')
   .then((response) => {
    dispatch({type: GET_DIETAS, payload: response.data});
   });
  }
}

export function postReceta(receta) {
  return(dispatch) => {
    axios.post('http://localhost:3001/api/recipes',receta)
   .then((response) => {
    dispatch({type: CARGA_RECETA, payload: response.data});
   }).catch(error => {console.log(error.response.status)});
  }
} 

export function postRecetaTest(receta) {
  return(dispatch) => {
    axios.post('http://localhost:3001/api/recipes',receta)
   .then((response) => {
    dispatch({type: SET_RECETA, payload: response.data.idApi});
   });
  }
}





export function clearReceta(){
  return {type: SET_RECETA, payload: undefined}
}