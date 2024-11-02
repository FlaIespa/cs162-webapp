import React, { useEffect, useState } from 'react';
import TodoItem from './TodoItem';
import TaskDialog from './TaskDialog';
import SearchBar from './SearchBar';
import { Container, Box, Typography, Paper, Button, Stack, Snackbar, Alert } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';


// Backend API URL from environment variables
const API_URL = process.env.REACT_APP_API_URL;

const TodoList = ({ tasks: initialTasks, listName, listId, onAddTask}) => {
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [tasks, setTasks] = useState(initialTasks);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarSeverity, setSnackbarSeverity] = useState('success');

    useEffect(() => {
        setTasks(initialTasks || []);
    }, [initialTasks, listId]);

    const handleOpenDialog = () => {
        setIsDialogOpen(true);
    };

    const handleCloseDialog = () => {
        setIsDialogOpen(false);
    };

    const fetchTasks = async (listId) => {
        try {
            const response = await fetch(`${API_URL}/api/${listId}/tasks`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });
    
            // Check if the response was successful
            if (!response.ok) {
                console.error("Failed to fetch tasks or no response received.");
                return null;  // Handle as needed, e.g., showing an error message
            }
    
            // Parse and return the JSON data
            const data = await response.json();
            return data.tasks;  // Assuming the backend response is structured as `{ tasks: [...] }`
        } catch (error) {
            console.error("Failed to fetch tasks:", error);
            return null; // Handle errors as needed
        }
    };


    const handleSaveTask = async (newTask) => {
        try {
            const response = await onAddTask(listId, newTask.name, newTask.dueDate, newTask.priority);
    
            // if (response.status === 201) {
            //     const updatedTasks = await fetchTasks(listId);
            //     console.log(updatedTasks)
            // if (updatedTasks) {
            //     setTasks(updatedTasks);
            //     setSnackbarMessage('Task added successfully!');
            //     setSnackbarSeverity('success');
            //     setSnackbarOpen(true);
            //     handleCloseDialog();
                
            // }
            setTasks(prevTasks => [...prevTasks, newTask]);
            setSnackbarMessage('Task added successfully!');
            setSnackbarSeverity('success');
            setSnackbarOpen(true);
            handleCloseDialog();

            }catch (error) {
                console.error("Failed to save task:", error);
                setSnackbarMessage('Failed to add task', error);
                setSnackbarSeverity('error');
                setSnackbarOpen(true);
        } 
        }


    
    useEffect(() => {
    }, [tasks]);  // Dependency on tasks, so this effect will run each time tasks is updated
    

    const handleSearch = (query) => {
        setSearchQuery(query.toLowerCase());
    };

    const handleDeleteTask = async (taskId) => {
        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/api/tasks/${taskId}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    'Content-Type': 'application/json'
                }
            });
    
            if (response.ok) {
                setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
                setSnackbarMessage('Task deleted successfully!');
                setSnackbarSeverity('info');
                setSnackbarOpen(true);
            } else {
                const data = await response.json();
                console.error("Failed to delete task:", data.msg);
                setSnackbarMessage('Failed to delete task');
                setSnackbarSeverity('error');
                setSnackbarOpen(true);
            }
        } catch (error) {
            console.error("Error deleting task:", error);
            setSnackbarMessage('Error deleting task');
            setSnackbarSeverity('error');
            setSnackbarOpen(true);
        }
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

    const handleAddSubtask = (parentTaskId, newSubtask) => {
        setTasks((prevTasks) =>
            prevTasks.map((task) =>
                task.id === parentTaskId
                    ? {
                          ...task,
                          subItems: [...(task.subItems || []), newSubtask]
                      }
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

    const tasksWithStatus = tasks
    .filter((task) => task !== undefined) // Filter out any undefined tasks
    .map((task) => ({
        ...task,
        status: task.status ?? 'To-Do'// Default status to 'To-Do' if undefined
    }));

    const tasksByStatus = {
        'To-Do': tasksWithStatus.filter((task) => task?.status === 'To-Do') || [],
        'Doing': tasksWithStatus.filter((task) => task?.status === 'Doing') || [],
        'Done': tasksWithStatus.filter((task) => task?.status === 'Done') || [],
    };
    

    const updateTaskStatus = async (taskId, newStatus) => {
        try {
            console.log(`Updating task ${taskId} to status ${newStatus}`);
            const response = await fetch(`${process.env.REACT_APP_API_URL}/api/tasks/${taskId}/status`, {
                method: 'PATCH',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ status: newStatus }),
            });
    
            if (response.ok) {
                console.log(`Task ${taskId} successfully updated to ${newStatus}`);
                return true;
            } else {
                const data = await response.json();
                console.error("Failed to update task status:", data.msg);
                return false;
            }
        } catch (error) {
            console.error("Error updating task status:", error);
            return false;
        }
    };
    
    

    const handleDragEnd = async (result) => {
        const { source, destination } = result;

        if (!destination) return;

        const sourceStatus = source.droppableId;
        const destinationStatus = destination.droppableId;

        // Ensure the task was moved to a new location or column
        if (sourceStatus !== destinationStatus || source.index !== destination.index) {
            // Locate the task being moved by its ID
            const taskToMove = tasks.find((task) => task.id === parseInt(result.draggableId));

            if (taskToMove) {
                // Temporarily update the task's status for optimistic UI update
                const updatedTask = { ...taskToMove, status: destinationStatus };
                const reorderedTasks = tasks.map((task) =>
                    task.id === updatedTask.id ? updatedTask : task
                );
                setTasks(reorderedTasks);

                // Update the status in the backend
                const success = await updateTaskStatus(updatedTask.id, destinationStatus);
                
                if (!success) {
                    // Revert if backend update failed
                    setTasks(tasks);
                
                // } else {
                //     await 
                //     // Confirm the status update from the backend
                //     setTasks(prevTasks =>
                //         prevTasks.map((task) =>
                //             task.id === updatedTask.id ? { ...task, status: destinationStatus } : task
                //         )
                //     );
            }
        }
    }
};

    
    

    return (
        <Container maxWidth="xl" sx={{ marginTop: 4, width: "100%", maxWidth: "100%", padding:"2"}}>
            <Paper elevation={3} sx={{ padding: 3, backgroundColor: 'rgba(255, 255, 255, 0.9)', width: '100%', margin: 'auto', maxWidth: "1500px"}} >
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
                                        {tasksByStatus[status]?.map((task, index) => (
                                            <Draggable key={task.id ? `task-${task.id}` : `index-${index}`} draggableId={String(task.id || index)} index={index}>
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
                                                            // onAddSubtask={handleAddSubtask} 
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
                handleSave={handleSaveTask} // Save task with backend integration
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
