// src/components/DueDatePicker.js
import React from 'react';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { TextField } from '@mui/material';

const DueDatePicker = ({ dueDate, setDueDate }) => (
    <DatePicker
        label="Due Date"
        value={dueDate}
        onChange={(newDate) => setDueDate(newDate)}
        renderInput={(params) => <TextField {...params} fullWidth />}
    />
);

export default DueDatePicker;
