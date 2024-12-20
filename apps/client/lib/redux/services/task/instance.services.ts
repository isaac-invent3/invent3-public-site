import { createApi } from '@reduxjs/toolkit/query/react';
import {
  BaseApiResponse,
  ListResponse,
  QueryParams,
  SearchQuery,
} from '@repo/interfaces';
import {
  CreateTaskInstancePayload,
  TaskInstance,
  TaskInstanceModel,
  UpdateTaskInstancePayload,
} from '~/lib/interfaces/task.interfaces';
import { generateQueryStr } from '~/lib/utils/queryGenerator';
import baseQueryWithReauth from '../../baseQueryWithReauth';

const getHeaders = () => ({
  'Content-Type': 'application/json',
});
export const taskInstanceApi = createApi({
  reducerPath: 'taskInstanceApi',
  baseQuery: baseQueryWithReauth,
  tagTypes: [
    'allTaskInstances',
    'allTaskInstancesByScheduleInstanceId',
    'allCompletedTaskInstances',
  ],
  endpoints: (builder) => ({
    createTaskInstance: builder.mutation<
      BaseApiResponse<TaskInstanceModel>,
      CreateTaskInstancePayload
    >({
      query: (body) => ({
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
    updateTaskInstance: builder.mutation<void, UpdateTaskInstancePayload>({
      query: (body) => ({
        url: `/TaskInstances/${body.taskInstanceId}`,
        method: 'PUT',
        headers: getHeaders(),
        body,
      }),
      invalidatesTags: [
        'allTaskInstancesByScheduleInstanceId',
        'allTaskInstances',
      ],
    }),
    deleteTaskInstance: builder.mutation<
      void,
      { id: number; deletedBy: string }
    >({
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
      {
        taskStatusId?: number;
        statusCategoryId?: number;
      } & QueryParams
    >({
      query: (data) => ({
        url: generateQueryStr(`/TaskInstances?`, data),
        method: 'GET',
        headers: getHeaders(),
      }),
      providesTags: ['allTaskInstances'],
    }),
    getAllCompletedTaskInstances: builder.query<
      BaseApiResponse<ListResponse<TaskInstance>>,
      QueryParams
    >({
      query: (data) => ({
        url: generateQueryStr(`/TaskInstances/GetCompletedTasks?`, data),
        method: 'GET',
        headers: getHeaders(),
      }),
      providesTags: ['allCompletedTaskInstances'],
    }),
    getTaskInstanceById: builder.query<BaseApiResponse<TaskInstance>, number>({
      query: (id) => ({
        url: `/TaskInstances/${id}`,
        method: 'GET',
        headers: getHeaders(),
      }),
    }),
    getAllTaskInstancesByScheduleInstanceId: builder.query<
      BaseApiResponse<ListResponse<TaskInstance>>,
      {
        id: number;
        taskStatusId?: number;
        statusCategoryId?: number;
      } & QueryParams
    >({
      query: ({ id, ...data }) => ({
        url: generateQueryStr(
          `/TaskInstances/GetTaskInstancesByMaintenanceScheduleInstanceIdAndStatusId/${id}?`,
          data
        ),
        method: 'GET',
        headers: getHeaders(),
      }),
      providesTags: ['allTaskInstancesByScheduleInstanceId'],
    }),
    searchTaskInstances: builder.mutation<
      BaseApiResponse<ListResponse<TaskInstance>>,
      SearchQuery
    >({
      query: (body) => ({
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
