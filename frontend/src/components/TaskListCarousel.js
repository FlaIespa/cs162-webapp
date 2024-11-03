import React from 'react';
import TaskListCard from './TaskListCard';
import { Box } from '@mui/material';

const TaskListCarousel = ({ taskLists, onCardClick, onDelete }) => {
    return (
        <Box
            sx={{
                display: 'flex',
                overflowX: 'auto',
                gap: '1.0rem',           
                padding: '1rem',
                alignItems: 'center',
                '&::-webkit-scrollbar': {
                    height: '8px',
                },
                '&::-webkit-scrollbar-thumb': {
                    backgroundColor: '#ccc',
                    borderRadius: '4px',
                },
            }}
        >
            {taskLists.map((list) => (
                <Box
                    key={list.id}
                    sx={{
                        minWidth: '250px',
                        maxWidth: '350px',
                        flexShrink: 0,
                        display: 'flex', 
                    }}
                >
                    <TaskListCard 
                        listName={list.name} 
                        icon={list.icon} 
                        onClick={() => onCardClick(list.id)} 
                        onDelete={() => onDelete(list.id)} 
                    />
                </Box>
            ))}
        </Box>
    );
};

export default TaskListCarousel;
