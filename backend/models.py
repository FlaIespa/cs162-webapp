# models.py
from flask_sqlalchemy import SQLAlchemy
from flask_bcrypt import Bcrypt
from datetime import datetime

db = SQLAlchemy()
bcrypt = Bcrypt()

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)  # Changed username to email
    password_hash = db.Column(db.String(128), nullable=False)
    lists = db.relationship('List', backref='user', lazy=True)

    def set_password(self, password):
        self.password_hash = bcrypt.generate_password_hash(password).decode('utf-8')

    def check_password(self, password):
        return bcrypt.check_password_hrequiash(self.password_hash, password)

class List(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(120), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    tasks = db.relationship('Task', backref='list', lazy=True, cascade ="all, delete-orphan")

class Task(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(120), nullable=False)
    due_date = db.Column(db.DateTime, nullable=True)
    priority = db.Column(db.String(50), nullable=True)
    status = db.Column(db.String(50), nullable=False, default='To-Do')
    completed = db.Column(db.Boolean, default=False)
    collapsed = db.Column(db.Boolean, default=False)
    list_id = db.Column(db.Integer, db.ForeignKey('list.id'), nullable=False)
    parent_id = db.Column(db.Integer, db.ForeignKey('task.id'), nullable=True)
    subitems = db.relationship('Task', backref=db.backref('parent', remote_side=[id]), lazy=True, cascade ="all, delete-orphan")
    
    def get_nested_subtasks(self):
        # Recursive function to get all nested subtasks
        def fetch_subtasks(task):
            return {
                "id": task.id,
                "name": task.name,
                "dueDate": task.due_date.strftime('%Y-%m-%dT%H:%M:%S') if task.due_date else None,
                "priority": task.priority,
                "status": task.status,
                "completed": task.completed,
                "collapsed": task.collapsed,
                "parent_id": task.parent_id,
                "subitems": [fetch_subtasks(sub) for sub in task.subitems]
            }
        
        return fetch_subtasks(self)