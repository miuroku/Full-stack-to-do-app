import React from 'react';
import './ProjectsList.css';

const Project = ({project, title, _id, removeProject}) => {

    const our_href = `/tasks-list/${_id}`;

    return (
        <>
            <div className="item-todo-container">
                <a href={our_href} className="href-for-todo">
                    <div className="item-todo">
                        <div className="item-text">
                            {project.title}
                        </div>
                    </div>
                </a>
                
                <button 
                    className="button-5"                     
                    onClick={() => removeProject(project._id)}>
                        X
                </button>                                    
            </div>
        </>
    )
}

// const styles = {
//     projectStyle: {
//         backgroundColor: "red",
//     }
// }

export default Project;