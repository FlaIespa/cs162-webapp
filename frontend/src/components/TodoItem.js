// src/components/TodoItem.js
import React, { useState } from 'react';
import SubItem from './SubItem';
import TaskStatusToggle from './TaskStatusToggle';
import DeleteConfirmationDialog from './DeleteConfirmationDialog';
import TaskDialog from './TaskDialog';
import { Card, CardContent, Typography, IconButton, Box, Collapse, Divider } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import SubTaskDialog from './SubTaskDialog';

const TodoItem = ({ task, onDelete, onDeleteSubtask, onCompleteTask }) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
    const [isSubtaskDialogOpen, setIsSubtaskDialogOpen] = useState(false);

    // Toggle the expanded state of the task
    const toggleExpand = () => setIsExpanded(!isExpanded);

    // Handle task deletion
    const handleDeleteClick = () => {
        setIsDeleteDialogOpen(true);
    };

    const handleConfirmDelete = () => {
        setIsDeleteDialogOpen(false);
        onDelete(task.id);  // Calls the onDelete function passed down from TodoList
    };

    // Handle adding a new subtask
    const handleAddSubtaskClick = () => {
        setIsSubtaskDialogOpen(true);
    };

    // const handleSubtaskSave = (newSubtask) => {
    //     onAddSubtask(task.id, newSubtask);  // Adds the new subtask to this task’s subItems
    //     setIsSubtaskDialogOpen(false);
    // };

    // Handle task completion
    const handleCompletionToggle = () => {
        onCompleteTask(task.name, !task.completed); // Calls the onCompleteTask function with updated completion status
    };

    return (
        <Card 
            variant="outlined" 
            className="main-task" 
            sx={{ 
                marginY: 2,
                padding: 2,
                borderRadius: 'var(--border-radius)',
                boxShadow: 'var(--shadow)',
                color: 'var(--text-color)',
                transition: 'background-color 0.3s ease',
            }}
        >
            <CardContent>
                <Box display="flex" alignItems="center" justifyContent="space-between">
                    <TaskStatusToggle 
                        isChecked={task.completed} 
                        onChange={handleCompletionToggle} 
                        label={task.name} 
                    />
                    <Box>
                        <IconButton onClick={handleAddSubtaskClick} size="small" sx={{ color: 'var(--accent-color)', '&:hover': { color: 'var(--button-hover)' } }}>
                            <AddIcon />
                        </IconButton>
                        <IconButton onClick={toggleExpand} size="small" sx={{ color: 'var(--accent-color)', '&:hover': { color: 'var(--button-hover)' } }}>
                            {isExpanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                        </IconButton>
                        <IconButton onClick={handleDeleteClick} size="small" sx={{ color: 'var(--secondary-accent)', '&:hover': { color: 'var(--button-hover)' } }}>
                            <DeleteIcon />
                        </IconButton>
                    </Box>
                </Box>
                
                {task.dueDate && (
                    <Typography variant="body2" sx={{ color: 'var(--text-color)', marginTop: 1 }}>
                        Due: {new Date(task.dueDate).toLocaleDateString()}
                    </Typography>
                )}

                {task.priority && (
                    <Typography variant="body2" sx={{ color: 'var(--secondary-accent)', marginTop: 1 }}>
                        Priority: {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
                    </Typography>
                )}

                <Divider sx={{ backgroundColor: 'rgba(44, 62, 62, 0.3)', marginY: 1 }} />
                <Collapse in={isExpanded} timeout="auto" unmountOnExit>
                    <Box sx={{ paddingLeft: 2 }}>
                        {task.subItems && task.subItems.map((subTask, index) => (
                            <SubItem 
                                key={index} 
                                subTask={subTask}
                                level={2} 
                                onDeleteSubtask={onDeleteSubtask} // Handle subtask deletion
                                onCompleteSubtask={onCompleteTask} // Handle subtask completion
                            />
                        ))}
                    </Box>
                </Collapse>
            </CardContent>

            <SubTaskDialog
                open={isSubtaskDialogOpen}
                handleClose={() => setIsSubtaskDialogOpen(false)}
                parentID={task.id}
                
            />

            <DeleteConfirmationDialog 
                open={isDeleteDialogOpen} 
                onClose={() => setIsDeleteDialogOpen(false)} 
                onConfirm={handleConfirmDelete} 
            />
        </Card>
    );
};

export default TodoItem;
