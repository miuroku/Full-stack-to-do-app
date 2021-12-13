/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { useEffect } from 'react';
import { useParams } from 'react-router';
import { Redirect } from 'react-router';

import './../ProjectsList/ProjectsList.css';

import Task from './Task';
import TaskForm from './TaskForm';
import { getAllTasksFromProjectListId, createTask, deleteTask, updateTask } from '../../services/TasksList/TasksList';
import { useUser } from '../../store';

const TasksList = () => {

    const [tasks, setTasks] = useState([]);
    const [project, setProject] = useState();

    const {id} = useParams(); // Returns :id.

    const {user, setUser, token, setToken} = useUser();


    const refreshLocalTasksList = async () => {        
        try {                        
            const tasksList = await getAllTasksFromProjectListId(token, id);            
            //console.log(`Our tasks list : ${JSON.stringify(tasksList, null, 4)}`);
            setTasks(tasksList.tasks);
            setProject(tasksList.projectList);
            console.log(`Tasks geted .`);
            //console.log(`Tasks like : ${JSON.stringify(tasksList.tasks, null, 4)}`);
            //console.log(`Project list : ${JSON.stringify(tasksList.projectList)}`);
            
        } catch (e) {
            console.log(`Error : ${e}`);
        }
    };

    const addTask = async (title) => {
        try {
            const taskData = {
                title: title
            };

            const fetchResult = await createTask(token, taskData, project._id);

            if (fetchResult.status === 201 || fetchResult.status === 200){
                const result = await fetchResult.json();
                
                console.log(`Task created @@@@`);
                console.log(`Our task : ${JSON.stringify(result, null, 4)}`);

                setTasks((prevState) => [...prevState, result]);
                refreshLocalTasksList();
            } else {
                throw new Error(`Task not created, fetch returns with status : ${fetchResult.status}`);
            }

        } catch (e) {
            console.log(`Error : ${e}`);
        }
    };

    const removeTask = async (taskId) => {
        try {
            console.log('inside delete task');            
            const fetchResult = await deleteTask(token, taskId);
            if (fetchResult.status === 200) {
                console.log(`Task deleted.`);                

                // Solve 2.
                refreshLocalTasksList();
            } else {
                throw new Error(`Unable to delete task, fetchresult returned with status ${fetchResult.status}`);
            }
        } catch (e) {
            console.log(`Error : ${e}`);
        }
    };

    const handleToggle = async (task) => {
        try {
            const taskData = {
                _id: task._id,
                title: task.title,
                completed: !task.completed
            };
            console.log('inside toggle task');            
            const fetchResult = await updateTask(token, taskData);
            if (fetchResult.status === 200) {
                console.log(`Task toggled.`);                

                // Solve 2.
                refreshLocalTasksList();
            } else {
                throw new Error(`Unable to delete task, fetchresult returned with status ${fetchResult.status}`);
            }
        } catch (e) {
            console.log(`Error : ${e}`);
        }
    };

    // Update tasks list.
    useEffect(() => {
        console.log(`Our id : ${id}`);
        refreshLocalTasksList();
    }, []);

    return (
        <div className="projects-list-container">                        
            { user !== null ? (
                <>
                    <div className="title-before-form">
                        <h1>Project : {project?.title} | tag : {project?.tag}</h1> <br/>
                        <h2>Create new task : </h2>
                    </div>

                    <div>
                        <TaskForm addTask={addTask} />
                    </div>

                    <div className="after-form-container">
                        <ul>
                            {tasks.map((task) => {
                                return (
                                    <li>
                                        <Task 
                                            task={task} 
                                            key={task._id} 
                                            removeTask={removeTask} 
                                            toggleTask={handleToggle}/>
                                    </li>
                                )
                            })}
                        </ul>
                    </div>
                </>
            ) : (
                <>
                    <Redirect to="/login" />
                </>
            )}            
        </div>                                            
    )
}


export default TasksList;