// src/components/AddListButton.js
import React from 'react';
import { Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

const AddListButton = ({ onClick }) => {
    return (
        <Button
            variant="contained"
            onClick={onClick}
            startIcon={<AddIcon />}
            sx={{
                padding: '0.8rem 2rem',
                fontSize: '1rem',
                background: 'linear-gradient(135deg, #00bfa5, #009688)',
                color: '#fff',
                fontWeight: 'bold',
                borderRadius: '24px',
                boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.15)',
                transition: 'transform 0.2s ease, box-shadow 0.2s ease',
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
            Add New List
        </Button>
    );
};

export default AddListButton;
