import { SET_RECETAS, SET_RECETA, ORDER_RECETAS_NOMBRE, ORDER_RECETAS_PUNTUACION, FILTER_DIETAS, FILTER_PUNTUACION, RESET_FILTER } from './actions'
const initialState = {
recetas: [],
originales: [],
receta: {}
};
export default function reducer(state = initialState, action) {
  
    switch(action.type) {
        case SET_RECETAS: return {...state, recetas: action.payload, originales: action.payload }

        case SET_RECETA: return {...state,  receta: action.payload  }

        case ORDER_RECETAS_NOMBRE:
          if(action.payload === 'A' ) { 
            return {...state, recetas: state.recetas.slice().sort(function(a, b) {if(a.nombre.toLowerCase() > b.nombre.toLowerCase()) return 1; if(a.nombre.toLowerCase() < b.nombre.toLowerCase()) return -1; return 0;})};
          } else {
            return {...state, recetas: state.recetas.slice().sort(function(b, a) {if(a.nombre.toLowerCase() > b.nombre.toLowerCase()) return 1; if(a.nombre.toLowerCase() < b.nombre.toLowerCase()) return -1; return 0;})};
          };

        case ORDER_RECETAS_PUNTUACION:
          if(action.payload === 'A' ) { 
            return {...state, recetas: state.recetas.slice().sort(function(a, b) {if(a.puntuacion > b.puntuacion) return 1; if(a.puntuacion < b.puntuacion) return -1; return 0;})};
          } else {
            return {...state, recetas: state.recetas.slice().sort(function(b, a) {if(a.puntuacion > b.puntuacion) return 1; if(a.puntuacion < b.puntuacion) return -1; return 0;})};
          };
    

        case FILTER_PUNTUACION:
            
            return {...state, recetas: state.recetas.filter(item => item.puntuacion >= parseInt(action.payload) )};
         
        case FILTER_DIETAS:
              
              return {...state, recetas: state.recetas.filter(item => 
              { 
               if(item.dietas.length>0) {
                  let result
                  action.payload.length === 0 ? result = true : result = false;
                  for(let i=0; i<action.payload.length; i++){
                   result = item.dietas.includes(action.payload[i].toLowerCase()) || result
                  }
                  return result
                } else {
                 return false 
                }
              }
              )};
              
              
              
              
        case RESET_FILTER:
            return {...state, recetas: state.originales}  

        default: return state
    }
     
}