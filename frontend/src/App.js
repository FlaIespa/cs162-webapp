// src/App.js
import React from 'react';
import TodoList from './components/TodoList';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

function App() {
    // Expanded sample data for testing
    const sampleTasks = [
        {
            name: "Task 1",
            subItems: [
                {
                    name: "Subtask 1.1",
                    subItems: [
                        { name: "Sub-subtask 1.1.1" },
                        { name: "Sub-subtask 1.1.2" }
                    ]
                },
                {
                    name: "Subtask 1.2",
                    subItems: [
                        { name: "Sub-subtask 1.2.1" },
                        { name: "Sub-subtask 1.2.2" }
                    ]
                }
            ]
        },
        {
            name: "Task 2",
            subItems: [
                {
                    name: "Subtask 2.1",
                    subItems: [
                        { name: "Sub-subtask 2.1.1" },
                        { name: "Sub-subtask 2.1.2" }
                    ]
                },
                {
                    name: "Subtask 2.2",
                    subItems: [
                        { name: "Sub-subtask 2.2.1" },
                        { name: "Sub-subtask 2.2.2" }
                    ]
                }
            ]
        }
    ];

    return (
        <LocalizationProvider dateAdapter={AdapterDateFns}>
            <div className="App">
                <TodoList tasks={sampleTasks} />
            </div>
        </LocalizationProvider>
    );
}

export default App;
