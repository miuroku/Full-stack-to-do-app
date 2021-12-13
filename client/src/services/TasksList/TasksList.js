

// Get all tasks from project list by id.
export const getAllTasksFromProjectListId = async (token, projectListId) => {

    const path = `http://localhost:8080/project-list/get-tasks-from-project-list/${projectListId}`;

    const fetchResult = await fetch(path, {
        method: "GET",
        //credentials: "include",
        headers: {                    
            "Authorization": `Bearer ${token}`,
            "Content-type": "application/json"
        }                                 
    });
                                    
    const result = await fetchResult.json();
    //console.log(`OUR ALL TASKS : ${JSON.stringify(result, null, 4)}`);
    return result;  
};



// Create one.
export const createTask = async (token, taskData, projectId) => {    

    const fetchResult = await fetch(`http://localhost:8080/task/create-one/${projectId}`, {
        method: "POST",
        credentials: "include",
        headers: {                    
            "Authorization": `Bearer ${token}`,
            "Content-type": "application/json"
        },
        body: JSON.stringify({task: taskData})                 
    });

    return fetchResult;
};


// Delete one.
export const deleteTask = async (token, id) => {    

    console.log(`Task to deelte id ${id}`);
    const fetchResult = await fetch(`http://localhost:8080/task/delete-one/${id}`, {
        method: "POST",
        credentials: "include",
        headers: {                    
            "Authorization": `Bearer ${token}`,
            "Content-type": "application/json"
        }        
    });

    return fetchResult;
};

// Update task.
export const updateTask = async (token, taskData) => {    

    const fetchResult = await fetch(`http://localhost:8080/task/update-one/${taskData._id}`, {
        method: "POST",
        credentials: "include",
        headers: {                    
            "Authorization": `Bearer ${token}`,
            "Content-type": "application/json"
        },
        body: JSON.stringify({task: taskData})                 
    });

    return fetchResult;
};


