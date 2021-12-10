/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useMemo, useState } from 'react';
import Project from './Project';

import ProjectsSection from './ProjectsSection';
import { getProjectsList, createProjectList } from '../../services/ProjectsList/ProjectsList';
import { useUser } from '../../store';
import { Redirect } from 'react-router';

import {Paper, TextField} from '@material-ui/core'
import { Checkbox, Button } from '@material-ui/core';

const ProjectsList = () => {

    const [projects, setProjects] = useState([]);
    const [title, setTitle] = useState('');
    const [tag, setTag] = useState('');        

    const {user, setUser, token, setToken} = useUser();


    const refreshLocalProjectsList = async () => {        
        try {                        
            const projectsList = await getProjectsList(token);
            setProjects(projectsList);
            console.log(`Projects geted .`);
            
        } catch (e) {
            console.log(`Error : ${e}`);
        }
    };

    const makeNewProjectList = async (event) => {

        event.preventDefault();
        try {            
            const projectListData = {
                title: title,
                tag: tag
            };

            const fetchResult = await createProjectList(token, projectListData);
                               
            if (fetchResult.status === 201){
                const result = await fetchResult.json();
                
                console.log(`Project created @@@@`);
                console.log(`Our project : ${JSON.stringify(result, null, 4)}`);

                setProjects((prevState) => [...prevState, (result as never)]);
            } else {
                throw new Error(`Project not created, fetch returns with status : ${fetchResult.status}`);
            }

        } catch (e) {
            console.log(`Error : ${e}`);
        }
    };

    const handleTitleChange = (event) => {
        setTitle(event.target.value);        
    };

    const handleTagChange = (event) => {
        const ourTag = "Common";
        const tagFromInput = event.target.value;
        setTag(ourTag);        
    };

    // Update projects List.
    useEffect(() => {
        refreshLocalProjectsList();
    }, []);    

    return (
        <div>
            {
                user !== null ? 
                (
                    <>
                        <h2>Create new project list : </h2>

                        <form onSubmit={makeNewProjectList}>
                                Title: <input type="text" name="title" value={title} onChange={handleTitleChange} required/><br/>
                                Tag: <input type="text" name="tag" value={tag} onChange={handleTagChange} required/><br/>
                            <button type="submit">Create new project list</button>
                        </form>            
                        <h2>List of projects : </h2><br/>
                        <hr/>

                        <div>                                    
                            <ProjectsSection projects={projects} />                                                    
                        </div>         
                    </>
                ) :
                (
                    <Redirect to="/register" />
                )
            }

        </div>
    )
}

/* 
const styles = {
    hr: { 
        display: "block",
        margin-top: '0.5em',
        margin-bottom: '0.5em',
        margin-left: 'auto',
        margin-right: 'auto',
        border-style: 'inset',
        border-width: '5px'
      }
} */

export default ProjectsList
