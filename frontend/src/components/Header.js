import React from 'react';
import { Box, Typography, IconButton } from '@mui/material';
import HiveIcon from '@mui/icons-material/Hive';
import '../App.css'; 

const Header = () => {
    return (
        <Box 
            component="header" 
            sx={{ 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'space-between',
                padding: '1rem 2rem', 
                background: 'linear-gradient(135deg, #00bfa5, #009688)',
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
                        letterSpacing: '1px' 
                    }}
                >
                    TaskHive
                </Typography>
            </Box>            
        </Box>
    );
};

export default Header;
