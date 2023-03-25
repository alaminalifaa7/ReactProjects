import React from 'react'
import { useState } from 'react';

export default function ProjectItem({ project, setProjectFilters }) {
    const { colorClass, projectName, id } = project;
    const [isChecked, setIsChecked] = useState(true);
    function handleCheckboxChange(projectId) {
        setIsChecked(!isChecked);
        setProjectFilters((prevFilters) => {
            if (prevFilters.includes(projectId)) {
                return prevFilters.filter((filter) => filter !== projectId);
            } else {
                return [...prevFilters, projectId];
            }
        });
    }

    return (
        <div class="checkbox-container">
            <input type="checkbox" class={colorClass} checked={isChecked} onChange={() => handleCheckboxChange(id)} />
            <p class="label">{projectName}</p>
        </div>
    )
}
