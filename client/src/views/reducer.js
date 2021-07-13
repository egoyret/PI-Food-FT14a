import { SET_RECETAS, SET_RECETA, ORDER_RECETAS, FILTER_PUNTUACION, RESET_FILTER } from './actions'
const initialState = {
recetas: [],
originales: [],
receta: {}
};
export default function reducer(state = initialState, action) {
  
    switch(action.type) {
        case SET_RECETAS: return {...state, recetas: action.payload, originales: action.payload }

        case SET_RECETA: return {...state,  receta: action.payload  }

        case ORDER_RECETAS:
          return {...state, recetas: state.recetas.slice().sort(function(a, b) {if(a.nombre > b.nombre) return 1; if(a.nombre < b.nombre) return -1; return 0;})};

        case FILTER_PUNTUACION:
          return {...state, recetas: state.recetas.filter(item => item.puntuacion >= parseInt(action.payload))};
        
        case RESET_FILTER:
            return {...state, recetas: state.originales}  

        default: return state
    }
     
}