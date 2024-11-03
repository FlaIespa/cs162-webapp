import React, { useState, useEffect } from 'react';
import TaskListCarousel from '../components/TaskListCarousel';
import TodoList from '../components/TodoList';
import Header from '../components/Header';
import Footer from '../components/Footer';
import AddListButton from '../components/AddListButton';
import AddListDialog from '../components/AddListDialog';
import { Box } from '@mui/material';
import { DragDropContext } from '@hello-pangea/dnd';

// Backend API URL from environment variables
const API_URL = process.env.REACT_APP_API_URL;

const HomePage = () => {
    const [taskLists, setTaskLists] = useState([]);
    const [showTodoList, setShowTodoList] = useState(null);
    const [selectedListName, setSelectedListName] = useState('');
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    // Load saved showTodoList and selectedListName from local storage on component mount
    useEffect(() => {
        const savedListId = localStorage.getItem('showTodoList');
        if (savedListId) {
            setShowTodoList(Number(savedListId));
            const savedListName = localStorage.getItem('selectedListName');
            if (savedListName) setSelectedListName(savedListName);
        }
    }, []);

    // Fetch task lists on component mount
    useEffect(() => {
        const fetchTaskLists = async () => {
            try {
                const response = await fetch(`${API_URL}/api/lists`, {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    }
                });
                const data = await response.json();
                if (response.ok) {
                    setTaskLists(data.lists); // `data.lists` now includes tasks with nested subtasks
                } else {
                    console.error(data.msg);
                }
            } catch (error) {
                console.error("Failed to fetch task lists:", error);
            }
        };
    
        fetchTaskLists();
    }, []);

    // Function to add a new task list
    const handleAddTaskList = async (newList) => {
        try {
            const response = await fetch(`${API_URL}/api/lists`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify({ name: newList.name })
            });
            const data = await response.json();
            if (response.ok) {
                const listWithId = {
                    id: data.list_id,
                    name: newList.name,
                    tasks: []
                };
                setTaskLists([...taskLists, listWithId]);
            } else {
                console.error(data.msg);
            }
        } catch (error) {
            console.error("Failed to add task list:", error);
        }
    };

    // Function to add a new task to a specific list
    const handleAddTask = async (listId, taskName, dueDate, priority) => {
        try {
            console.log('This is the due date:', dueDate)
            const response = await fetch(`${API_URL}/api/lists/${listId}/tasks`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify({ name: taskName, dueDate, priority, subItems: [] })
            });
            return response;
        } catch (error) {
            console.error("Failed to add task:", error);
            return null; // Return null if there is an error
        }
    };
    
    // Function to delete a task list
    const deleteTaskList = async (id) => {
        try {
            const response = await fetch(`${API_URL}/api/lists/${id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });
            if (response.ok) {
                setTaskLists(taskLists.filter((list) => list.id !== id));
                if (showTodoList === id) {
                    setShowTodoList(null);
                    setSelectedListName('');
                    localStorage.removeItem('showTodoList');
                    localStorage.removeItem('selectedListName');
                }
            } else {
                const data = await response.json();
                console.error(data.msg);
            }
        } catch (error) {
            console.error("Failed to delete task list:", error);
        }
    };

    const handleListClick = (id, name) => {
        setShowTodoList(id);
        setSelectedListName(name);
        localStorage.setItem('showTodoList', id);  // Save list ID
        localStorage.setItem('selectedListName', name);  // Save list name
    };


    const handleMoveTask = (sourceListId, destinationListId, sourceIndex, destinationIndex) => {
        const sourceList = taskLists.find((list) => list.id === sourceListId);
        const destinationList = taskLists.find((list) => list.id === destinationListId);

        const [movedTask] = sourceList.tasks.splice(sourceIndex, 1);
        destinationList.tasks.splice(destinationIndex, 0, movedTask);

        setTaskLists(taskLists.map((list) => 
            list.id === sourceListId ? sourceList : list.id === destinationListId ? destinationList : list
        ));
    };

    return (
        <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
            <Header />
            <Box sx={{ padding: '2rem', flexGrow: 1, textAlign: 'center' }}>
                <AddListButton onClick={() => setIsDialogOpen(true)} />
                <TaskListCarousel
                    taskLists={taskLists}
                    onCardClick={(id) => handleListClick(id, taskLists.find((list) => list.id === id).name)}
                    onDelete={deleteTaskList}
                />

                <DragDropContext onDragEnd={({ source, destination }) => {
                    if (!destination) return;

                    const sourceListId = taskLists.find((list) => list.id === showTodoList).id;
                    const destinationListId = taskLists.find((list) => list.id === destination.droppableId)?.id;
                    if (sourceListId && destinationListId) {
                        handleMoveTask(sourceListId, destinationListId, source.index, destination.index);
                    }
                }}>
                    {showTodoList && taskLists.some((list) => list.id === showTodoList) &&(
                        <Box sx={{ marginTop: '3rem' }}>
                            <TodoList
                                tasks={taskLists.find((list) => list.id === showTodoList).tasks}
                                setTasks={(updatedTasks) =>
                                    setTaskLists((prev) =>
                                        prev.map((list) =>
                                            list.id === showTodoList ? { ...list, tasks: updatedTasks } : list
                                        )
                                    )
                                }
                                listName={selectedListName}
                                listId={showTodoList}
                                onAddTask={handleAddTask}
                            />
                        </Box>
                    )}
                </DragDropContext>

                <AddListDialog
                    open={isDialogOpen}
                    onClose={() => setIsDialogOpen(false)}
                    onSave={handleAddTaskList}
                />
            </Box>
            <Footer />
        </Box>
    );
};

export default HomePage;
