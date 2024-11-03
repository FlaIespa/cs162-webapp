# routes.py
import logging
from flask import Blueprint, request, jsonify
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity
from models import db, User, List, Task
from datetime import timedelta
from werkzeug.security import generate_password_hash, check_password_hash
from datetime import datetime
from models import Task


# auth_bp = Blueprint('auth', __name__)
task_bp = Blueprint('tasks', __name__)
logger = logging.getLogger(__name__)

# Recursive helper function to get tasks with nested subitems
def get_task_with_subtasks(task):
    return {
        "id": task.id,
        "name": task.name,
        "due_date": task.due_date,
        "priority": task.priority,
        "status": task.status,
        "completed": task.completed,
        "collapsed": task.collapsed,
        "parent_id": task.parent_id,
        "subitems": [get_task_with_subtasks(sub) for sub in task.subitems]
    }

# Route to retrieve lists with tasks and all nested subtasks
@task_bp.route('/lists', methods=['GET'])
@jwt_required()
def get_lists():
    user_id = get_jwt_identity()
    user = User.query.get(user_id)
    if not user:
        return jsonify({"msg": "User not found"}), 404
    
    # Fetch all lists associated with the user
    lists = List.query.filter_by(user_id=user_id).all()
    
    # Prepare lists data with tasks filtered by each list_id
    lists_data = [
        {
            "id": lst.id,
            "name": lst.name,
            # Only fetch tasks associated with this specific list
            "tasks": [task.get_nested_subtasks() for task in Task.query.filter_by(list_id=lst.id).all()]
        }
        for lst in lists
    ]
    
    return jsonify(lists=lists_data), 200


# Route for creating a new task list
@task_bp.route('/lists', methods=['POST'])
@jwt_required()
def create_list():
    user_id = get_jwt_identity()
    data = request.get_json()
    list_name = data.get('name')
    
    new_list = List(name=list_name, user_id=user_id)
    db.session.add(new_list)
    db.session.commit()

    return jsonify({"msg": "List created", "list_id": new_list.id}), 201

# Route for fetching tasks given the list ID
@task_bp.route('/api/<int:list_id>/tasks', methods=['GET'])
@jwt_required()
def get_tasks(list_id):
    user_id = get_jwt_identity()
    task_list = List.query.filter_by(id=list_id, user_id=user_id).first()
    
    if not task_list:
        return jsonify({"msg": "List not found"}), 404

    tasks = Task.query.filter_by(list_id=list_id).all()
    tasks_data = [
        {
            "id": task.id,
            "name": task.name,
            "description": task.description,
            "due_date": task.due_date,
            "completed": task.completed,
            "parent_id": task.parent_id
        } for task in tasks
    ]

    return jsonify(tasks_data), 200



#Route for deleting and existing list
@task_bp.route('/lists/<int:list_id>', methods=['DELETE'])
@jwt_required()
def delete_list(list_id):
    user_id = get_jwt_identity()
    
    # Find the list belonging to the current user
    list_to_delete = List.query.filter_by(id=list_id, user_id=user_id).first()

    if not list_to_delete:
        return jsonify({"msg": "List not found or access denied"}), 404

    # Delete the list and cascade delete associated tasks and subtasks
    db.session.delete(list_to_delete)
    db.session.commit()

    return jsonify({"msg": "List and associated tasks deleted"}), 200


#Route for editing a task name 

# Route for adding a new task to a list
@task_bp.route('/lists/<int:list_id>/tasks', methods=['POST'])
@jwt_required()
def create_task(list_id):

    user_id = get_jwt_identity()
    data = request.get_json()
    task_name = data.get('name')
    priority = data.get('priority')
    status = data.get('status', 'To-Do')
    
    task_list = List.query.filter_by(id=list_id, user_id=user_id).first()
    if not task_list:
        return jsonify({"msg": "List not found or unauthorized"}), 404

    new_task = Task(
        name=task_name,
        priority=priority,
        status=status,
        list_id=list_id
    )
    db.session.add(new_task)
    db.session.commit()

    return jsonify({"msg": "Task created", "task_id": new_task.id}), 201

# Route for adding a new subtask to a task
@task_bp.route('/tasks/<int:task_id>/subtasks', methods=['POST'])
@jwt_required()
def create_subtask(task_id):
    user_id = get_jwt_identity()
    data = request.get_json()

    # Check if the required fields are provided
    subtask_name = data.get('name')
    due_date = data.get('dueDate')
    priority = data.get('priority')
    status = data.get('status', 'To-Do')

    if not subtask_name:
        return jsonify({"msg": "Subtask name is required"}), 400

    # Parse the due date if provided
    due_date_obj = None
    if due_date:
        try:
            due_date_obj = datetime.strptime(due_date, '%Y-%m-%dT%H:%M:%S')
        except ValueError:
            return jsonify({"msg": "Invalid due date format"}), 400

    # Find the parent task and confirm it belongs to the user
    parent_task = Task.query.filter_by(id=task_id).first()
    if not parent_task or parent_task.list.user_id != user_id:
        return jsonify({"msg": "Parent task not found or unauthorized"}), 404

    # Create the new subtask
    new_subtask = Task(
        name=subtask_name,
        due_date=due_date_obj,
        priority=priority,
        status=status,
        list_id=parent_task.list_id,
        parent_id=task_id  # Associate subtask to the parent task
    )

    try:
        db.session.add(new_subtask)
        db.session.commit()
    except Exception as e:
        db.session.rollback()
        return jsonify({"msg": "Failed to save subtask", "error": str(e)}), 500

    return jsonify({
        "msg": "Subtask created successfully",
        "subtask_id": new_subtask.id,
        "name": new_subtask.name,
        "dueDate": new_subtask.due_date.strftime('%Y-%m-%dT%H:%M:%S') if new_subtask.due_date else None,
        "priority": new_subtask.priority,
        "status": new_subtask.status,
        "completed": new_subtask.completed,
        "collapsed": new_subtask.collapsed,
    }), 201


# Route to delete a task
@task_bp.route('/tasks/<int:task_id>', methods=['DELETE'])
@jwt_required()
def delete_task(task_id):
    user_id = get_jwt_identity()
    task = Task.query.filter_by(id=task_id).first()
    
    if not task or task.list.user_id != user_id:
        return jsonify({"msg": "Task not found or unauthorized"}), 404

    db.session.delete(task)
    db.session.commit()
    
    return jsonify({"msg": "Task deleted successfully"}), 200

@task_bp.route('/tasks/<int:task_id>/status', methods=['PATCH'])
@jwt_required()
def update_task_status(task_id):
    user_id = get_jwt_identity()
    data = request.get_json()
    new_status = data.get('status')

    print(f"Received request to update task {task_id} to status {new_status}")
    task = Task.query.filter_by(id=task_id).first()
    if not task or task.list.user_id != user_id:
        return jsonify({"msg": "Task not found or unauthorized"}), 404

    task.status = new_status
    db.session.commit()

    return jsonify({"msg": "Task status updated"}), 200

