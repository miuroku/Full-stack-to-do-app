import React from 'react'

const Project = ({title, _id}) => {

    const our_href = `/tasks-list/${_id}`;

    return (
        <>
            <a href={our_href}>
                <div style={styles.projectStyle}>
                    <h3>{title}</h3>
                </div>
            </a>
        </>
    )
}

const styles = {
    projectStyle: {
        backgroundColor: "red",
    }
}

export default Project;