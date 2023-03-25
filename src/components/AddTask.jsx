import React from 'react'
import { useNavigate } from 'react-router-dom';
import { useGetProjectsQuery } from '../features/api/apiSlice';
import { useGetTeamsQuery } from '../features/api/apiSlice';
import { useAddTaskMutation } from '../features/api/apiSlice';

export default function AddTask() {
    const { data, isLoading, isError, error, isSuccess } = useGetProjectsQuery();

    const { data: dataTeams, isLoading: isLoadingTeams, isError: isErrorTeams, error: errorTeams, isSuccess: isSuccessTeams } = useGetTeamsQuery();
    const [addTask, { isLoading: isSavingTask }] = useAddTaskMutation();

    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        const taskName = e.target.taskName.value;
        const deadline = e.target.deadline.value;
        const projectId = parseInt(e.target.projectName.value);
        const teamMemberId = parseInt(e.target.teamMember.value);

        const project = data?.find(p => p.id === projectId);
        const teamMember = dataTeams?.find(t => t.id === teamMemberId);

        try {
            await addTask({
                taskName,
                deadline,
                project,
                teamMember,
            });
            navigate("/");
            // Handle successful task creation here
        } catch (err) {
            // Handle task creation error here
        }
    };

    return (<>
        <h1 class="mt-4 mb-8 text-3xl font-bold text-center text-gray-800">
            Create Task for Your Team
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
                    />
                </div>

                <div class="fieldContainer">
                    <label>Assign To</label>
                    <select name="teamMember" id="lws-teamMember" required>
                        <option value="" hidden selected>Select Member</option>
                        {dataTeams?.map((teamMember) => (
                            <option key={teamMember.id} value={teamMember.id}>
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
                            <option key={project.id} value={project.id}>
                                {project.projectName}
                            </option>
                        ))}
                    </select>
                </div>

                <div class="fieldContainer">
                    <label for="lws-deadline">Deadline</label>
                    <input type="date" name="deadline" id="lws-deadline" required />
                </div>

                <div class="text-right">
                    <button type="submit" class="lws-submit" disabled={isSavingTask}>  {isSavingTask ? 'Adding...' : 'Add'}</button>
                </div>
            </form>
        </div>
    </>
    )
}
