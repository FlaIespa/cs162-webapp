# app.py
from flask import Flask
from flask_jwt_extended import JWTManager
from flask_cors import CORS
from config import Config
from models import db, bcrypt
from routes import task_bp
from auth import auth_bp
import logging

app = Flask(__name__)
app.config.from_object(Config)

# Initialize extensions
db.init_app(app)
bcrypt.init_app(app)
jwt = JWTManager(app)  # Initialize JWT for authentication

logging.basicConfig(level=logging.DEBUG)
# Apply CORS configuration
CORS(app, resources={r"/*": {"origins": "http://localhost:3000", "methods": ["GET", "POST", "DELETE", "OPTIONS", "UPDATE", "PATCH", "FETCH"]}})

# Register blueprints for routes (auth and tasks)
app.register_blueprint(auth_bp, url_prefix='/auth')
app.register_blueprint(task_bp, url_prefix='/api')  # Setting a prefix for task routes

if __name__ == "__main__":
    with app.app_context():
        db.create_all()  # Create tables
    app.run(debug=True, port=5001) 
