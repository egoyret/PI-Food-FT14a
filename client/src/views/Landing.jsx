import '../components/AppCheck.css'
import { Link } from 'react-router-dom';
function Landing() {
  return (
    <>
     <div className={"landing-top"}>
          <h1 className={"landing-title"}>Henry Food</h1>
           <div >
             <Link to={'/home'}>
                <button type="button" className={"btn btn-land"} >
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