import React from 'react'
import Project from './Project'



export default function ProjectsSection({projects}) {
    return (
        <div>
            <ul>
                {
                    projects.map((project, i) => {
                        return (
                            <li>
                                <Project title={project.title} _id={project._id} key={project._id} />
                            </li>
                        )
                    })
                }
            </ul>
        </div>
    )
}
