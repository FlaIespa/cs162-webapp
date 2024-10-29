// src/components/AddTaskButton.js
import React from 'react';
import { Fab } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

const AddTaskButton = ({ onClick }) => {
    return (
        <Fab
            color="primary"
            aria-label="add"
            onClick={onClick}
            sx={{
                position: 'fixed',
                bottom: 16,
                right: 16,
                zIndex: 1000,
            }}
        >
            <AddIcon />
        </Fab>
    );
};

export default AddTaskButton;
