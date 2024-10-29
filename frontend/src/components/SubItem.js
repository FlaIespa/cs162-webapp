// src/components/SubItem.js
import React, { useState } from 'react';
import { Card, CardContent, IconButton, Box, Collapse } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import TaskStatusToggle from './TaskStatusToggle';

const SubItem = ({ subTask }) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const [isCompleted, setIsCompleted] = useState(false);

    const toggleExpand = () => setIsExpanded(!isExpanded);
    const toggleCompletion = () => setIsCompleted(!isCompleted);

    return (
        <Card variant="outlined" sx={{ marginBottom: 1, backgroundColor: isCompleted ? 'rgba(230, 230, 230, 0.6)' : 'rgba(245, 245, 245, 0.6)' }}>
            <CardContent>
                <Box display="flex" alignItems="center" justifyContent="space-between">
                    <TaskStatusToggle 
                        isChecked={isCompleted} 
                        onChange={toggleCompletion} 
                        label={subTask.name} 
                    />
                    <IconButton onClick={toggleExpand} size="small">
                        {isExpanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                    </IconButton>
                </Box>
                <Collapse in={isExpanded} timeout="auto" unmountOnExit>
                    <Box sx={{ paddingLeft: 2 }}>
                        {subTask.subItems && subTask.subItems.map((nestedSubTask, index) => (
                            <SubItem key={index} subTask={nestedSubTask} />
                        ))}
                    </Box>
                </Collapse>
            </CardContent>
        </Card>
    );
};

export default SubItem;
