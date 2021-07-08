import axios from "axios";

export const SET_RECETAS = "SET_RECETAS";

// Aca se comunica con nuestro backend que esta operando en 3001
export function getRecetas() {
    return(dispatch) => {
      axios.get('http://localhost:3001/api/recipes?name=pasta')
     .then((response) => {
      dispatch({type: SET_RECETAS, payload: response.data});
     });
    }
}