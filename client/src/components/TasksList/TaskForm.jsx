import React from 'react'
import { useState } from 'react';

export default function TaskForm({addTask}) {

    const [title, setTitle] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        await addTask(title);
    };

    const handleTitleChange = (event) => {
        setTitle(event.target.value);        
    };

    const handleKeyPressHandler = (e) => {
        if (e.key === "Enter") {
            handleSubmit(e);
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <p className="input-label">Title: </p>
                    <input 
                        type="text" 
                        name="title" 
                        value={title} 
                        onChange={handleTitleChange} 
                        onKeyDown={handleKeyPressHandler}
                        required 
                        placeholder="Введите значение ..."/><br/>                                
                <button type="submit">Create new task</button>
            </form>
        </div>
    )
}
