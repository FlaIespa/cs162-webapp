import React from 'react';
import { Fab } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import '../App.css'; 

const AddTaskButton = ({ onClick }) => {
    return (
        <Fab
            aria-label="add"
            onClick={onClick}
            sx={{
                position: 'fixed',
                bottom: 16,
                right: 16,
                zIndex: 1000,
                background: 'linear-gradient(135deg, #00bfa5, #009688)', 
                color: '#ffffff',
                fontWeight: 'bold',
                boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.15)',
                '&:hover': {
                    background: 'linear-gradient(135deg, #00d4c7, #00bfa5)', 
                    transform: 'translateY(-3px)',
                    boxShadow: '0px 6px 15px rgba(0, 0, 0, 0.2)',
                },
                '&:active': {
                    transform: 'translateY(0)',
                    boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.15)',
                },
            }}
        >
            <AddIcon />
        </Fab>
    );
};

export default AddTaskButton;
