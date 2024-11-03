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
                if (showTodoList === id) setShowTodoList(null);
            } else {
                const data = await response.json();
                console.error(data.msg);
            }
        } catch (error) {
            console.error("Failed to delete task list:", error);
        }
    };

    const handleListClick = async (id, name) => {
        setShowTodoList(id);
        setSelectedListName(name);
        // await fetchUpdatedTasks(id);
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

    // const fetchUpdatedTasks = async () => {
    //     try {
    //         const response = await fetch(`${API_URL}/api/lists`, {
    //             headers: {
    //                 'Authorization': `Bearer ${localStorage.getItem('token')}`
    //             }
    //         });
    
    //         if (!response.ok) {
    //             console.error(`Failed to fetch lists. Status code: ${response.status}`);
    //             return;
    //         }
    
    //         const data = await response.json();
    //         console.log("Fetched data:", data); // Check the structure of the data here
    
    //         // Assuming data.lists is the array of lists returned by the backend
    //         setTaskLists(data.lists);
    //     } catch (error) {
    //         console.error("Error fetching updated tasks:", error);
    //     }
    // };
    
    // const fetchUpdatedTasks = async (listId) => {
    //     try {
    //         const response = await fetch(`${API_URL}/api/${listId}/tasks`, {
    //             method: 'GET',
    //             headers: {
    //                 'Authorization': `Bearer ${localStorage.getItem('token')}`
    //             }
    //         });
    //         const data = await response.json();
    //         console.log("Fetched data:", data); // Check the structure of the data here
    //         if (response.ok) {
    //             setTaskLists((prevLists) => {
    //                 const updatedLists = prevLists.map((list) =>
    //                     list.id === listId ? { ...list, tasks: data.tasks } : list
    //                 );
    //                 console.log("Updated task lists:", updatedLists); // Inspect if the update is correct
    //                 return updatedLists;
    //             });
    //         } else {
    //             console.error("Failed to fetch updated tasks:", data.msg);
    //         }
    //     } catch (error) {
    //         console.error("Error fetching updated tasks:", error);
    //     }
    // };

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
                        // fetchUpdatedTasks(showTodoList);
                    }
                }}>
                    {showTodoList && (
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
                                 // Pass handleAddTask as a prop to TodoList
                                // fetchUpdatedTasks={fetchUpdatedTasks}
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
