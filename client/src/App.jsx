import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { RestaurantsContextProvider } from "./context/RestaurantsContext";
import Home from './pages/Home'
import RestaurantDetailPage from './pages/RestaurantDetailPage'
import UpdatePage from './pages/UpdatePage'

const App = () => {
  return (
    <RestaurantsContextProvider>
      <Router>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/restaurants/:id/update" element={<UpdatePage />} />
          <Route exact path="/restaurants/:id" element={<RestaurantDetailPage />} />

        </Routes>
      </Router>
    </RestaurantsContextProvider>
  );
}

export default App;
