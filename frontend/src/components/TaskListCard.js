import React from 'react';
import { Card, CardContent, Typography, IconButton, Box } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

const TaskListCard = ({ listName, icon, onClick, onDelete, description }) => {
    return (
        <Card
            variant="outlined"
            sx={{
                padding: 2,
                margin: 2,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                width: '300px',
                boxShadow: 'var(--shadow)',
                borderRadius: '16px',
                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                '&:hover': {
                    transform: 'translateY(-5px)',
                    boxShadow: '0px 6px 18px rgba(0, 0, 0, 0.2)',
                },
            }}
            onClick={onClick}
        >
            <CardContent sx={{ display: 'flex', alignItems: 'center', padding: '8px' }}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Box sx={{ color: 'var(--accent-color)', marginRight: 1 }}>{icon}</Box>
                    <Typography variant="h6" sx={{ fontFamily: 'var(--font-family-alt)', color: 'var(--text-color)' }}>
                        {listName}
                    </Typography>
                </Box>
                {description && (
                    <Typography variant="body2" sx={{ color: 'var(--secondary-text-color)', marginTop: '4px' }}>
                        {description}
                    </Typography>
                )}
            </CardContent>
            <IconButton
                aria-label="delete"
                size="small"
                onClick={(e) => {
                    e.stopPropagation(); 
                    onDelete();
                }}
                sx={{
                    color: 'var(--secondary-accent)',
                    '&:hover': {
                        color: 'var(--button-hover)',
                    },
                }}
            >
                <DeleteIcon />
            </IconButton>
        </Card>
    );
};

export default TaskListCard;
