import React from 'react';
import ReactDOM from 'react-dom/client'; // Assurez-vous d'importer depuis 'react-dom/client'
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';
import { AuthProvider } from './AuthContext';

const rootElement = document.getElementById('root'); // L'élément racine dans votre HTML
const root = ReactDOM.createRoot(rootElement); // Utilisation de createRoot pour React 18+

root.render(
  <React.StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </React.StrictMode>
);



// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
