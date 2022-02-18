import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { RestaurantsContextProvider } from "./context/RestaurantsContext";
import Home from './pages/Home'

const App = () => {
  return (
    <RestaurantsContextProvider>
      <Router>
        <Routes>
          <Route exact path="/" element={<Home />} />

        </Routes>
      </Router>
    </RestaurantsContextProvider>
  );
}

export default App;
