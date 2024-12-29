import React, { useState } from 'react';
import { useAuth } from '../../AuthContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://127.0.0.1:5000/login', { email, password });
      const userData = response.data;
      const { token, role } = response.data;
      // Sauvegarder le rôle de l'utilisateur dans le localStorage
      localStorage.setItem('userRole', userData.role);
      localStorage.getItem('token',userData.token);

      console.log("token: "+userData.token);
      // Rediriger vers SubmitData après une connexion réussie
      if (userData.role === 'doctor' || userData.role === 'admin') {
        onLogin(userData.role);
        navigate('/submit-data');
      } else {
        alert('Vous n’avez pas les droits nécessaires pour accéder à cette page.');

      }
    } catch (error) {
      console.error(error);
      alert('Erreur de connexion');
    }
  };

  return (
      <div className="container mt-5">
        <div className="row justify-content-center">
          {/* Image Section */}
          <div className="col-md-5 d-none d-md-block text-center">
            <img
                src="logo.png"
                alt="Heart Illustration"
                className="img-fluid rounded shadow-lg"
                style={{maxHeight: "400px"}}
            />
            <h5 className="mt-4 text-muted">Bienvenue sur notre plateforme !</h5>
          </div>

          {/* Login Form Section */}
          <div className="col-md-5">
            <div className="card shadow">
              <div className="card-header bg-primary text-white text-center">
                <h3>Connexion</h3>
              </div>
              <div className="card-body">
                <form onSubmit={handleLogin}>
                  <div className="mb-3">
                    <label htmlFor="email" className="form-label">
                      Adresse Email
                    </label>
                    <input
                        type="email"
                        className="form-control"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="password" className="form-label">
                      Mot de passe
                    </label>
                    <input
                        type="password"
                        className="form-control"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                  </div>
                  <button type="submit" className="btn btn-primary w-100">
                    Se connecter
                  </button>
                </form>
                <div className="mt-3 text-center">
                  <a href="/forgot-password" className="text-decoration-none">
                    Mot de passe oublié ?
                  </a>
                  <br/>
                  <a href="/signup" className="text-decoration-none">
                    Créer un compte
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
  );
};

export default Login;
