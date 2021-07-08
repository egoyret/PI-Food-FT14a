import { createStore, applyMiddleware } from "redux";
import reduxThunk from "redux-thunk";
import reducer from "./reducer";

// Se neceita reduxThunk porque vamos a hacer llamada asincronas.
const store = createStore(reducer, applyMiddleware(reduxThunk))

//Faltaria poner el compose para poder usar los dev tools de redux

export default store;
