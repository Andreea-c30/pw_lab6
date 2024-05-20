import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavbarEl from './components/Navbar';
import About from './pages/About';
import AddVacation from './pages/AddVacation';
import Vacations from './pages/Vacations';
import Home from './pages/Home';
import { jwtDecode } from "jwt-decode";

function App() {
  const [role, setRole] = useState(localStorage.getItem('userRole') || '');
  const [jwt, setJwt] = useState(localStorage.getItem('jwt') || null);


  const fetchJWT = async () => {
    try {
      const roleInput = window.prompt('Enter your role (admin/visitor):');
        
      const response = await fetch(`http://localhost:5000/token?role=${roleInput}`);
      if (!response.ok) {
        throw new Error('Failed to fetch JWT: ' + response.statusText);
      }
      const data = await response.json();
      const jwtToken = data.jwt;
      const decodedToken = jwtDecode(jwtToken);
      const role = decodedToken.role;
      setRole(role);
      setJwt(jwtToken);
      localStorage.setItem('jwt', jwtToken);
      localStorage.setItem('userRole', role);
    } catch (error) {
      console.error('Error fetching JWT:', error);
    }
  };
  
  
  useEffect(() => {
    fetchJWT();
  }, []); 
  
  return (
    <Router>
      <div className="App">
        <NavbarEl />
        <Routes>
          <Route path="/pw_lab6" element={<Home role={role} />} />
          <Route path="/home" element={<Home role={role} />} />
          <Route path="/add" element={<AddVacation role={role} jwt={jwt} />} />
          <Route path="/vacations" element={<Vacations role={role} jwt={jwt} />} />
          <Route path="/about" element={<About role={role} />} />

        </Routes>
      </div>
    </Router>
  );
}

export default App;
