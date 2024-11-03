import React from 'react';
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';

const PrioritySelector = ({ priority, setPriority }) => {
    return (
        <FormControl fullWidth variant="outlined" margin="dense">
            <InputLabel>Priority</InputLabel>
            <Select
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
                label="Priority"
            >
                <MenuItem value="">
                    <em>None</em>
                </MenuItem>
                <MenuItem value="high">High</MenuItem>
                <MenuItem value="medium">Medium</MenuItem>
                <MenuItem value="low">Low</MenuItem>
            </Select>
        </FormControl>
    );
};

export default PrioritySelector;
