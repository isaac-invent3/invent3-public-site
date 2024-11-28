import { createApi } from '@reduxjs/toolkit/query/react';
import {
  BaseApiResponse,
  ListResponse,
} from '~/lib/interfaces/general.interfaces';
import { TaskInstance } from '~/lib/interfaces/task.interfaces';
import { generateQueryStr } from '~/lib/utils/queryGenerator';
import baseQueryWithReauth from '../../baseQueryWithReauth';

const getHeaders = () => ({
  'Content-Type': 'application/json',
});
export const taskInstanceApi = createApi({
  reducerPath: 'taskInstanceApi',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['allTaskInstances', 'allTaskInstancesByScheduleInstanceId'],
  endpoints: (builder) => ({
    createTaskInstance: builder.mutation({
      query: (body: any) => ({
        url: `/TaskInstances`,
        method: 'POST',
        headers: getHeaders(),
        body,
      }),
      invalidatesTags: [
        'allTaskInstancesByScheduleInstanceId',
        'allTaskInstances',
      ],
    }),
    updateTaskInstance: builder.mutation({
      query: ({ id, ...body }) => ({
        url: `/TaskInstances/${id}`,
        method: 'PUT',
        headers: getHeaders(),
        body,
      }),
      invalidatesTags: [
        'allTaskInstancesByScheduleInstanceId',
        'allTaskInstances',
      ],
    }),
    deleteTaskInstance: builder.mutation({
      query: ({ id, ...body }) => ({
        url: `/TaskInstances/${id}`,
        method: 'DELETE',
        headers: getHeaders(),
        body,
      }),
      invalidatesTags: [
        'allTaskInstancesByScheduleInstanceId',
        'allTaskInstances',
      ],
    }),
    getAllTaskInstances: builder.query<
      BaseApiResponse<ListResponse<TaskInstance>>,
      any
    >({
      query: (data: any) => ({
        url: generateQueryStr(`/TaskInstances?`, data),
        method: 'GET',
        headers: getHeaders(),
      }),
      providesTags: ['allTaskInstances'],
    }),
    getAllCompletedTaskInstances: builder.query<
      BaseApiResponse<ListResponse<TaskInstance>>,
      any
    >({
      query: (data: any) => ({
        url: generateQueryStr(`/TaskInstances/GetCompletedTasks?`, data),
        method: 'GET',
        headers: getHeaders(),
      }),
      providesTags: ['allTaskInstances'],
    }),
    getTaskInstanceById: builder.query({
      query: (id: any) => ({
        url: `/TaskInstances/${id}`,
        method: 'GET',
        headers: getHeaders(),
      }),
    }),
    getAllTaskInstancesByScheduleInstanceId: builder.query<
      BaseApiResponse<ListResponse<TaskInstance>>,
      any
    >({
      query: ({ id, ...data }) => ({
        url: generateQueryStr(
          `/TaskInstances/GetTasksByMaintenanceScheduleInstanceIdAndStatusId/${id}?`,
          data
        ),
        method: 'GET',
        headers: getHeaders(),
      }),
      providesTags: ['allTaskInstancesByScheduleInstanceId'],
    }),
    searchTaskInstances: builder.mutation({
      query: (body: any) => ({
        url: `/TaskInstances/Search`,
        method: 'POST',
        headers: getHeaders(),
        body,
      }),
    }),
  }),
});

export const {
  useCreateTaskInstanceMutation,
  useDeleteTaskInstanceMutation,
  useGetAllTaskInstancesByScheduleInstanceIdQuery,
  useGetAllTaskInstancesQuery,
  useGetTaskInstanceByIdQuery,
  useUpdateTaskInstanceMutation,
  useSearchTaskInstancesMutation,
  useGetAllCompletedTaskInstancesQuery,
} = taskInstanceApi;
