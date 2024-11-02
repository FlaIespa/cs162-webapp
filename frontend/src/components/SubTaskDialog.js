// src/components/SubTaskDialog.js
import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button, MenuItem } from '@mui/material';
import DueDatePicker from './DueDatePicker';
import '../App.css'; // Import global styles

const SubTaskDialog = ({ open, handleClose, handleSave, initialData = {}, parentID }) => {
    const [subTaskName, setSubTaskName] = useState(initialData.name || '');
    const [dueDate, setDueDate] = useState(initialData.dueDate || null);
    const [priority, setPriority] = useState(initialData.priority || '');

    const handleSubTaskNameChange = (event) => {
        setSubTaskName(event.target.value);
    };

    const handlePriorityChange = (event) => {
        setPriority(event.target.value);
    };

    const handleDueDateChange = (newDate) => {
        setDueDate(newDate);
    };

    const handleSubmit = async () => {
        try {
            console.log(parentID)
            console.log("Sending subtask creation request to:", `${process.env.REACT_APP_API_URL}/tasks/${parentID}/subtasks`);
            console.log("Request body:", {
                name: subTaskName,
                dueDate,
                priority,
                status: 'To-Do' // Default status
            });
    
            // Make the API call to create a subtask
            const response = await fetch(`${process.env.REACT_APP_API_URL}/api/tasks/${parentID}/subtasks`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify({
                    name: subTaskName,
                    dueDate,
                    priority,
                    status: 'To-Do'
                })
            });
    
            if (response.ok) {
                const savedSubtask = await response.json();
                console.log("Subtask saved successfully:", savedSubtask);
    
                // Reset form fields and close the dialog
                setSubTaskName('');
                setDueDate(null);
                setPriority('');
    
                // Optional: You can pass the new subtask back to the parent to update the UI
                handleSave(savedSubtask);
            } else {
                console.error("Failed to save subtask:", await response.json());
            }
        } catch (error) {
            console.error("Error saving subtask:", error);
        } finally {
            handleClose();
        }
    };
    

    return (
        <Dialog 
            open={open} 
            onClose={handleClose} 
            PaperProps={{
                sx: {
                    padding: '1.5rem',
                    borderRadius: 'var(--border-radius)',
                    backgroundColor: 'var(--task-bg)',
                    color: 'var(--text-color)',
                    boxShadow: 'var(--shadow)',
                }
            }}
        >
            <DialogTitle sx={{ fontFamily: 'var(--font-family-alt)', color: 'var(--accent-color)' }}>
                {initialData.name ? "Edit SubTask" : "Add SubTask"}
            </DialogTitle>
            <DialogContent>
                <TextField
                    label="SubTask Name"
                    fullWidth
                    variant="outlined"
                    value={subTaskName}
                    onChange={handleSubTaskNameChange}
                    sx={{
                        marginBottom: '1rem',
                        '& .MuiOutlinedInput-root': {
                            borderRadius: 'var(--border-radius)',
                            backgroundColor: 'var(--bg-color)',
                        },
                        '& .MuiInputLabel-root': {
                            color: 'var(--accent-color)',
                        },
                    }}
                />
                <DueDatePicker dueDate={dueDate} setDueDate={handleDueDateChange} />
                <TextField
                    select
                    label="Priority"
                    fullWidth
                    variant="outlined"
                    value={priority}
                    onChange={handlePriorityChange}
                    sx={{
                        marginTop: '1rem',
                        '& .MuiOutlinedInput-root': {
                            borderRadius: 'var(--border-radius)',
                            backgroundColor: 'var(--bg-color)',
                        },
                        '& .MuiInputLabel-root': {
                            color: 'var(--accent-color)',
                        },
                    }}
                >
                    <MenuItem value="" disabled>
                        Priority
                    </MenuItem>
                    <MenuItem value="high">High</MenuItem>
                    <MenuItem value="medium">Medium</MenuItem>
                    <MenuItem value="low">Low</MenuItem>
                </TextField>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} sx={{ color: 'var(--secondary-accent)', fontWeight: 'bold' }}>
                    Cancel
                </Button>
                <Button onClick={handleSubmit} sx={{ color: 'var(--accent-color)', fontWeight: 'bold' }}>
                    {initialData.name ? "Save" : "Add"}
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default SubTaskDialog;
