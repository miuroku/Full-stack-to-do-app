import React from 'react'


export default function Task({task, removeTask, toggleTask}) {

    return (
        <>
            <div className="item-todo-container">                
                <div className="item-todo">
                    <div 
                        className={task.completed ? "item-text strike" : "item-text"}
                        onClick={()=> toggleTask(task)}>
                        {task.title}
                    </div>
                </div>                
                
                <button 
                    className="button-5"                     
                    onClick={() => removeTask(task._id)}>
                        X
                </button>                                    
            </div>
        </>
    )
}
