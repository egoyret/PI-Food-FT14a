import './App.css';
import Home from './views/home';
import {Route} from "react-router-dom"
import Nav from './components/Nav'

function App() {
  return (
    <>
    <Route path="/" component={Nav} />
    <div className="App">
      <h1>Henry Food</h1>
      <Route path="/" exact component={Home} />
    </div>
    </>
  );
}

export default App;
