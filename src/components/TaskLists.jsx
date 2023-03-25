import React from 'react'
import { useGetTasksQuery } from '../features/api/apiSlice';
import TaskItem from './TaskItem';

export default function TaskLists({ projectFilters, searchQuery }) {

    const { data, isLoading, isError, error, isSuccess } = useGetTasksQuery();

    let filteredData = data?.filter((task) => !projectFilters.includes(task.project.id));
    console.log(data, isLoading);
    let content = null;

    if (filteredData?.length > 0) {
        if (searchQuery && !isLoading && isSuccess) {
            filteredData = filteredData.filter((task) => task.taskName.toLowerCase().includes(searchQuery.trim().toLowerCase()));
        }
        content = filteredData.map((el) => <TaskItem key={el.id} task={el} />);
    }
    return (
        <div class="lws-task-list">
            {content}
        </div>
    )
}
