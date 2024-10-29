// src/components/TodoItem.js
import React, { useState } from 'react';
import SubItem from './SubItem';
import TaskStatusToggle from './TaskStatusToggle';
import DeleteConfirmationDialog from './DeleteConfirmationDialog';
import { Card, CardContent, Typography, IconButton, Box, Collapse, Divider } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import DeleteIcon from '@mui/icons-material/Delete';

const TodoItem = ({ task, onDelete }) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const [isCompleted, setIsCompleted] = useState(false);
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

    const toggleExpand = () => setIsExpanded(!isExpanded);
    const toggleCompletion = () => setIsCompleted(!isCompleted);

    const handleDeleteClick = () => {
        setIsDeleteDialogOpen(true);
    };

    const handleConfirmDelete = () => {
        setIsDeleteDialogOpen(false);
        onDelete(task.name); // Assuming onDelete function is passed from TodoList
    };

    return (
        <Card variant="outlined" sx={{ marginY: 2, backgroundColor: isCompleted ? 'rgba(230, 230, 230, 0.6)' : 'rgba(240, 240, 240, 0.8)' }}>
            <CardContent>
                <Box display="flex" alignItems="center" justifyContent="space-between">
                    <TaskStatusToggle 
                        isChecked={isCompleted} 
                        onChange={toggleCompletion} 
                        label={task.name} 
                    />
                    <Box>
                        <IconButton onClick={toggleExpand} size="small">
                            {isExpanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                        </IconButton>
                        <IconButton onClick={handleDeleteClick} size="small" color="secondary">
                            <DeleteIcon />
                        </IconButton>
                    </Box>
                </Box>
                
                {/* Display Due Date if it exists */}
                {task.dueDate && (
                    <Typography variant="body2" color="text.secondary" sx={{ marginTop: 1 }}>
                        Due: {new Date(task.dueDate).toLocaleDateString()}
                    </Typography>
                )}

                {/* Display Priority if it exists */}
                {task.priority && (
                    <Typography variant="body2" color="text.secondary" sx={{ marginTop: 1 }}>
                        Priority: {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
                    </Typography>
                )}

                <Divider sx={{ marginY: 1 }} />
                <Collapse in={isExpanded} timeout="auto" unmountOnExit>
                    <Box sx={{ paddingLeft: 2 }}>
                        {task.subItems && task.subItems.map((subTask, index) => (
                            <SubItem key={index} subTask={subTask} />
                        ))}
                    </Box>
                </Collapse>
            </CardContent>

            {/* Delete Confirmation Dialog */}
            <DeleteConfirmationDialog 
                open={isDeleteDialogOpen} 
                onClose={() => setIsDeleteDialogOpen(false)} 
                onConfirm={handleConfirmDelete} 
            />
        </Card>
    );
};

export default TodoItem;
