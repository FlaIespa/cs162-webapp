import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button, MenuItem } from '@mui/material';
import DueDatePicker from './DueDatePicker';
import '../App.css'; 

const TaskDialog = ({ open, handleClose, handleSave, initialData = {} }) => {
    const [taskName, setTaskName] = useState(initialData.name || '');
    const [dueDate, setDueDate] = useState(initialData.dueDate || null);
    const [priority, setPriority] = useState(initialData.priority || '');

    const handleTaskNameChange = (event) => {
        setTaskName(event.target.value);
    };

    const handlePriorityChange = (event) => {
        setPriority(event.target.value);
    };

    const handleDueDateChange = (newDate) => {
        setDueDate(newDate);
    };

    const handleSubmit = () => {
        handleSave({ name: taskName, dueDate, priority });
        setTaskName(''); 
        setDueDate(null);
        setPriority('');
        handleClose();
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
                {initialData.name ? "Edit Task" : "Add Task"}
            </DialogTitle>
            <DialogContent>
                <TextField
                    label="Task Name"
                    fullWidth
                    variant="outlined"
                    value={taskName}
                    onChange={handleTaskNameChange}
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

export default TaskDialog;
