import React, { useState } from 'react';
import { Box, TextField, Button, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import '../App.css';

const SignUpPage = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }
        setError('');

        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/auth/signup`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, email, password }),
            });

            if (response.ok) {
                setSuccessMessage('Account created successfully!');
                setTimeout(() => navigate('/login'), 2000);
            } else {
                const data = await response.json();
                setError(data.msg || 'An error occurred');
            }
        } catch (error) {
            setError('An error occurred');
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
                component="form"
                onSubmit={handleSubmit}
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
                    Sign Up
                </Typography>

                {error && (
                    <Typography color="error" textAlign="center" marginBottom="1rem">
                        {error}
                    </Typography>
                )}
                {successMessage && (
                    <Typography color="primary" textAlign="center" marginBottom="1rem">
                        {successMessage}
                    </Typography>
                )}

                <TextField
                    label="Name"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
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
                    label="Email"
                    type="email"
                    variant="outlined"
                    fullWidth
                    margin="normal"
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
                    variant="outlined"
                    fullWidth
                    margin="normal"
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

                <TextField
                    label="Confirm Password"
                    type="password"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
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

                <Button
                    type="submit"
                    variant="contained"
                    fullWidth
                    sx={{
                        marginTop: '1.5rem',
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
                    Sign Up
                </Button>
            </Box>
        </Box>
    );
};

export default SignUpPage;
