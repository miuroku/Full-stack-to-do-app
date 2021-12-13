/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useMemo, useState } from 'react';
import Project from './Project';
import ProjectForm from './ProjectForm';
import './ProjectsList.css';

import ProjectsSection from './ProjectsSection';
import { getProjectsList, createProjectList, deleteProjectList } from '../../services/ProjectsList/ProjectsList';
import { useUser } from '../../store';
import { Redirect } from 'react-router';

const ProjectsList = () => {

    const [projects, setProjects] = useState([]);        

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

    const makeNewProjectList = async (title, tag) => {

        //event.preventDefault();
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

    const deleteProject = async (our_project_id) => {
        try {
            console.log('inside delete project');            
            const fetchResult = await deleteProjectList(token, our_project_id);
            if (fetchResult.status === 200) {
                console.log(`Project deleted.`);

                // Solve 1.
                // Why it not re-renders component ? Ask someone.
                // const newProjectsList = projects;
                // for (let i = 0; i < newProjectsList.length; i++){
                //     if ((newProjectsList[i] as any)._id === our_project_id){
                //         delete newProjectsList[i];
                //         console.log('Project deleted locally.');
                //         break;
                //     }
                // }
                // setProjects(newProjectsList);

                // Solve 2.
                refreshLocalProjectsList();
            } else {
                throw new Error(`Unable to delete project, some error occured`);
            }
        } catch (e) {
            console.log(`Error : ${e}`);
        }
    };

    // Update projects List.
    useEffect(() => {
        refreshLocalProjectsList();
    }, []);    

    return (
        <div className="projects-list-container">
            {
                user !== null ? 
                (
                    <>
                        <div className="title-before-form">
                            <h2>Create new project list : </h2>
                        </div>

                        <div>
                            <ProjectForm addProject={makeNewProjectList} />
                        </div>

                        <div className="after-form-container">
                            <hr/>
                            <h2 className="list-of-projects-label">List of projects : </h2><br/>
                            <hr/>

                            <div>                                    
                                <ProjectsSection projects={projects} removeProject={deleteProject}/>                                                    
                            </div>         
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
