import React from 'react';
import axios from 'axios';

const ValidationForm = ({ data, result,prediction }) => {
  const handleValidation = async () => {
    try {
      const response = await axios.post('http://127.0.0.1:5000/validate', {
        ...data,
        result,
        prediction,
      });
      alert(response.data.message);
    } catch (err) {
      console.error(err.response?.data || err.message);
      alert('Erreur lors de la validation des données');
      console.log(data)
    }
  };

  const fieldLabels = {
  age: "Âge",
  ca: "Nombre de vaisseaux principaux colorés",
  chol: "Cholestérol",
  cp: "Type de douleur thoracique",
  dataset: "Dataset (interne)",
  exang: "Angine induite par l'effort",
  fbs: "Glycémie à jeun",
  id: "ID Patient",
  oldpeak: "Dépression ST",
  restecg: "Résultat ECG",
  sex: "Sexe",
  slope: "Pente du segment ST",
  thal: "État de la thalassémie",
  thalch: "Fréquence cardiaque maximale",
  trestbps: "Pression artérielle",
};


  return (
      <div className="container mt-5">
        <h3 className="text-center mb-4">Résumé des Données Cliniques Soumises</h3>

        {/* Informations personnelles */}
        <div className="card mb-4 shadow-sm">
          <div className="card-header bg-primary text-white">
            <h5>Informations Personnelles</h5>
          </div>
          <div className="card-body">
            <div className="row">
              <div className="col-md-6">
                <p><strong>ID Patient :</strong> {data.id}</p>
                <p><strong>Âge :</strong> {data.age} ans</p>
              </div>
              <div className="col-md-6">
                <p><strong>Sexe :</strong> {data.sex === 1 ? "Homme" : "Femme"}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Informations médicales */}
        <div className="card mb-4 shadow-sm">
          <div className="card-header bg-success text-white">
            <h5>Informations Médicales</h5>
          </div>
          <div className="card-body">
            <div className="row">
              <div className="col-md-6">
                <p><strong>Pression artérielle :</strong> {data.trestbps} mmHg</p>
                <p><strong>Cholestérol :</strong> {data.chol} mg/dl</p>
                <p><strong>Glycémie
                  :</strong> {data.fbs === 1 ? "Supérieure à 120 mg/dl" : "Inférieure ou égale à 120 mg/dl"}</p>
                <p><strong>Fréquence cardiaque maximale :</strong> {data.thalch}</p>
              </div>
              <div className="col-md-6">
                <p><strong>Type de douleur thoracique
                  :</strong> {["", "Typique", "Angine atypique", "Non angineuse", "Asymptomatique"][data.cp]}</p>
                <p><strong>Résultat ECG
                  :</strong> {["Normal", "Hypertrophie ventriculaire gauche", "ST-T anormalité"][data.restecg]}</p>
                <p><strong>Nombre de vaisseaux colorés :</strong> {data.ca}</p>
                <p><strong>Dépression ST :</strong> {data.oldpeak}</p>
              </div>
            </div>
            <div className="row mt-3">
              <div className="col-md-6">
                <p><strong>Angine induite par l'effort :</strong> {data.exang === 1 ? "Oui" : "Non"}</p>
              </div>
              <div className="col-md-6">
                <p><strong>Pente du segment ST :</strong> {data.slope}</p>
                <p><strong>État de la thalassémie :</strong> {data.thal}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Résultats */}
        <div className="card mb-4 shadow-sm">
          <div className="card-header bg-danger text-white">
            <h5>Résultats</h5>
          </div>
          <div className="card-body text-center">
            <p><strong>Prédiction :</strong> <span className="badge bg-warning text-dark">{prediction}</span></p>
            <p><strong>Résultat :</strong>
              <span className={`badge ${result === "Maladie détectée" ? "bg-danger" : "bg-success"}`}>
          {result}
        </span>
            </p>
          </div>
        </div>

        {/* Bouton d'action */}
        <div className="text-center">
          <button className="btn btn-success btn-lg" onClick={handleValidation}>
            Valider et Enregistrer
          </button>
        </div>
      </div>

  );
};

export default ValidationForm;
