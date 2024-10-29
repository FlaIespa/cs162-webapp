// src/components/DeleteConfirmationDialog.js
import React from 'react';
import { Dialog, DialogTitle, DialogActions, Button } from '@mui/material';

const DeleteConfirmationDialog = ({ open, onClose, onConfirm }) => (
    <Dialog open={open} onClose={onClose}>
        <DialogTitle>Are you sure you want to delete this task?</DialogTitle>
        <DialogActions>
            <Button onClick={onClose} color="secondary">No</Button>
            <Button onClick={onConfirm} color="primary">Yes</Button>
        </DialogActions>
    </Dialog>
);

export default DeleteConfirmationDialog;
