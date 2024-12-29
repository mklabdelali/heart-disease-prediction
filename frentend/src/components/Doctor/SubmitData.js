import React, { useState, useEffect } from "react";
import axios from 'axios';
import ValidationForm from './ValidationForm';

const SubmitData = () => {
  const [formData, setFormData] = useState({
    id: '',
    age: '',
    sex: '',
    dataset: '1',
    cp: '',
    trestbps: '',
    chol: '',
    fbs: '',
    restecg: '',
    thalch: '',
    exang: '',
    oldpeak: '',
    slope: '',
    ca: '',
    thal: '',
  });
  const [patientList, setPatientList] = useState([]);

  // Charger la liste des patients depuis le backend
  useEffect(() => {
    axios.get("http://127.0.0.1:5000/api/patients").then((response) => {
      setPatientList(response.data);
    });
  }, []);
  const [resultData, setResultData] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://127.0.0.1:5000/predict', formData);
      setResultData(response.data);
    } catch (err) {
      console.error(err.response?.data || err.message);
      alert('Erreur lors de la soumission des données');
      console.log(formData);
    }
  };

  if (resultData) {
    return <ValidationForm data={resultData.data} result={resultData.result} prediction={resultData.prediction}/>;
  }

  return (
      <div className="container mt-5">
        <div className="card shadow">
          <div className="card-header bg-primary text-white text-center">
            <h3><i className="bi bi-clipboard-heart"></i> Soumettre des Données Cliniques</h3>
          </div>
          <div className="card-body">
            <form onSubmit={handleSubmit}>
              {/* ID Patient */}
              <div className="mb-4">
                <label className="form-label"><strong>ID Patient</strong></label>
                <select
                    className="form-select"
                    name="id"
                    value={formData.id}
                    onChange={handleChange}
                    required
                >
                  <option value="">Sélectionnez un patient</option>
                  {patientList.map(({id, name}) => (
                      <option key={id} value={id}>
                        {name}
                      </option>
                  ))}
                </select>
              </div>

              {/* Section : Informations personnelles */}
              <div className="border rounded p-3 mb-4">
                <h4 className="text-secondary mb-3"><i className="bi bi-person"></i> Informations du Patient</h4>
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label className="form-label">Âge</label>
                    <input
                        type="number"
                        className="form-control"
                        name="age"
                        value={formData.age}
                        onChange={handleChange}
                        placeholder="Ex : 56"
                        required
                    />
                  </div>
                  <div className="col-md-6 mb-3">
                    <label className="form-label">Sexe</label>
                    <select
                        className="form-select"
                        name="sex"
                        value={formData.sex}
                        onChange={handleChange}
                        required
                    >
                      <option value="">Sélectionnez</option>
                      <option value="0">Femme</option>
                      <option value="1">Homme</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Section : Tests médicaux */}
              <div className="border rounded p-3 mb-4">
                <h4 className="text-secondary mb-3"><i className="bi bi-heart-pulse"></i> Résultats des Tests Médicaux
                </h4>
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label className="form-label">Pression artérielle (trestbps)</label>
                    <input
                        type="number"
                        className="form-control"
                        name="trestbps"
                        value={formData.trestbps}
                        onChange={handleChange}
                        placeholder="Ex : 130"
                        required
                    />
                  </div>
                  <div className="col-md-6 mb-3">
                    <label className="form-label">Cholestérol (chol)</label>
                    <input
                        type="number"
                        className="form-control"
                        name="chol"
                        value={formData.chol}
                        onChange={handleChange}
                        placeholder="Ex : 250"
                        required
                    />
                  </div>
                  <div className="col-md-6 mb-3">
                    <label className="form-label">Glycémie (fbs)</label>
                    <select
                        className="form-select"
                        name="fbs"
                        value={formData.fbs}
                        onChange={handleChange}
                        required
                    >
                      <option value="">Sélectionnez</option>
                      <option value="0">Glycémie ≤ 120 mg/dl</option>
                      <option value="1">Glycémie > 120 mg/dl</option>
                    </select>
                  </div>
                  <div className="col-md-6 mb-3">
                    <label className="form-label">Fréquence cardiaque (thalch)</label>
                    <input
                        type="number"
                        className="form-control"
                        name="thalch"
                        value={formData.thalch}
                        onChange={handleChange}
                        placeholder="Ex : 150"
                        required
                    />
                  </div>
                  <div className="col-md-6 mb-3">
                    <label className="form-label">Type de douleur thoracique (cp)</label>
                    <select
                        className="form-select"
                        name="cp"
                        value={formData.cp}
                        onChange={handleChange}
                        required
                    >
                      <option value="">Sélectionnez</option>
                      <option value="1">Typique</option>
                      <option value="2">Angine atypique</option>
                      <option value="3">Non angineuse</option>
                      <option value="4">Asymptomatique</option>
                    </select>
                  </div>
                  <div className="col-md-6 mb-3">
                    <label className="form-label">Résultat ECG</label>
                    <select
                        className="form-select"
                        name="restecg"
                        value={formData.restecg}
                        onChange={handleChange}
                        required
                    >
                      <option value="">Sélectionnez</option>
                      <option value="0">Normal</option>
                      <option value="1">Hypertrophie ventriculaire gauche</option>
                      <option value="2">ST-T anormalité</option>
                    </select>
                  </div>
                  <div className="col-md-6 mb-3">
                    <label className="form-label">Nombre de vaisseaux principaux (ca)</label>
                    <select
                        className="form-select"
                        name="ca"
                        value={formData.ca}
                        onChange={handleChange}
                        required
                    >
                      <option value="">Sélectionnez</option>
                      <option value="0">0</option>
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                    </select>
                  </div>
                  <div className="col-md-6 mb-3">
                    <label className="form-label">Dépression ST (oldpeak)</label>
                    <input
                        type="number"
                        step="0.1"
                        className="form-control"
                        name="oldpeak"
                        value={formData.oldpeak}
                        onChange={handleChange}
                        placeholder="Ex : 1.5"
                        required
                    />
                  </div>
                  <div className="col-md-6 mb-3">
                    <label className="form-label">Angine induite par l'effort (exang)</label>
                    <select
                        className="form-select"
                        name="exang"
                        value={formData.exang}
                        onChange={handleChange}
                        required
                    >
                      <option value="">Sélectionnez</option>
                      <option value="1">Oui</option>
                      <option value="0">Non</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Section : Autres paramètres */}
              <div className="border rounded p-3 mb-4">
                <h4 className="text-secondary mb-3"><i className="bi bi-gear"></i> Autres Paramètres</h4>
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label className="form-label">État de la thalassémie (thal)</label>
                    <input
                        type="number"
                        className="form-control"
                        name="thal"
                        value={formData.thal}
                        onChange={handleChange}
                        placeholder="Ex : 2"
                        required
                    />
                  </div>
                  <div className="col-md-6 mb-3">
                    <label className="form-label">Pente du segment ST (slope)</label>
                    <input
                        type="number"
                        className="form-control"
                        name="slope"
                        value={formData.slope}
                        onChange={handleChange}
                        placeholder="Ex : 2"
                        required
                    />
                    <input
                        type="hidden"
                        className="form-control"
                        name="dataset"
                        value={formData.dataset || 1}
                        onChange={handleChange}
                        required
                    />
                  </div>
                </div>
              </div>

              {/* Bouton de soumission */}
              <div className="text-center">
                <button type="submit" className="btn btn-primary btn-lg">
                  <i className="bi bi-check-circle"></i> Soumettre
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

  );
};

export default SubmitData;
