// src/components/DueDatePicker.js
import React from 'react';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { TextField } from '@mui/material';

const DueDatePicker = ({ dueDate, setDueDate }) => (
    <DatePicker
        label="Due Date"
        value={dueDate}
        onChange={(newDate) => setDueDate(newDate)}
        renderInput={(params) => (
            <TextField 
                {...params} 
                fullWidth 
                variant="outlined"
                sx={{
                    '& .MuiOutlinedInput-root': {
                        borderRadius: 'var(--border-radius)',
                        backgroundColor: 'var(--bg-color)', // Ensure it's white to match other fields
                    },
                    '& .MuiInputLabel-root': {
                        color: 'var(--accent-color)',
                    },
                }}
            />
        )}
    />
);

export default DueDatePicker;
