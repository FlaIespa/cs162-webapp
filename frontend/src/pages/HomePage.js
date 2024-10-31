// src/pages/HomePage.js
import React, { useState } from 'react';
import TaskListCarousel from '../components/TaskListCarousel';
import TodoList from '../components/TodoList';
import Header from '../components/Header';
import Footer from '../components/Footer';
import AddListButton from '../components/AddListButton';
import AddListDialog from '../components/AddListDialog';
import { Box } from '@mui/material';
import { DragDropContext } from '@hello-pangea/dnd';

const HomePage = () => {
    const [taskLists, setTaskLists] = useState([]);
    const [showTodoList, setShowTodoList] = useState(null);
    const [selectedListName, setSelectedListName] = useState('');
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const handleAddTaskList = (newList) => {
        const listWithId = {
            id: taskLists.length + 1,
            ...newList,
            tasks: [],
        };
        setTaskLists([...taskLists, listWithId]);
    };

    const deleteTaskList = (id) => {
        setTaskLists(taskLists.filter((list) => list.id !== id));
        if (showTodoList === id) setShowTodoList(null);
    };

    const handleListClick = (id, name) => {
        setShowTodoList(id);
        setSelectedListName(name);
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
