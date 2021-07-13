import axios from "axios";

export const SET_RECETAS = "SET_RECETAS";
export const SET_RECETA = "SET_RECETA";
export const CARGA_RECETA = "CARGA_RECETA";
export const ORDER_RECETAS = "ORDER_RECETAS";
export const FILTER_PUNTUACION = "FILTER_PUNTUACION";
export const RESET_FILTER = "RESET_FILTER";


// Aca se comunica con nuestro backend que esta operando en 3001
export function getRecetas(search, puntuacion, orden, sentido) {
      if(puntuacion === null || puntuacion === '') {puntuacion = 0};
      return(dispatch) => {
      axios.get(`http://localhost:3001/api/recipes?name=${search}`)
     .then((response) => {
       let campo;
       orden === 'P' ? campo = 'puntuacion' :  campo = 'nombre' ;
       let respuesta = response.data ;
       let recetas = respuesta.filter(r => r.puntuacion >= parseInt(puntuacion));
       recetas.sort(function(a, b) {
        if (a[campo] > b[campo]) { return 1;}
        if (a[campo] < b[campo]) { return -1;}
        return 0;
        })

      dispatch({type: SET_RECETAS, payload: recetas});
     });
    }
};

export function orderRecetas() {
  return {type: ORDER_RECETAS};
}

export function filterPuntuacion(valor) {
  return {type: FILTER_PUNTUACION, payload: valor};
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