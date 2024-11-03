import React from 'react';
import { TextField, InputAdornment } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

const SearchBar = ({ onSearch }) => {
    return (
        <TextField
            fullWidth
            placeholder="Search tasks"
            onChange={(e) => onSearch(e.target.value)}
            InputProps={{
                startAdornment: (
                    <InputAdornment position="start">
                        <SearchIcon />
                    </InputAdornment>
                ),
            }}
            sx={{ marginBottom: 2 }}
        />
    );
};

export default SearchBar;
