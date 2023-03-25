import React from 'react'
import ProjectLists from './ProjectLists'
import TeamMembers from './TeamMembers'

export default function SideBar({ setProjectFilters }) {
    return (<div class="sidebar">
        <ProjectLists setProjectFilters={setProjectFilters} />
        <TeamMembers />
    </div>
    )
}
