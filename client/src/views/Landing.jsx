import '../components/AppCheck.css'
import { Link } from 'react-router-dom';
import { useDispatch } from "react-redux";
import { getRecetas } from "./actions.js";
function Landing() {
  const dispatch = useDispatch() 
  return (
    <>
     <div className={"landing-top"}>
         {/*  <h1 className={"landing-title"}>Henry Food</h1> */}
           <div className={"landing-bienvenidos"}>
             <Link to={'/home'}>
                <button type="button" className={"btn btn-land"} onClick={()=>dispatch(getRecetas(''))} >
                  {'Bienvenidos !'} 
                </button>
             </Link>    
           </div>
         <div className="landing">
  
         </div>
     </div>    
   </>
  );
 }
  
  export default Landing;