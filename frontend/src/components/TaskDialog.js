// src/components/TaskDialog.js
import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import PrioritySelector from './PrioritySelector';

const TaskDialog = ({ open, handleClose, handleSave, initialData = {} }) => {
    const [taskName, setTaskName] = useState(initialData.name || '');
    const [dueDate, setDueDate] = useState(initialData.dueDate || null);
    const [priority, setPriority] = useState(initialData.priority || '');

    const handleSubmit = () => {
        handleSave({ name: taskName, dueDate, priority });
        handleClose();
    };

    return (
        <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
            <DialogTitle>{initialData.name ? "Edit Task" : "Add Task"}</DialogTitle>
            <DialogContent>
                <TextField
                    autoFocus
                    margin="dense"
                    label="Task Name"
                    type="text"
                    fullWidth
                    variant="outlined"
                    value={taskName}
                    onChange={(e) => setTaskName(e.target.value)}
                />
                
                <DatePicker
                    label="Due Date"
                    value={dueDate}
                    onChange={(newDate) => setDueDate(newDate)}
                    renderInput={(params) => <TextField {...params} fullWidth />}
                />

                <PrioritySelector priority={priority} setPriority={setPriority} />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="secondary">Cancel</Button>
                <Button onClick={handleSubmit} color="primary">
                    {initialData.name ? "Save" : "Add"}
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default TaskDialog;
