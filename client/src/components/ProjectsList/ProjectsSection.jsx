import React from 'react';
import Project from './Project';


export default function ProjectsSection({projects, removeProject}) {
    return (
        <div>
            <ul>
                {
                    projects.map((project, i) => {
                        return (
                            <li>
                                <Project project={project} title={project.title} _id={project._id} key={project._id} removeProject={removeProject} />
                            </li>
                        )
                    })
                }
            </ul>
        </div>
    )
}
