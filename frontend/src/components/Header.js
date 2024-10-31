// src/components/Header.js
import React from 'react';
import { Box, Typography, IconButton } from '@mui/material';
import HiveIcon from '@mui/icons-material/Hive';
import '../App.css'; // Ensure global styles are imported here

const Header = () => {
    return (
        <Box 
            component="header" 
            sx={{ 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'space-between',
                padding: '1rem 2rem', 
                background: 'linear-gradient(135deg, #00bfa5, #009688)', // Apply gradient
                color: '#ffffff',
                boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)'
            }}
        >
            <Box display="flex" alignItems="center">
                <IconButton edge="start" sx={{ color: '#ffffff' }}>
                    <HiveIcon fontSize="large" />
                </IconButton>
                <Typography 
                    variant="h4" 
                    component="h1" 
                    sx={{ 
                        fontFamily: 'Poppins, sans-serif', 
                        fontWeight: 'bold', 
                        color: '#ffffff',
                        marginLeft: '0.5rem',
                        letterSpacing: '1px' // Added letter spacing for style
                    }}
                >
                    TaskHive
                </Typography>
            </Box>
            
            {/* Optional: Add additional icons or menu items on the right side if needed */}
        </Box>
    );
};

export default Header;
