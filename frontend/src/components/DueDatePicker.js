import React from 'react';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { TextField } from '@mui/material';
import dayjs from 'dayjs';

const DueDatePicker = ({ dueDate, setDueDate }) => {
    const handleDateChange = (newDate) => {
        // Format the date to 'YYYY-MM-DDTHH:mm:ss' format
        const formattedDate = newDate ? dayjs(newDate).format('YYYY-MM-DDTHH:mm:ss') : null;
        setDueDate(formattedDate);
    };

    return (
        <DatePicker
            label="Due Date"
            value={dueDate ? dayjs(dueDate) : null} // Convert string date back to date object if needed
            onChange={handleDateChange}
            renderInput={(params) => (
                <TextField 
                    {...params} 
                    fullWidth 
                    variant="outlined"
                    sx={{
                        '& .MuiOutlinedInput-root': {
                            borderRadius: 'var(--border-radius)',
                            backgroundColor: 'var(--bg-color)',
                        },
                        '& .MuiInputLabel-root': {
                            color: 'var(--accent-color)',
                        },
                    }}
                />
            )}
        />
    );
};

export default DueDatePicker;
