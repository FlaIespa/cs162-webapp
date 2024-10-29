// src/components/TaskStatusToggle.js
import React from 'react';
import { Checkbox, FormControlLabel, Typography } from '@mui/material';

const TaskStatusToggle = ({ isChecked, onChange, label }) => {
    return (
        <FormControlLabel
            control={
                <Checkbox 
                    checked={isChecked} 
                    onChange={onChange} 
                    color="primary"
                />
            }
            label={
                <Typography 
                    variant="body1" 
                    style={{ textDecoration: isChecked ? 'line-through' : 'none', color: isChecked ? 'gray' : 'black' }}
                >
                    {label}
                </Typography>
            }
        />
    );
};

export default TaskStatusToggle;
