import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { useDispatch } from "react-redux";

// const dispatch = useDispatch();

export const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:9000/',
    }),
    tagTypes: ["projectsTag", "teamTag", "taskTag"],
    endpoints: (builder) => ({
        getProjects: builder.query({
            query: () => '/projects',
            providesTags: ["projectsTag"]
        }),
        getTeams: builder.query({
            query: () => '/team',
            providesTags: ["teamTag"]
        }),
        getTasks: builder.query({
            query: () => '/tasks',
            providesTags: ["taskTag"]
        }),
        addTask: builder.mutation({
            query: (task) => ({
                url: `/tasks`,
                method: 'POST',
                body: task,
            }),
            async onQueryStarted(arg, { queryFulfilled, dispatch }) {
                console.log("Inside add Task query ....", arg);

                try {
                    const response = await queryFulfilled;
                    console.log(response);
                    dispatch(
                        apiSlice.util.updateQueryData("getTasks", undefined,
                            (draft) => {
                                draft.push(response.data);
                                console.log(JSON.stringify(draft));
                                return draft;
                            }
                        )
                    );

                } catch {

                }
            },
        }),
        editTask: builder.mutation({
            query: ({ taskId, updatedTask }) => ({
                url: `/tasks/${taskId}`,
                method: 'PUT',
                body: updatedTask,
            }),
            async onQueryStarted(arg, { queryFulfilled, dispatch }) {
                console.log("Inside edit Task query ....", arg);

                try {
                    const response = await queryFulfilled;
                    console.log(response);
                    dispatch(
                        apiSlice.util.updateQueryData("getTasks", undefined,
                            (draft) => {
                                draft.push(response.data);
                                console.log(JSON.stringify(draft));
                                return draft;
                            }
                        )
                    );

                } catch {

                }
            },
        }),
        getTaskById: builder.query({
            query: (id) => `/tasks/${id}`,

        }),
        updateTaskStatus: builder.mutation({
            query: ({ taskId, newStatus }) => ({
                url: `/tasks/${taskId}`,
                method: 'PATCH',
                body: { status: newStatus },
            }),
            invalidatesTags: ['taskTag'],
        }),
        deleteTask: builder.mutation({
            query: (taskId) => ({
                url: `/tasks/${taskId}`,
                method: 'DELETE',
            }),
            async onQueryStarted(arg, { queryFulfilled, dispatch }) {
                console.log("Inside on query ....", arg);

                const patchResult = dispatch(
                    apiSlice.util.updateQueryData("getTasks", undefined,
                        (draft) => {
                            draft = draft.filter((task) => parseInt(task.id) !== arg);
                            console.log(JSON.stringify(draft));
                            return draft;
                        }
                    )
                );
                try {
                    const response = await queryFulfilled;
                    console.log(response);
                } catch {
                    patchResult.undo();
                }
            },
        }),
    }),
});

export const { useGetProjectsQuery, useGetTasksQuery, useDeleteTaskMutation, useGetTeamsQuery, useAddTaskMutation, useUpdateTaskStatusMutation, useEditTaskMutation, useGetTaskByIdQuery } = apiSlice;
