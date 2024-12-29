import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import SubmitData from './components/Doctor/SubmitData';
import Dashboard from './components/Dashboard';

const App = () => {
  const [userRole, setUserRole] = useState(null);
  const [isLoading, setIsLoading] = useState(true); // Nouvel état pour le chargement

  const handleLogin = (role) => {
    setUserRole(role);
    localStorage.setItem('userRole', role); // Sauvegarder dans le localStorage
  };

  const handleLogout = () => {
    setUserRole(null);
    localStorage.removeItem('userRole'); // Supprimer du localStorage
  };

  useEffect(() => {
    const savedRole = localStorage.getItem('userRole');
    if (savedRole) {
      setUserRole(savedRole);
    }
    setIsLoading(false); // Fin du chargement après récupération
  }, []);

  if (isLoading) {
    return <p>Chargement...</p>; // Afficher une page de chargement
  }

  return (
    <Router>
      <Navbar userRole={userRole} onLogout={handleLogout} />
      <Routes>
        <Route path="/login" element={<Login onLogin={handleLogin} />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/submit-data"
          element={
            userRole === 'doctor' || userRole === 'admin' ? (
              <SubmitData />
            ) : userRole === null ? (
              <p>Chargement...</p>
            ) : (
              <Navigate to="/login" />
            )
          }
        />

        <Route
          path="/dashboard"
          element={userRole ? <Dashboard /> : <Navigate to="/login" />}
        />
        <Route path="/" element={<Login onLogin={handleLogin} />} />
      </Routes>
    </Router>
  );
};

export default App;
