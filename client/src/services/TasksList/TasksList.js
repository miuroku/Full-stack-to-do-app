

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
    return result;  
};