/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react'
import { useState } from 'react'

export default function ProjectForm({addProject}) {
        
    const [title, setTitle] = useState('');
    const [tag, setTag] = useState('');    

    const handleTitleChange = (event) => {
        setTitle(event.target.value);        
    };

    const handleTagChange = (event) => {
        const ourTag = "Common";
        const tagFromInput = event.target.value;
        setTag(ourTag);        
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        await addProject(title, tag);
    };

    const handleKeyPressHandler = (e) => {
        if (e.key === "Enter") {
            handleSubmit(e);
        }
    };

    return (
        <div>
            {/* <form onSubmit={makeNewProjectList}> */}
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
                <p className="input-label">Tag:   </p> 
                    <input 
                        type="text" 
                        name="tag" 
                        value={tag} 
                        onChange={handleTagChange} 
                        required 
                        placeholder="Введите значение ..."/><br/>
                <br/>
                <button type="submit">Create new project list</button>
            </form>
        </div>
    )
}
