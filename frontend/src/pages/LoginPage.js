// src/pages/LoginPage.js
import React, { useState } from 'react';
import { Box, TextField, Typography, Button, Link } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import '../App.css';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/auth/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            });

            if (response.ok) {
                const data = await response.json();
                localStorage.setItem('token', data.access_token);
                setError('');
                navigate('/home'); // Redirect to /home after successful login
            } else {
                const data = await response.json();
                setError(data.msg || 'Invalid email or password');
            }
        } catch (error) {
            setError('An error occurred while logging in.');
        }
    };

    return (
        <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            minHeight="100vh"
            sx={{
                background: 'linear-gradient(135deg, #e0f7fa 0%, #e0f2f1 100%)',
                padding: 4,
                position: 'relative',
                overflow: 'hidden',
            }}
        >
            {/* Frosted Glass Container */}
            <Box
                sx={{
                    zIndex: 2,
                    width: '90%',
                    maxWidth: 500,
                    padding: '40px',
                    borderRadius: '25px',
                    background: 'rgba(255, 255, 255, 0.8)',
                    backdropFilter: 'blur(15px)',
                    boxShadow: '0 12px 32px rgba(31, 38, 135, 0.37)',
                    border: '1px solid rgba(255, 255, 255, 0.18)',
                    textAlign: 'center',
                }}
            >
                <Typography
                    variant="h4"
                    component="h1"
                    sx={{
                        marginBottom: 3,
                        color: 'var(--accent-color)',
                        fontFamily: 'var(--font-family-alt)',
                        textShadow: '0px 4px 8px rgba(0, 150, 136, 0.3)',
                    }}
                >
                    TaskHive
                </Typography>

                <Box
                    component="form"
                    onSubmit={(e) => { e.preventDefault(); handleLogin(); }}
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 3,
                        width: '100%',
                    }}
                >
                    {error && (
                        <Typography color="error" textAlign="center" marginBottom="1rem">
                            {error}
                        </Typography>
                    )}

                    <TextField
                        label="Email"
                        type="email"
                        fullWidth
                        variant="outlined"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        sx={{
                            '& .MuiOutlinedInput-root': {
                                borderRadius: 'var(--border-radius)',
                                backgroundColor: '#ffffff',
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
                            '& .MuiOutlinedInput-root': {
                                borderRadius: 'var(--border-radius)',
                                backgroundColor: '#ffffff',
                            },
                            '& .MuiInputLabel-root': {
                                color: 'var(--accent-color)',
                            },
                        }}
                    />

                    <Link href="#" underline="none" sx={{ textAlign: 'right', color: 'var(--secondary-accent)', fontSize: '0.9rem' }}>
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
                            padding: '14px',
                            borderRadius: '12px',
                            fontSize: '1.1rem',
                            boxShadow: '0px 4px 15px rgba(0, 128, 128, 0.3)',
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
        </Box>
    );
};

export default LoginPage;
