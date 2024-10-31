// src/components/Footer.js
import React from 'react';
import { Box, Typography } from '@mui/material';
import '../App.css'; // Ensure global styles are imported here

const Footer = () => {
    return (
        <Box 
            component="footer" 
            sx={{ 
                background: 'linear-gradient(135deg, #00bfa5, #009688)', // Apply gradient background
                padding: '1rem 2rem', 
                display: 'flex', 
                justifyContent: 'center', 
                alignItems: 'center',
                color: '#ffffff',
                borderTop: '2px solid rgba(255, 255, 255, 0.1)', // Subtle top border
                fontSize: '0.875rem' // Slightly smaller text
            }}
        >
            <Typography 
                variant="body2" 
                sx={{
                    fontFamily: 'Roboto, sans-serif',
                    color: 'rgba(255, 255, 255, 0.9)', // Slightly brighter text color for readability
                    fontWeight: 500,
                    textAlign: 'center',
                    padding: '0.5rem',
                }}
            >
                © {new Date().getFullYear()} TaskHive. All rights reserved.
            </Typography>
        </Box>
    );
};

export default Footer;
