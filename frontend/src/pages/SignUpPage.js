// src/pages/SignUpPage.js
import React, { useState } from 'react';
import { Box, TextField, Button, Typography } from '@mui/material';
import '../App.css'; // Import global styles

const SignUpPage = ({ onSignUp }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }
        setError('');
        onSignUp({ name, email, password });
    };

    return (
        <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            minHeight="100vh"
            bgcolor="var(--bg-color)"
        >
            <Box
                component="form"
                onSubmit={handleSubmit}
                sx={{
                    width: '100%',
                    maxWidth: 400,
                    padding: '2rem',
                    borderRadius: 'var(--border-radius)',
                    backgroundColor: '#ffffff',
                    boxShadow: 'var(--shadow)',
                }}
            >
                <Typography
                    variant="h4"
                    component="h1"
                    textAlign="center"
                    gutterBottom
                    color="var(--accent-color)"
                >
                    Sign Up
                </Typography>
                {error && (
                    <Typography color="error" textAlign="center" marginBottom="1rem">
                        {error}
                    </Typography>
                )}
                <TextField
                    label="Name"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <TextField
                    label="Email"
                    type="email"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <TextField
                    label="Password"
                    type="password"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <TextField
                    label="Confirm Password"
                    type="password"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                />
                <Button
                    type="submit"
                    variant="contained"
                    fullWidth
                    sx={{
                        marginTop: '1.5rem',
                        backgroundColor: 'var(--accent-color)',
                        color: '#ffffff',
                        '&:hover': {
                            backgroundColor: 'var(--button-hover)',
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
