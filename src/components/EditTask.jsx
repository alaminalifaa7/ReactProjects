import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { useEditTaskMutation, useGetProjectsQuery, useGetTaskByIdQuery } from '../features/api/apiSlice';
import { useGetTeamsQuery } from '../features/api/apiSlice';
import { useAddTaskMutation } from '../features/api/apiSlice';
import { useParams } from 'react-router-dom';

export default function EditTask() {
    const { taskId } = useParams();
    const { data: task } = useGetTaskByIdQuery(taskId, {
        refetchOnMountOrArgChange: true
    });

    console.log(task);

    const [deadline, setDeadline] = useState('');
    const [taskName, setTaskname] = useState('');

    useEffect(() => {
        if (task) {
            setDeadline(task.deadline);
            setTaskname(task.taskName);
        }
    }, [task]);
    const { data, isLoading, isError, error, isSuccess } = useGetProjectsQuery();

    const { data: dataTeams, isLoading: isLoadingTeams, isError: isErrorTeams, error: errorTeams, isSuccess: isSuccessTeams } = useGetTeamsQuery();
    const [editTask, { isLoading: isSavingTask }] = useEditTaskMutation();


    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const projectId = parseInt(e.target.projectName.value);
        const teamMemberId = parseInt(e.target.teamMember.value);

        const project = data?.find(p => p.id === projectId);
        const teamMember = dataTeams?.find(t => t.id === teamMemberId);
        const updatedTask = {
            taskName,
            deadline,
            project,
            teamMember,
        };
        try {
            await editTask({ taskId, updatedTask });
            navigate("/");
            // Handle successful task creation here
        } catch (err) {
            // Handle task creation error here
        }
    };

    return (<>
        <h1 class="mt-4 mb-8 text-3xl font-bold text-center text-gray-800">
            Edit Task for Your Team
        </h1>

        <div class="justify-center mb-10 space-y-2 md:flex md:space-y-0">
            <form class="space-y-6" onSubmit={handleSubmit}>
                <div class="fieldContainer">
                    <label for="lws-taskName">Task Name</label>
                    <input
                        type="text"
                        name="taskName"
                        id="lws-taskName"
                        required
                        placeholder="Implement RTK Query"
                        value={taskName}
                        onChange={(e) => {
                            // handle input change here
                            e.preventDefault();
                            setTaskname(e.target.value); // get the new value from the input
                            // do something with the new deadline value, e.g. update the task object
                        }}
                    />
                </div>

                <div class="fieldContainer">
                    <label>Assign To</label>
                    <select name="teamMember" id="lws-teamMember" required>
                        {dataTeams?.map((teamMember) => (
                            <option key={teamMember.id} value={teamMember.id} selected={task?.teamMember.id === teamMember.id}>
                                {teamMember.name}
                            </option>
                        ))}
                    </select>
                </div>
                <div class="fieldContainer">
                    <label for="lws-projectName">Project Name</label>
                    <select id="lws-projectName" name="projectName" required>
                        <option value="" hidden selected>Select Project</option>
                        {data?.map((project) => (
                            <option key={project.id} value={project.id} selected={task?.project.id === project.id}>
                                {project.projectName}
                            </option>
                        ))}
                    </select>
                </div>

                <div class="fieldContainer">
                    <label for="lws-deadline">Deadline</label>
                    <input type="date" name="deadline" id="lws-deadline" required value={deadline || ''} // set the input value to task deadline or empty string if it's not defined
                        onChange={(e) => {
                            // handle input change here
                            e.preventDefault();
                            setDeadline(e.target.value); // get the new value from the input
                            // do something with the new deadline value, e.g. update the task object
                        }} />
                </div>

                <div class="text-right">
                    <button type="submit" class="lws-submit" disabled={isSavingTask}>  {isSavingTask ? 'Saving...' : 'Save'}</button>
                </div>
            </form>
        </div>
    </>
    )
}
