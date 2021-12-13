

// Get all.
export const getProjectsList = async (token) => {        
    
    const fetchResult = await fetch('http://localhost:8080/project-list/get-all', {
        method: "GET",
        //credentials: "include",
        headers: {                    
            "Authorization": `Bearer ${token}`,
            "Content-type": "application/json"
        }                                 
    });
                                    
    const result = await fetchResult.json();
    return result.projectLists;  
};


// Create one.
export const createProjectList = async (token, projectListData) => {    

    const fetchResult = await fetch('http://localhost:8080/project-list/create-one', {
        method: "POST",
        credentials: "include",
        headers: {                    
            "Authorization": `Bearer ${token}`,
            "Content-type": "application/json"
        },
        body: JSON.stringify({projectList: projectListData})                 
    });

    return fetchResult;
};


// Delete one.
export const deleteProjectList = async (token, id) => {    

    const fetchResult = await fetch(`http://localhost:8080/project-list/delete-one/${id}`, {
        method: "POST",
        credentials: "include",
        headers: {                    
            "Authorization": `Bearer ${token}`,
            "Content-type": "application/json"
        }        
    });

    return fetchResult;
};