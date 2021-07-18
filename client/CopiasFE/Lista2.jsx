import React, { useState } from 'react'
function Lista2(props) {
    const recetas = props.recetas;
    console.log('recetas: ', recetas);  // Me lista bien el array de recetas que recibe
    const [list, setList] = useState(recetas);
    console.log('list: ', list); // Me lista un array vacio

    return (
        <ul style={{listStyleType: "none"}}>
         {list.map((r) => 
            <li key={r.idApi}>
                  {r.nombre} 
            
           </li>
          )}
        </ul>
    )

  }
  export default Lista2;