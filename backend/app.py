from flask import Flask, request, jsonify,session
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from werkzeug.security import generate_password_hash, check_password_hash
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity
import joblib
import numpy as np

# Initialiser l'application Flask
app = Flask(__name__)
CORS(app)  # Autoriser toutes les origines (ou configurez des origines spécifiques)

# Charger la configuration depuis config.py
app.config.from_object('config.Config')

# Initialiser SQLAlchemy
db = SQLAlchemy(app)

# Initialiser JWT
jwt = JWTManager(app)



# Exemple de route pour tester la connexion
@app.route('/')
def index():
    return "L'application est connectée à MySQL et JWT est configuré !"

# Modèle de base de données pour les utilisateurs
class Users(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), nullable=False)
    email = db.Column(db.String(100), unique=True, nullable=False)
    password = db.Column(db.String(200), nullable=False)
    role = db.Column(db.String(20), nullable=False)  # admin, medecin, patient

# Endpoint pour l'inscription des utilisateurs
@app.route('/register', methods=['POST'])
def register():
    data = request.json

    # Vérification des champs requis
    required_fields = ['name', 'email', 'password', 'role']
    missing_fields = [field for field in required_fields if field not in data]
    if missing_fields:
        return jsonify({'error': f"Les champs suivants sont manquants : {', '.join(missing_fields)}"}), 400


    hashed_password = generate_password_hash(data['password'], method='pbkdf2:sha256')
    new_user = Users(name=data['name'], email=data['email'], password=hashed_password, role=data['role'])
    try:
        db.session.add(new_user)
        db.session.commit()
        return jsonify({'message': 'Utilisateur inscrit avec succès'}), 201
    except Exception as e:
        return jsonify({'error': str(e)}), 400

# Endpoint pour l'authentification des utilisateurs
@app.route('/login', methods=['POST'])
def login():
    data = request.json
    user = Users.query.filter_by(email=data['email']).first()
    if not user or not check_password_hash(user.password, data['password']):
        return jsonify({'message': 'Email ou mot de passe incorrect'}), 401

    session["email"] = user.email
    session["role"] = user.role
    access_token = create_access_token(identity={'id': user.id, 'role': user.role})
    return jsonify({'id': user.id,'email': user.email, 'role': user.role,'token':access_token}), 200

# Chargement du modèle prédictif
model = joblib.load('heart_disease_rf_model.pkl')

# Endpoint pour recevoir les informations cliniques et prédire
@app.route('/predict', methods=['POST'])
#@jwt_required()
def predict():
    #current_user = get_jwt_identity()
    #print(f"Utilisateur authentifié : {current_user}")

    # Vérification des données reçues
    data = request.get_json()
    print("Données reçues :", data)

    required_fields = [
        'id', 'age', 'sex', 'dataset', 'cp', 'trestbps', 'chol', 'fbs',
        'restecg', 'thalch', 'exang', 'oldpeak', 'slope', 'ca', 'thal'
    ]
    missing_fields = [field for field in required_fields if field not in data or not data[field]]
    if missing_fields:
        return jsonify({'message': f"Les champs suivants sont manquants ou invalides : {', '.join(missing_fields)}"}), 400

    # Prédiction
    try:
        features = [float(data[field]) for field in required_fields]
        prediction = model.predict([features])[0]

        result = "Maladie détectée" if prediction > 0 else "Pas de maladie détectée"


        return jsonify({'message': 'Prédiction effectuée avec succès',
                        'data': data,
                        'prediction': str(prediction),
                        'result': result,
                        }), 200
    except Exception as e:
        print("Erreur lors de la prédiction :", str(e))
        return jsonify({'message': 'Erreur lors de la prédiction'}), 500



@app.route('/validate', methods=['POST'])
def validate_data():
    data = request.get_json()
    try:
        clinical_entry = ClinicalData(
            user_id=int(data['id']),
            age=int(data['age']),
            sex=bool(data['sex']),
            dataset=int(data['dataset']),
            cp=int(data['cp']),
            trestbps=float(data['trestbps']),
            chol=float(data['chol']),
            fbs=bool(data['fbs']),
            restecg=int(data['restecg']),
            thalch=float(data['thalch']),
            exang=bool(data['exang']),
            oldpeak=float(data['oldpeak']),
            slope=int(data['slope']),
            ca=int(data['ca']),
            thal=int(data['thal']),
            prediction=float(data['prediction']),
            result=data['result']
        )
        db.session.add(clinical_entry)
        db.session.commit()
        return jsonify({'message': 'Données validées et enregistrées avec succès'}), 201
    except Exception as e:
        print("Erreur lors de la validation :", str(e))
        return jsonify({'message': 'Erreur lors de la validation des données'}), 500


# Modèle pour les données cliniques
class ClinicalData(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, nullable=False)
    age = db.Column(db.Float, nullable=False)
    sex = db.Column(db.Integer, nullable=False)
    dataset = db.Column(db.Integer, nullable=False)
    cp = db.Column(db.Float, nullable=False)
    trestbps = db.Column(db.Float, nullable=False)
    chol = db.Column(db.Float, nullable=False)
    fbs = db.Column(db.Boolean, nullable=False)
    restecg = db.Column(db.Float, nullable=False)
    thalch = db.Column(db.Float, nullable=False)
    exang = db.Column(db.Boolean, nullable=False)
    oldpeak = db.Column(db.Float, nullable=False)
    slope = db.Column(db.Float, nullable=False)
    ca = db.Column(db.Float, nullable=False)
    thal = db.Column(db.Float, nullable=False)
    prediction=db.Column(db.Integer, nullable=False)
    result = db.Column(db.String(60), nullable=False)  # "Maladie détectée" ou "Pas de maladie détectée"

@app.route('/api/patients', methods=['GET'])
def get_patients():
    # Exemple : récupérer les IDs des patients de la table Patient
    patients = ClinicalData.query.with_entities(Users.id,Users.name).filter_by(role='patient').all()
    return jsonify([{"id": p[0], "name": p[1]} for p in patients])


if __name__ == '__main__':
    app.run(debug=True)
