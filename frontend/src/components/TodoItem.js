import React, { useState, useEffect } from 'react';
import TaskStatusToggle from './TaskStatusToggle';
import DeleteConfirmationDialog from './DeleteConfirmationDialog';
import TaskDialog from './TaskDialog';
import { Accordion, AccordionSummary, AccordionDetails, Typography, IconButton, Box, Divider } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import SubTaskDialog from './SubTaskDialog';

const TodoItem = ({ task, onDelete, onDeleteSubtask, onCompleteTask }) => {
    const [subitems, setSubitems] = useState(task.subitems || []); // Initialize local state with task.subitems
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
    const [isSubtaskDialogOpen, setIsSubtaskDialogOpen] = useState(false);
    const [currentParentId, setCurrentParentId] = useState(null); // State to track parent_id dynamically

    useEffect(() => {
        setSubitems(task.subitems || []); // Sync local state with task.subitems when task changes
    }, [task]);

    // Helper function to deeply add a new subtask at the correct level based on parent_id
    const addSubtaskToParent = (parentId, newSubtask, items) => {
        return items.map((item) => {
            if (item.id === parentId) {
                // If the item matches the parentId, add newSubtask to its subitems
                return {
                    ...item,
                    subitems: [...(item.subitems || []), newSubtask],
                };
            } else if (item.subitems) {
                // Otherwise, recursively check its subitems
                return {
                    ...item,
                    subitems: addSubtaskToParent(parentId, newSubtask, item.subitems),
                };
            }
            return item;
        });
    };

    // Handle adding a new subtask
    const handleAddSubtaskClick = (parentId) => {
        setCurrentParentId(parentId);
        setIsSubtaskDialogOpen(true);
    };

    const handleAddSubtask = (newSubtask) => {
        setSubitems((prevSubitems) => addSubtaskToParent(currentParentId, newSubtask, prevSubitems));
        setIsSubtaskDialogOpen(false);
    };

    // Recursive rendering function for each task and its subtasks
    const renderTaskWithSubtasks = (currentTask, allTasks = []) => (
        <Accordion 
            key={currentTask.id} 
            sx={{ 
                marginY: 1,
                padding: 1,
                borderRadius: '12px', // Rounded corners for a modern look
                boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)', // Soft shadow for a modern feel
                backgroundColor: 'var(--bg-color)', // Background color for the accordion
                transition: 'background-color 0.3s ease, box-shadow 0.3s ease',
                '&:before': { display: 'none' }, // Remove default MUI Accordion border
                '&:hover': {
                    boxShadow: '0px 6px 14px rgba(0, 0, 0, 0.15)', // Enhanced shadow on hover
                    backgroundColor: 'var(--hover-bg-color)', // Change background color on hover
                },
            }}
        >
            <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                sx={{
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'space-between',
                    padding: '0 16px', // More padding for better spacing
                    borderRadius: '12px', // Ensuring corners are rounded even when collapsed
                    '& .MuiAccordionSummary-content': {
                        margin: '8px 0', // Adjust vertical spacing
                    },
                }}
            >
                <Box display="flex" alignItems="center" justifyContent="space-between" width="100%">
                    <TaskStatusToggle 
                        isChecked={currentTask.completed} 
                        onChange={() => onCompleteTask(currentTask.name, !currentTask.completed)}
                        label={currentTask.name} 
                    />
                    <Box>
                        <IconButton 
                            onClick={() => handleAddSubtaskClick(currentTask.id)}
                            size="small" 
                            sx={{ color: 'var(--accent-color)', '&:hover': { color: 'var(--button-hover)' } }}
                        >
                            <AddIcon />
                        </IconButton>
                        <IconButton onClick={() => onDelete(currentTask.id)} size="small" sx={{ color: 'var(--secondary-accent)', '&:hover': { color: 'var(--button-hover)' } }}>
                            <DeleteIcon />
                        </IconButton>
                    </Box>
                </Box>
            </AccordionSummary>
    
            <AccordionDetails sx={{ paddingLeft: 2 }}>
                {currentTask.dueDate && (
                    <Typography variant="body2" sx={{ color: 'var(--text-color)', marginTop: 1 }}>
                        Due: {new Date(currentTask.dueDate).toLocaleDateString()}
                    </Typography>
                )}
                <Divider sx={{ backgroundColor: 'rgba(44, 62, 62, 0.3)', marginY: 1 }} />
                {(currentTask.subitems || []).map((subTask) => renderTaskWithSubtasks(subTask, allTasks))}
            </AccordionDetails>
        </Accordion>
    );

    return (
        <>
            {/* Render only top-level tasks if task.parent_id is null */}
            {task.parent_id == null && renderTaskWithSubtasks(task, subitems)}

            <SubTaskDialog
                open={isSubtaskDialogOpen}
                handleClose={() => setIsSubtaskDialogOpen(false)}
                onAddSubtask={handleAddSubtask}
                parentID={currentParentId}
            />

            <DeleteConfirmationDialog 
                open={isDeleteDialogOpen} 
                onClose={() => setIsDeleteDialogOpen(false)} 
                onConfirm={() => onDelete(task.id)}
            />
        </>
    );
};

export default TodoItem;
