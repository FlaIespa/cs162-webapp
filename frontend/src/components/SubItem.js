import React, { useState } from 'react';
import TaskDialog from './TaskDialog';
import { Box, Typography, IconButton, Collapse, Card, CardContent, Checkbox } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';

const SubItem = ({ subTask, level, onAddSubtask, onDeleteSubtask, onCompleteSubtask }) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const [isSubtaskDialogOpen, setIsSubtaskDialogOpen] = useState(false);
    const [subItems, setSubItems] = useState(subTask.subItems || []);
    const [isCompleted, setIsCompleted] = useState(subTask.completed || false);

    const toggleExpand = () => setIsExpanded(!isExpanded);
    const handleAddSubtaskClick = () => setIsSubtaskDialogOpen(true);

    const handleDeleteClick = () => onDeleteSubtask(subTask.id);

    const handleCompleteChange = async () => {
        setIsCompleted(!isCompleted);
        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/tasks/${subTask.id}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ completed: !isCompleted }),
            });
            if (response.ok) {
                onCompleteSubtask(subTask.id, !isCompleted);
            } else {
                console.error("Failed to update subtask completion status");
            }
        } catch (error) {
            console.error("Error updating subtask completion status:", error);
        }
    };

    const handleSubtaskSave = async (newSubtask) => {
        console.log("Sending subtask creation request to:", `${process.env.REACT_APP_API_URL}/tasks/${subTask.id}/subtasks`);
        console.log("Request body:", {
            name: newSubtask.name,
            dueDate: newSubtask.dueDate,
            priority: newSubtask.priority,
            status: newSubtask.status || 'To-Do'
        });
        
        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/api/tasks/${subTask.id}/subtasks`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: newSubtask.name,
                    dueDate: newSubtask.dueDate,
                    priority: newSubtask.priority,
                    // parent_id: subTask.id 
                }),
            });
    
            if (response.ok) {
                const { subTask } = await response.json();
                setSubItems((prevSubItems) => [...prevSubItems, subTask]);  // Append new subtask without overwriting
                onAddSubtask(subTask.id, subTask); // Update parent task with the new subtask
                setIsSubtaskDialogOpen(false); // Close dialog after save
            } else {
                console.error("Failed to save subtask");
            }
        } catch (error) {
            console.error("Error saving subtask:", error);
        }
    };
    
    

    const backgroundColor = level === 3 
        ? 'var(--subtask-bg)'
        : 'var(--subsubtask-bg)';

    return (
        <Card 
            variant="outlined" 
            className={`subtask level-${level}`} 
            sx={{ 
                marginY: 1, 
                padding: 2, 
                borderRadius: 'var(--border-radius)', 
                boxShadow: 'var(--shadow)',
                backgroundColor: backgroundColor,
                paddingLeft: `${level * 10}px`,
                textDecoration: isCompleted ? 'line-through' : 'none',
                opacity: isCompleted ? 0.6 : 1,
            }}
        >
            <CardContent>
                <Box display="flex" alignItems="center" justifyContent="space-between">
                    <Checkbox
                        checked={isCompleted}
                        onChange={handleCompleteChange}
                        sx={{ color: 'var(--accent-color)' }}
                    />
                    <Typography variant="body1" sx={{ flex: 1 }}>
                        {subTask.name}
                    </Typography>
                    <Box>
                        <IconButton onClick={handleAddSubtaskClick} size="small">
                            <AddIcon />
                        </IconButton>
                        <IconButton onClick={toggleExpand} size="small">
                            {isExpanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                        </IconButton>
                        <IconButton onClick={handleDeleteClick} size="small">
                            <DeleteIcon />
                        </IconButton>
                    </Box>
                </Box>

                {subTask.dueDate && (
                    <Typography variant="body2">
                        Due: {new Date(subTask.dueDate).toLocaleDateString()}
                    </Typography>
                )}

                {subTask.priority && (
                    <Typography variant="body2" sx={{ color: 'var(--secondary-accent)' }}>
                        Priority: {subTask.priority}
                    </Typography>
                )}

                <Collapse in={isExpanded} timeout="auto" unmountOnExit>
                    <Box sx={{ paddingLeft: 2 }}>
                        {subItems.map((nestedSubTask, index) => (
                            <SubItem 
                                key={index} 
                                subTask={{ ...nestedSubTask, parentTaskId: subTask.id }} 
                                level={level + 1} 
                                onAddSubtask={onAddSubtask} 
                                onDeleteSubtask={onDeleteSubtask}
                                onCompleteSubtask={onCompleteSubtask}
                            />
                        ))}
                    </Box>
                </Collapse>
            </CardContent>

            <TaskDialog
                open={isSubtaskDialogOpen}
                handleClose={() => setIsSubtaskDialogOpen(false)}
                handleSave={handleSubtaskSave}
            />
        </Card>
    );
};

export default SubItem;
