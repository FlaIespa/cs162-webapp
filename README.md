# cs162-webapp
# Task Management Application

Here is the link to my Loom Video: https://www.loom.com/share/bd66381130204c6f8e5a54fabf749a37?sid=e994dbb8-42f7-458d-bea5-498435c7263b

This repository contains a full-stack task management application that allows users to create, organize, and manage tasks across multiple lists. Users can create nested subtasks, mark tasks as complete, and organize them within lists.

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Project Structure](#project-structure)
- [Setup Instructions](#setup-instructions)
  - [Backend Setup](#backend-setup)
  - [Frontend Setup](#frontend-setup)
- [API Endpoints](#api-endpoints)
- [License](#license)

## Features

- **User Authentication**: Users can sign up and log in with secure JWT authentication.
- **Task Management**: Create, update, and delete tasks, each with a due date, priority level, and completion status.
- **Nested Subtasks**: Organize tasks with subtasks, supporting multiple levels of nesting.
- **Multiple Lists**: Users can organize tasks into different lists and move tasks between lists.
- **Responsive Design**: The frontend is built with Material-UI for a responsive and modern look.

## Technologies Used

- **Frontend**: React, Material-UI
- **Backend**: Flask, SQLAlchemy, Flask-JWT-Extended
- **Database**: SQLite (default), configurable for other databases
- **API Security**: JWT-based authentication

## Project Structure

```
root/
├── frontend/        # Contains the React frontend
├── backend/         # Contains the Flask backend
└── README.md        # Root README file (this file)
```

## Setup Instructions

To run the application locally, you will need to set up both the frontend and backend. Follow the instructions below.

### Backend Setup

1. **Navigate to the backend directory**:
   ```bash
   cd backend
   ```

2. **Create a virtual environment (recommended)**:
   ```bash
   python3 -m venv venv
   ```

3. **Activate the virtual environment**:
   - On macOS and Linux:
     ```bash
     source venv/bin/activate
     ```
   - On Windows:
     ```bash
     venv\Scripts\activate
     ```

4. **Install backend dependencies**:
   ```bash
   pip install -r requirements.txt
   ```

5. **Create a `.env` file in the backend directory and add the following environment variables**:
   ```plaintext
   SECRET_KEY=your_secret_key
   DATABASE_URL=sqlite:///app.db
   JWT_SECRET_KEY=your_jwt_secret_key
   ```

6. **Initialize the database**:
   ```bash
   flask db init
   flask db migrate
   flask db upgrade
   ```

7. **Start the Flask server**:
   ```bash
   flask run
   ```
   The backend will run at [http://localhost:5000](http://localhost:5000).

### Frontend Setup

1. **Navigate to the frontend directory**:
   ```bash
   cd frontend
   ```

2. **Install frontend dependencies**:
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Create a `.env` file in the frontend directory with the following content**:
   ```plaintext
   REACT_APP_API_URL=http://localhost:5000/api
   ```

4. **Start the development server**:
   ```bash
   npm start
   # or
   yarn start
   ```
   The frontend will run at [http://localhost:3000](http://localhost:3000). Ensure that the backend is running before accessing the frontend.

## API Endpoints

Below is a summary of key API endpoints provided by the backend:

### Authentication
- `POST /auth/signup` - Register a new user.
- `POST /auth/login` - Authenticate a user and receive a JWT token.

### Lists
- `GET /api/lists` - Get all lists and tasks associated with the authenticated user.
- `POST /api/lists` - Create a new list.

### Tasks
- `POST /api/lists/<list_id>/tasks` - Create a new task within a list.
- `PUT /api/tasks/<task_id>` - Update a task.
- `DELETE /api/tasks/<task_id>` - Delete a task.

### Subtasks
- `POST /api/tasks/<task_id>/subtasks` - Create a new subtask under a task.
- `PATCH /api/tasks/<task_id>/subtasks/<subtask_id>` - Update a subtask.
- `DELETE /api/tasks/<task_id>/subtasks/<subtask_id>` - Delete a subtask.

## License

This project is licensed under the MIT License.