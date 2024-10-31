// src/components/TodoList.js
import React, { useState } from 'react';
import TodoItem from './TodoItem';
import TaskDialog from './TaskDialog';
import SearchBar from './SearchBar';
import { Container, Box, Typography, Paper, Button, Stack, Snackbar, Alert } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';

const TodoList = ({ tasks: initialTasks, listName }) => {
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [tasks, setTasks] = useState(initialTasks);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarSeverity, setSnackbarSeverity] = useState('success');

    const handleOpenDialog = () => {
        setIsDialogOpen(true);
    };

    const handleCloseDialog = () => {
        setIsDialogOpen(false);
    };

    const handleSaveTask = (newTask) => {
        setTasks((prevTasks) => [...prevTasks, { ...newTask, status: 'To-Do' }]); // Default status
        setSnackbarMessage('Task added successfully!');
        setSnackbarSeverity('success');
        setSnackbarOpen(true);
        handleCloseDialog();
    };

    const handleSearch = (query) => {
        setSearchQuery(query.toLowerCase());
    };

    const handleDeleteTask = (taskName) => {
        setTasks((prevTasks) => prevTasks.filter((task) => task.name !== taskName));
        setSnackbarMessage('Task deleted successfully!');
        setSnackbarSeverity('info');
        setSnackbarOpen(true);
    };

    const handleDeleteSubtask = (taskName, subtaskName) => {
        setTasks((prevTasks) =>
            prevTasks.map((task) =>
                task.name === taskName
                    ? {
                          ...task,
                          subItems: task.subItems.filter((subtask) => subtask.name !== subtaskName),
                      }
                    : task
            )
        );
        setSnackbarMessage('Subtask deleted successfully!');
        setSnackbarSeverity('info');
        setSnackbarOpen(true);
    };

    const handleAddSubtask = (taskName, newSubtask) => {
        setTasks((prevTasks) =>
            prevTasks.map((task) =>
                task.name === taskName
                    ? { ...task, subItems: [...(task.subItems || []), newSubtask] }
                    : task
            )
        );
        setSnackbarMessage('Subtask added successfully!');
        setSnackbarSeverity('success');
        setSnackbarOpen(true);
    };

    const handleCompleteSubtask = (taskName, subtaskName, completed) => {
        setTasks((prevTasks) =>
            prevTasks.map((task) =>
                task.name === taskName
                    ? {
                          ...task,
                          subItems: task.subItems.map((subtask) =>
                              subtask.name === subtaskName
                                  ? { ...subtask, completed }
                                  : subtask
                          ),
                      }
                    : task
            )
        );
    };

    const handleSnackbarClose = () => {
        setSnackbarOpen(false);
    };

    // New: Filter tasks based on status
    const tasksByStatus = {
        'To-Do': tasks.filter((task) => task.status === 'To-Do'),
        'Doing': tasks.filter((task) => task.status === 'Doing'),
        'Done': tasks.filter((task) => task.status === 'Done'),
    };

    // Handle drag end for moving tasks between columns
    const handleDragEnd = (result) => {
        const { source, destination } = result;

        if (!destination) return; // If dropped outside

        const sourceStatus = source.droppableId;
        const destinationStatus = destination.droppableId;

        if (sourceStatus !== destinationStatus) {
            const task = tasks.find((task, index) => index === source.index && task.status === sourceStatus);
            task.status = destinationStatus;

            setTasks([...tasks.filter((t) => t !== task), task]);
        }
    };

    return (
        <Container maxWidth="lg" sx={{ marginTop: 4 }}>
            <Paper elevation={3} sx={{ padding: 3, backgroundColor: 'rgba(255, 255, 255, 0.9)', width: '100%', margin: 'auto'}} >
                <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ marginBottom: 2 }}>
                    <Typography 
                        variant="h4" 
                        component="h2" 
                        fontWeight="bold" 
                        sx={{ color: 'var(--accent-color)' }}
                    >
                        {listName}
                    </Typography>

                    <Button 
                        variant="contained" 
                        color="primary" 
                        startIcon={<AddIcon />} 
                        onClick={handleOpenDialog}
                        sx={{
                            backgroundColor: 'var(--accent-color)',
                            '&:hover': { backgroundColor: 'var(--button-hover-color)' },
                            boxShadow: 'var(--button-shadow)',
                            fontWeight: 'bold',
                            borderRadius: 'var(--border-radius)'
                        }}
                    >
                        Add Task
                    </Button>
                </Stack>

                <SearchBar onSearch={handleSearch} />

                <DragDropContext onDragEnd={handleDragEnd}>
                    <Stack direction="row" spacing={2} sx={{ marginTop: 4 }}>
                        {['To-Do', 'Doing', 'Done'].map((status) => (
                            <Droppable key={status} droppableId={status}>
                                {(provided) => (
                                    <Box 
                                        ref={provided.innerRef} 
                                        {...provided.droppableProps} 
                                        sx={{ flex: 1, padding: 2, backgroundColor: '#f0f0f0', borderRadius: '8px' }}
                                    >
                                        <Typography variant="h6" sx={{ color: 'var(--accent-color)', textAlign: 'center' }}>
                                            {status}
                                        </Typography>
                                        {tasksByStatus[status].map((task, index) => (
                                            <Draggable key={task.name} draggableId={task.name} index={index}>
                                                {(provided) => (
                                                    <Box
                                                        ref={provided.innerRef}
                                                        {...provided.draggableProps}
                                                        {...provided.dragHandleProps}
                                                        sx={{ marginBottom: 2 }}
                                                    >
                                                        <TodoItem 
                                                            task={task} 
                                                            onDelete={handleDeleteTask} 
                                                            onAddSubtask={handleAddSubtask} 
                                                            onDeleteSubtask={handleDeleteSubtask} 
                                                            onCompleteSubtask={handleCompleteSubtask} 
                                                        />
                                                    </Box>
                                                )}
                                            </Draggable>
                                        ))}
                                        {provided.placeholder}
                                    </Box>
                                )}
                            </Droppable>
                        ))}
                    </Stack>
                </DragDropContext>
            </Paper>

            <TaskDialog
                open={isDialogOpen}
                handleClose={handleCloseDialog}
                handleSave={handleSaveTask}
            />

            <Snackbar 
                open={snackbarOpen} 
                autoHideDuration={3000} 
                onClose={handleSnackbarClose}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            >
                <Alert onClose={handleSnackbarClose} severity={snackbarSeverity} sx={{ width: '100%' }}>
                    {snackbarMessage}
                </Alert>
            </Snackbar>
        </Container>
    );
};

export default TodoList;
