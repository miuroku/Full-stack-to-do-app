/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { useEffect } from 'react';
import { useParams } from 'react-router';
import { Redirect } from 'react-router';

import Task from './Task';
import { getAllTasksFromProjectListId } from '../../services/TasksList/TasksList';
import { useUser } from '../../store';

const TasksList = () => {

    const [tasks, setTasks] = useState([]);

    const {id} = useParams(); // Returns :id.

    const {user, setUser, token, setToken} = useUser();


    const refreshLocalTasksList = async () => {        
        try {                        
            const tasksList = await getAllTasksFromProjectListId(token, id);            
            console.log(`Our tasks list : ${JSON.stringify(tasksList.tasks, null, 4)}`);
            //setTasks(tasksList.tasks);
            console.log(`Tasks geted .`);
            
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
        <div>
            <div>
                <h2>Your tasks from "{}"</h2>
            </div>
            <div>
                { user !== null ? (
                    <>
                        <ul>
                            {tasks.map((task) => {
                                return (
                                    <li>Some task</li>
                                )
                            })}
                        </ul>
                    </>
                ) : (
                    <>
                        <Redirect to="/register" />
                    </>
                )}
            </div>
        </div>                                            
    )
}


export default TasksList;