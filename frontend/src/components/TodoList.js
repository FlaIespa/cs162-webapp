// src/components/TodoList.js
import React, { useState } from 'react';
import TodoItem from './TodoItem';
import AddTaskButton from './AddTaskButton';
import TaskDialog from './TaskDialog';
import SearchBar from './SearchBar';
import { Container, Box, Typography, Paper } from '@mui/material';

const TodoList = ({ tasks: initialTasks, addTask }) => {
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [tasks, setTasks] = useState(initialTasks); // Local state to manage tasks

    const handleOpenDialog = () => {
        setIsDialogOpen(true);
    };

    const handleCloseDialog = () => {
        setIsDialogOpen(false);
    };

    const handleSaveTask = (newTask) => {
        setTasks((prevTasks) => [...prevTasks, newTask]); // Adding the new task with due date
        handleCloseDialog();
    };

    const handleSearch = (query) => {
        setSearchQuery(query.toLowerCase());
    };

    // Function to delete a task by name
    const handleDeleteTask = (taskName) => {
        setTasks((prevTasks) => prevTasks.filter((task) => task.name !== taskName));
    };

    // Filter tasks based on the search query
    const filteredTasks = tasks.filter(task => {
        const taskNameMatches = task.name.toLowerCase().includes(searchQuery);
        const subItemsMatch = task.subItems && task.subItems.some(subTask => 
            subTask.name.toLowerCase().includes(searchQuery) ||
            (subTask.subItems && subTask.subItems.some(nestedSubTask =>
                nestedSubTask.name.toLowerCase().includes(searchQuery)
            ))
        );
        return taskNameMatches || subItemsMatch;
    });

    return (
        <Container maxWidth="md" sx={{ marginTop: 4 }}>
            <Paper elevation={3} sx={{ padding: 3, backgroundColor: 'rgba(255, 255, 255, 0.9)' }}>
                <Typography variant="h4" component="h2" align="center" fontWeight="bold" color="text.primary" gutterBottom>
                    Todo List
                </Typography>

                {/* Search Bar */}
                <SearchBar onSearch={handleSearch} />

                <Box>
                    {filteredTasks.map((task, index) => (
                        <TodoItem key={index} task={task} onDelete={handleDeleteTask} />
                    ))}
                </Box>
            </Paper>

            {/* Add Task Button */}
            <AddTaskButton onClick={handleOpenDialog} />

            {/* Task Dialog for Adding New Task */}
            <TaskDialog
                open={isDialogOpen}
                handleClose={handleCloseDialog}
                handleSave={handleSaveTask}
            />
        </Container>
    );
};

export default TodoList;
