import { SET_RECETAS } from './actions'
const initialState = {
recetas: []
};
export default function reducer(state = initialState, action) {
    switch(action.type) {
        case SET_RECETAS: return {
            ...state,
            recetas: action.payload
        }


        default: return state
    }
     
}