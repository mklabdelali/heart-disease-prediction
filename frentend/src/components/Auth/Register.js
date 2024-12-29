import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState } from 'react';
import axios from 'axios';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('patient');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const role = "patient"; // Rôle par défaut
    // Logique d'inscription avec { name, email, password, role }
    console.log({ name, email, password, role });
      const response = await axios.post('http://localhost:5000/register', { name, email, password, role });
      alert('Inscription réussie');
      console.log(response.data);
    } catch (error) {
      alert('Erreur lors de l\'inscription');
      console.error(error);
    }
  };

  return (
      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="card shadow-lg">
              <div className="card-header bg-primary text-white text-center">
                <h2>Créer un Compte</h2>
                <p className="mb-0">Inscrivez-vous pour accéder à nos services</p>
              </div>
              <div className="card-body">
                <form onSubmit={handleSubmit}>
                  <div className="form-group mb-3">
                    <label>Nom</label>
                    <div className="input-group">
                    <span className="input-group-text">
                      <i className="bi bi-person-fill"></i>
                    </span>
                      <input
                          type="text"
                          className="form-control"
                          placeholder="Entrez votre nom"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          required
                      />
                    </div>
                  </div>
                  <div className="form-group mb-3">
                    <label>Email</label>
                    <div className="input-group">
                    <span className="input-group-text">
                      <i className="bi bi-envelope-fill"></i>
                    </span>
                      <input
                          type="email"
                          className="form-control"
                          placeholder="Entrez votre adresse email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          required
                      />
                    </div>
                  </div>
                  <div className="form-group mb-3">
                    <label>Mot de passe</label>
                    <div className="input-group">
                    <span className="input-group-text">
                      <i className="bi bi-lock-fill"></i>
                    </span>
                      <input
                          type="password"
                          className="form-control"
                          placeholder="Entrez votre mot de passe"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          required
                      />
                    </div>
                  </div>
                  <button type="submit" className="btn btn-primary w-100">
                    S'inscrire
                  </button>
                </form>
              </div>
              <div className="card-footer text-center text-muted">
                Vous avez déjà un compte ? <a href="/login" className="text-primary">Connectez-vous</a>
              </div>
            </div>
          </div>
        </div>
      </div>
  );
};

export default Register;
