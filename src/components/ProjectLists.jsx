import React from 'react'
import { useGetProjectsQuery } from '../features/api/apiSlice';
import ProjectItem from './ProjectItem';

export default function ProjectLists({ setProjectFilters }) {
    const { data, isLoading, isError, error, isSuccess } = useGetProjectsQuery();
    console.log(data);
    let content = null;
    if (data?.length > 0) {
        content = data.map((el) => <ProjectItem key={el.id} project={el} setProjectFilters={setProjectFilters} />);
    }

    return (
        <div>
            <h3 class="text-xl font-bold">Projects</h3>
            <div class="mt-3 space-y-4">
                {content}
            </div>
        </div>
    )
}
