import { SET_RECETAS, SET_RECETA } from './actions'
const initialState = {
recetas: [],
receta: {}
};
export default function reducer(state = initialState, action) {
    switch(action.type) {
        case SET_RECETAS: return {
            ...state,
            recetas: action.payload
        }

        case SET_RECETA: return {
            ...state,
            receta: action.payload
        }




        default: return state
    }
     
}