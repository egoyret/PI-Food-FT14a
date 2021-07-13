import './App.css';
import Home from './views/Home';
import Detalle from './views/Detalle';
import InputForm from './views/InputForm';
import AppCheckFunc from './components/AppCheckFunc';
import AppCheck from './components/AppCheck';
import {Route} from "react-router-dom"
// import Nav from './components/Nav'

function App() {
  return (
    <>

    <div className="App">
      <h1>Henry Food</h1>
            
      <Route path="/" exact component={Home} />
      <Route path="/recipes/:idReceta" exact component={Detalle} />
      <Route path="/form" exact component={InputForm} />
      <Route path="/checkFunc" exact component={AppCheckFunc} />
      <Route path="/check" exact component={AppCheck} />
    </div>
    </>
  );
}

export default App;
// <Route path="/" component={Nav} /> 