import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Box, Typography, Stack } from '@mui/material';
import { Player } from '@lottiefiles/react-lottie-player';
import hiveAnimation from '../assets/hiveAnimation.json';

const WelcomePage = () => {
    const navigate = useNavigate();

    return (
        <Box
            sx={{
                position: 'relative',
                minHeight: '100vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'linear-gradient(135deg, #e0f7fa 0%, #e0f2f1 100%)',
                overflow: 'hidden',
            }}
        >
            {/* Background Gradient and Floating Shapes */}
            <Box
                sx={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    background: 'linear-gradient(135deg, rgba(255,255,255,0.5) 0%, rgba(255,255,255,0) 100%)',
                    zIndex: 1,
                }}
            />

            {/* Floating hexagons */}
            {[...Array(5)].map((_, i) => (
                <Box
                    key={i}
                    sx={{
                        position: 'absolute',
                        width: `${80 + i * 20}px`,
                        height: `${80 + i * 20}px`,
                        background: 'rgba(0, 150, 136, 0.1)',
                        clipPath: 'polygon(50% 0%, 93% 25%, 93% 75%, 50% 100%, 7% 75%, 7% 25%)',
                        top: `${Math.random() * 100}%`,
                        left: `${Math.random() * 100}%`,
                        animation: `float ${5 + i * 2}s ease-in-out infinite alternate`,
                        zIndex: 0,
                        opacity: 0.3,
                        '@keyframes float': {
                            '0%': { transform: `translate(0px, 0px)` },
                            '100%': { transform: `translate(${i % 2 === 0 ? '-' : ''}20px, ${i % 2 === 0 ? '-' : ''}20px)` },
                        },
                    }}
                />
            ))}

            {/* Frosted Glass Container */}
            <Box
                sx={{
                    zIndex: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '90%',
                    maxWidth: '600px',  
                    padding: '60px',  
                    borderRadius: '25px',
                    background: 'rgba(255, 255, 255, 0.8)',
                    backdropFilter: 'blur(15px)',
                    boxShadow: '0 12px 32px rgba(31, 38, 135, 0.37)',
                    border: '1px solid rgba(255, 255, 255, 0.18)',
                    transition: 'transform 0.3s ease',
                    '&:hover': {
                        transform: 'scale(1.02)',
                    },
                }}
            >
                <Typography
                    variant="h3"
                    component="h1"
                    fontWeight="bold"
                    mb={4}
                    sx={{
                        color: 'var(--accent-color)',
                        textAlign: 'center',
                        textShadow: '0px 4px 8px rgba(0, 150, 136, 0.3)',
                    }}
                >
                    Welcome to TaskHive
                </Typography>

                {/* Hive Animation */}
                <Player
                    autoplay
                    loop
                    src={hiveAnimation}
                    style={{
                        width: 220, 
                        height: 220,
                        marginBottom: 30,
                        transition: 'transform 0.5s ease-in-out',
                        '&:hover': {
                            transform: 'scale(1.2)',
                        },
                    }}
                />

                {/* Buttons */}
                <Stack direction="row" spacing={3}>
                    <Button
                        variant="contained"
                        onClick={() => navigate('/login')}
                        sx={{
                            backgroundColor: 'rgba(0, 150, 136, 0.7)',
                            color: '#fff',
                            fontSize: '1.2rem',
                            padding: '14px 32px', 
                            borderRadius: '12px',
                            fontWeight: 'bold',
                            boxShadow: '0px 4px 15px rgba(0, 128, 128, 0.3)',
                            backdropFilter: 'blur(8px)',
                            '&:hover': {
                                backgroundColor: 'rgba(0, 150, 136, 0.9)',
                                transform: 'scale(1.05)',
                            },
                        }}
                    >
                        Log In
                    </Button>
                    <Button
                        variant="outlined"
                        onClick={() => navigate('/signup')}
                        sx={{
                            color: 'var(--accent-color)',
                            borderColor: 'var(--accent-color)',
                            fontSize: '1.2rem',
                            padding: '14px 32px', 
                            borderRadius: '12px',
                            fontWeight: 'bold',
                            background: 'rgba(255, 255, 255, 0.2)',
                            backdropFilter: 'blur(8px)',
                            boxShadow: '0px 4px 15px rgba(0, 128, 128, 0.2)',
                            '&:hover': {
                                backgroundColor: 'rgba(0, 150, 136, 0.2)',
                                color: '#fff',
                                borderColor: 'rgba(0, 150, 136, 0.6)',
                                transform: 'scale(1.05)',
                            },
                        }}
                    >
                        Sign Up
                    </Button>
                </Stack>
            </Box>
        </Box>
    );
};

export default WelcomePage;
