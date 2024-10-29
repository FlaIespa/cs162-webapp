// src/components/ProgressIndicator.js
import React from 'react';
import { LinearProgress, Typography, Box } from '@mui/material';

const ProgressIndicator = ({ completedCount, totalCount }) => {
    const progress = totalCount > 0 ? (completedCount / totalCount) * 100 : 0;

    return (
        <Box display="flex" alignItems="center" sx={{ marginBottom: 2 }}>
            <Box width="100%" mr={1}>
                <LinearProgress variant="determinate" value={progress} />
            </Box>
            <Box minWidth={35}>
                <Typography variant="body2" color="text.secondary">{`${Math.round(progress)}%`}</Typography>
            </Box>
        </Box>
    );
};

export default ProgressIndicator;
