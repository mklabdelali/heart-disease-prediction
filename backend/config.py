class Config:
    # Configuration de la base de données MySQL
    SQLALCHEMY_DATABASE_URI = 'mysql://root@localhost/heart_disease_db'
    SQLALCHEMY_TRACK_MODIFICATIONS = False  # Désactiver les alertes inutiles de SQLAlchemy

    # Clé secrète pour JWT
    SECRET_KEY = 'votre_clé_secrète_super_sécurisée'  # Changez ceci par une clé plus sécurisée
    JWT_SECRET_KEY = 'votre_clé_secrète_jwt_super_sécurisée'  # Pour JWT
