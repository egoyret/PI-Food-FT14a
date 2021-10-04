import { useSelector } from "react-redux";
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import './AppCheck.css'

function Lista(props) {
  console.log('Lista props: ', props);

const list = useSelector(state => state.recetas)
const [pageNumber, setPageNumber] = useState(1);
const [pageNumberLimit, setPageNumberLimit] = useState(10);
const [maxPageNumberLimit, setmaxPageNumberLimit] = useState(10);
const [minPageNumberLimit, setminPageNumberLimit] = useState(0);
const [recetasPerPage, setRecetasPerPage] = useState(10);
// const recetasPerPage = 5 ;
useEffect(()=>{
  setPageNumber(1);
},[]);

const indexOfLastItem = pageNumber * recetasPerPage ;
const indexOfFirstItem = indexOfLastItem - recetasPerPage;
const pageCount = Math.ceil(list.length / recetasPerPage);
const currentItems = list.slice(indexOfFirstItem, indexOfLastItem);
const pages = [];
for(let i=1; i<= pageCount; i++) {
  pages.push(i);
}
const handleClick = (event) =>{
  setPageNumber(Number(event.target.id));
}

const renderPageNumbers = pages.map(number=>{
 if(number < maxPageNumberLimit+1 && number>minPageNumberLimit) {
  return (
    <li key={number}  id={number} 
       onClick={handleClick}
       className={pageNumber === number ? "active" : null}>
       {number}
    </li>
  );
 } else {
   return null ;
 }
})

const handleNextbtn = () => {
  setPageNumber(pageNumber + 1);
  if(pageNumber+1 > maxPageNumberLimit){
    setmaxPageNumberLimit(maxPageNumberLimit + pageNumberLimit);
    setminPageNumberLimit(minPageNumberLimit + pageNumberLimit)

  }
}
const handlePrevbtn = () => {
  setPageNumber(pageNumber -1)  
  if((pageNumber-1) % pageNumberLimit === 0 ) {
    setmaxPageNumberLimit(maxPageNumberLimit - pageNumberLimit);
    setminPageNumberLimit(minPageNumberLimit - pageNumberLimit)
   }
  }
  
 let pageIncrementBtn = null;
 if(pages.length > maxPageNumberLimit) {
   pageIncrementBtn = <li onClick={handleNextbtn}> &hellip; </li>
 }  


let pageDecrementBtn = null;
 if(minPageNumberLimit >= 1) {
   pageDecrementBtn = <li onClick={handlePrevbtn}> &hellip; </li>
 }  

const handleLoadMore = () => {
   setRecetasPerPage(recetasPerPage + 2);
}

const handleLoadLess = () => {
  if(recetasPerPage > 2) setRecetasPerPage(recetasPerPage - 2);
}


 return (
    
  <>    
    <div className={"caja-headers"}>     
       <div>
         <h2>Listado de Recetas: </h2>
         <h2>{props.search}</h2>
       </div> 
         <h2>Total de recetas: {list.length}</h2>
    </div>   
          
    {list ? (
     <> 
       <ul className="listado" style={{listStyleType: "none"}}>
        {currentItems.map((r) => 
        <div>
            <li key={r.fuente + r.idApi} className={"caja"}>
              <div className={"caja-datos"}>
                 <div className={"caja-imagen"}>
                   <img src={r.imagen} width="350" alt='' />
                 </div>
                 <div className={"caja-datosTexto"}>
                   <Link to={`/recipes/${r.idApi}-${r.fuente}`} className={"caja-nombre"}>
                    {r.nombre} 
                   </Link>
                   <p>{`Puntuación: ${r.puntuacion}`}</p>
                   <p>{`Dietas: ${r.dietas}`}</p>
                   <p>{`Fuente: ${r.fuente}`}</p>
                   <p>{`Id: ${r.idApi}`}</p>
                 </div>
              </div>
            </li>
        </div>  
          )}
        </ul>
        <br/>

        <ul className="pageNumbers">
          <li>
            <button onClick={handlePrevbtn} disabled={pageNumber === pages[0] ? true : false}>Prev</button>
          </li>
          {pageDecrementBtn}
          {renderPageNumbers}
          {pageIncrementBtn}
          <li>
            <button onClick={handleNextbtn} disabled={pageNumber === pages[pages.length - 1] ? true : false}>Next</button>
          </li>
          <div className="loadbuttons">
            <button onClick={handleLoadMore} className="loadmore">+ items p/p</button>
            <button onClick={handleLoadLess} className="loadmore">- items p/p</button>
          </div>
        </ul>
        

     </>

       ) : (
        <div>Cargando...</div>
       )}
 </>
    
 )


}

export default Lista;

//    <Link to={'/home'} className="btn">
// {'Home'} 
// </Link>