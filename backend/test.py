from flask import Flask, request, jsonify
import numpy as np
from joblib import load  # Pour charger le modèle sauvegardé avec joblib

# Créer une instance de Flask
app = Flask(__name__)

# Charger le modèle
model = load('heart_disease_rf_model.pkl')
# Exemple d'entrée (les valeurs sont fictives)
test_features = [
    12345,    # id
    45,       # age
    1,        # sex
    0,        # dataset
    3,        # cp
    120,      # trestbps
    240,      # chol
    0,        # fbs
    1,        # restecg
    2,        # thalch
    0,        # exang
    1.2,      # oldpeak
    2,        # slope
    1,        # ca
    3         # thal
]

# Route pour effectuer des prédictions
""" @app.route('/predict', methods=['POST'])
def predict():
    try:
        # Faire une prédiction
       
        # Récupérer les données envoyées par le client (JSON)
        data = request.get_json()

        # Vérifier que les données contiennent les caractéristiques nécessaires
        if 'features' not in data:
            return jsonify({'error': 'Les données doivent contenir une clé "features".'}), 400

        # Convertir les données en un tableau numpy
        #input_features = np.array(data['features'])  # Exemple : [[56, 1, 3, 140, 240, 0, 1, 160, 0, 0.0, 2, 0, 3]]

        # Faire une prédiction
        prediction = model.predict([test_features])
        print(f"Prédiction : {prediction}")

        # Retourner le résultat au client
        return jsonify({'prediction': prediction.tolist()})
    except Exception as e:
        return jsonify({'error': str(e)}), 500

# Lancer l'application
if __name__ == '__main__':
    app.run(debug=True) """
