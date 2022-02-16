import './App.css';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { RestaurantsContextProvider } from "./context/RestaurantsContext";
import Home from './pages/Home'

function App() {
  return (
    <RestaurantsContextProvider>
      <Router>
        <Switch>
          <Route exact path="/" component={Home} />
          
        </Switch>
      </Router>
    </RestaurantsContextProvider>
  );
}

export default App;
