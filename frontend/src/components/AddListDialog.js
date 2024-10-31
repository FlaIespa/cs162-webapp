// src/components/AddListDialog.js
import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button, Select, MenuItem, Box, Typography } from '@mui/material';
import {
    Work as WorkIcon, 
    Home as HomeIcon, 
    School as SchoolIcon, 
    Star as StarIcon, 
    FitnessCenter as FitnessIcon, 
    LocalGroceryStore as ShoppingIcon, 
    Favorite as FavoriteIcon, 
    LocalLibrary as ReadingIcon, 
    Build as ProjectIcon,
    DirectionsCar as TravelIcon,
    Event as EventIcon,
    Restaurant as FoodIcon,
    MusicNote as MusicIcon,
    Brush as ArtIcon,
    LocalHospital as HealthIcon,
    Group as FamilyIcon,
    Pets as PetsIcon,
    Spa as WellnessIcon,
    CameraAlt as PhotographyIcon,
    BusinessCenter as BusinessIcon,
    BeachAccess as LeisureIcon,
    Code as CodingIcon,
    EmojiObjects as IdeasIcon,
    MonetizationOn as FinanceIcon
} from '@mui/icons-material';

const iconOptions = [
    { label: 'Work', icon: <WorkIcon /> },
    { label: 'Home', icon: <HomeIcon /> },
    { label: 'School', icon: <SchoolIcon /> },
    { label: 'Starred', icon: <StarIcon /> },
    { label: 'Fitness', icon: <FitnessIcon /> },
    { label: 'Shopping', icon: <ShoppingIcon /> },
    { label: 'Favorites', icon: <FavoriteIcon /> },
    { label: 'Reading', icon: <ReadingIcon /> },
    { label: 'Projects', icon: <ProjectIcon /> },
    { label: 'Travel', icon: <TravelIcon /> },
    { label: 'Events', icon: <EventIcon /> },
    { label: 'Food', icon: <FoodIcon /> },
    { label: 'Music', icon: <MusicIcon /> },
    { label: 'Art', icon: <ArtIcon /> },
    { label: 'Health', icon: <HealthIcon /> },
    { label: 'Family', icon: <FamilyIcon /> },
    { label: 'Pets', icon: <PetsIcon /> },
    { label: 'Wellness', icon: <WellnessIcon /> },
    { label: 'Photography', icon: <PhotographyIcon /> },
    { label: 'Business', icon: <BusinessIcon /> },
    { label: 'Leisure', icon: <LeisureIcon /> },
    { label: 'Coding', icon: <CodingIcon /> },
    { label: 'Ideas', icon: <IdeasIcon /> },
    { label: 'Finance', icon: <FinanceIcon /> }
];

const AddListDialog = ({ open, onClose, onSave }) => {
    const [listName, setListName] = useState('');
    const [selectedIcon, setSelectedIcon] = useState(iconOptions[0].icon); // Default icon

    const handleSave = () => {
        onSave({ name: listName, icon: selectedIcon });
        setListName(''); // Reset fields after saving
        setSelectedIcon(iconOptions[0].icon);
        onClose();
    };

    return (
        <Dialog
            open={open}
            onClose={onClose}
            maxWidth="sm"
            fullWidth
            PaperProps={{
                sx: {
                    padding: '2rem',
                    borderRadius: '16px',
                    boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.15)',
                },
            }}
        >
            <DialogTitle sx={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'var(--accent-color)', textAlign: 'center' }}>Add New List</DialogTitle>
            <DialogContent sx={{ padding: '1.5rem 0' }}>
                <TextField
                    label="List Name"
                    fullWidth
                    variant="outlined"
                    value={listName}
                    onChange={(e) => setListName(e.target.value)}
                    sx={{
                        marginBottom: '1.5rem',
                        '& .MuiOutlinedInput-root': {
                            borderRadius: '12px',
                        },
                    }}
                />
                <Typography variant="subtitle1" sx={{ marginBottom: '0.5rem', fontWeight: 'bold' }}>Select Icon</Typography>
                <Select
                    value={iconOptions.find(option => option.icon === selectedIcon)?.label || ''}
                    onChange={(e) => {
                        const selected = iconOptions.find(option => option.label === e.target.value);
                        setSelectedIcon(selected ? selected.icon : selectedIcon);
                    }}
                    fullWidth
                    variant="outlined"
                    sx={{
                        marginBottom: '1.5rem',
                        '& .MuiOutlinedInput-root': {
                            borderRadius: '12px',
                        },
                    }}
                >
                    {iconOptions.map((option) => (
                        <MenuItem key={option.label} value={option.label}>
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                {option.icon}
                                <Typography sx={{ marginLeft: '8px' }}>{option.label}</Typography>
                            </Box>
                        </MenuItem>
                    ))}
                </Select>
            </DialogContent>
            <DialogActions sx={{ justifyContent: 'center', paddingBottom: '1rem' }}>
                <Button onClick={onClose} sx={{ fontWeight: 'bold', color: 'var(--secondary-accent)' }}>Cancel</Button>
                <Button onClick={handleSave} disabled={!listName} sx={{ fontWeight: 'bold', color: 'var(--accent-color)' }}>
                    Add List
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default AddListDialog;
