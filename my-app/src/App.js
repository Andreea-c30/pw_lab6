import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";

import NavbarEl from './components/Navbar';
import AddVacation from './pages/AddVacation';
import Vacations from './pages/Vacations';
import Home from './pages/Home'; 

function App() {
  return (
    <Router>
      <div className="App">
        <NavbarEl />
      
        <Routes>
          <Route path="/pw_lab6" element={<Home />} />
          <Route path="/home" element={<Home />} />
        </Routes>
        <Routes>
          <Route path="/add" element={<AddVacation />} />
        </Routes>
        <Routes>
          <Route path="/vacations" element={<Vacations />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
