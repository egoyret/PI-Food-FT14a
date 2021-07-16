
import '../components/AppCheck.css'
import { Link } from 'react-router-dom';
function Landing() {
    return (
    <>
     <div className={"landing-top"}>
          <h1>Henry Food</h1> 
           <Link to={'/home'} className="btn">
               {'Ingresar'} 
       </Link>      
        <div className="landing">
                     
 
        </div>
     </div>    
    </>
    );
  }
  
  export default Landing;