import React, { useEffect } from "react";
// import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getRecetas } from "./actions.js";
// import axios from "axios";

function Home() {
    // Version React
/*  const [recetas, setRecetas] = useState([])
    useEffect( () =>{
     axios.get('http://localhost:3001/api/recipes?name=pasta')
     .then(response => {
      console.log(response.data)  ; 
      setRecetas(response.data);
     })
    },[]); */

    // Version Redux (usando hooks en vez de connect para traer datos del store)
    const recetas = useSelector(state => state.recetas)
    const dispatch = useDispatch() 
    useEffect(() => {
        dispatch(getRecetas())
    },[dispatch]);

    return (
        <>
         <h2>Yo soy home</h2>
         <hr />
         <h3>RECETAS</h3>
         <ul>
             {recetas.map((r) => (
              <li key={r.idApi}>{r.nombre}</li>
             ))}
         </ul>
        </>

    )
}
export default Home;