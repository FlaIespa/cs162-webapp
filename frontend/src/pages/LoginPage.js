// src/pages/LoginPage.js
import React, { useState } from 'react';
import { Box, TextField, Typography, Button, Link } from '@mui/material';
import '../App.css'; // Import global styles

const LoginPage = ({ onLogin }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = () => {
        // Placeholder function to handle login; replace with actual login logic
        onLogin(email, password);
    };

    return (
        <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            minHeight="100vh"
            sx={{ backgroundColor: 'var(--bg-color)', padding: 4 }}
        >
            <Typography
                variant="h4"
                sx={{ marginBottom: 4, color: 'var(--accent-color)', fontFamily: 'var(--font-family-alt)' }}
            >
                TaskHive
            </Typography>

            <Box
                component="form"
                onSubmit={(e) => { e.preventDefault(); handleLogin(); }}
                sx={{
                    width: '100%',
                    maxWidth: 400,
                    padding: 4,
                    borderRadius: 'var(--border-radius)',
                    boxShadow: 'var(--shadow)',
                    backgroundColor: '#ffffff',
                }}
            >
                <TextField
                    label="Email"
                    type="email"
                    fullWidth
                    variant="outlined"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    sx={{
                        marginBottom: 3,
                        '& .MuiOutlinedInput-root': {
                            borderRadius: 'var(--border-radius)',
                        },
                        '& .MuiInputLabel-root': {
                            color: 'var(--accent-color)',
                        },
                    }}
                />

                <TextField
                    label="Password"
                    type="password"
                    fullWidth
                    variant="outlined"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    sx={{
                        marginBottom: 2,
                        '& .MuiOutlinedInput-root': {
                            borderRadius: 'var(--border-radius)',
                        },
                        '& .MuiInputLabel-root': {
                            color: 'var(--accent-color)',
                        },
                    }}
                />

                <Link href="#" underline="none" sx={{ display: 'block', textAlign: 'right', color: 'var(--secondary-accent)', fontSize: '0.9rem', marginBottom: 3 }}>
                    Forgot Password?
                </Link>

                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{
                        backgroundColor: 'var(--accent-color)',
                        color: '#ffffff',
                        fontWeight: 'bold',
                        padding: 1.2,
                        borderRadius: 'var(--border-radius)',
                        '&:hover': {
                            backgroundColor: 'var(--button-hover-color)',
                        },
                    }}
                >
                    Login
                </Button>

                <Typography variant="body2" sx={{ textAlign: 'center', marginTop: 2 }}>
                    Don’t have an account?{' '}
                    <Link href="/signup" sx={{ color: 'var(--secondary-accent)', fontWeight: 'bold' }}>
                        Sign up
                    </Link>
                </Typography>
            </Box>
        </Box>
    );
};

export default LoginPage;
