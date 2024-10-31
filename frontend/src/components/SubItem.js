// src/components/SubItem.js
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
    const [isCompleted, setIsCompleted] = useState(false);

    const toggleExpand = () => setIsExpanded(!isExpanded);
    const handleAddSubtaskClick = () => setIsSubtaskDialogOpen(true);
    const handleDeleteClick = () => onDeleteSubtask(subTask.name);
    const handleCompleteChange = () => {
        setIsCompleted(!isCompleted);
        onCompleteSubtask(subTask.name, !isCompleted);
    };

    const handleSubtaskSave = (newSubtask) => {
        if (!subTask.subItems) subTask.subItems = [];
        subTask.subItems.push(newSubtask);
        onAddSubtask(subTask.name, newSubtask); 
        setIsSubtaskDialogOpen(false);
    };

    // Set background color based on task level
    const backgroundColor = level === 2 
        ? 'var(--subtask-bg)'       // Second-level subtask
        : 'var(--subsubtask-bg)';   // Third-level subtask

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
                    {/* Completion Checkbox */}
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
                        {subTask.subItems && subTask.subItems.map((nestedSubTask, index) => (
                            <SubItem 
                                key={index} 
                                subTask={nestedSubTask} 
                                level={level + 1} 
                                onAddSubtask={onAddSubtask} 
                                onDeleteSubtask={onDeleteSubtask} // Pass down for nested deletion
                                onCompleteSubtask={onCompleteSubtask} // Pass down for nested completion
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
