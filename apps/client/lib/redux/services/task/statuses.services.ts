import { createApi } from '@reduxjs/toolkit/query/react';
import {
  BaseApiResponse,
  QueryParams,
} from '~/lib/interfaces/general.interfaces';
import { TaskStatus } from '~/lib/interfaces/task.interfaces';
import { generateQueryStr } from '~/lib/utils/queryGenerator';
import baseQueryWithReauth from '../../baseQueryWithReauth';

const getHeaders = () => ({
  'Content-Type': 'application/json',
});
export const taskStatusApi = createApi({
  reducerPath: 'taskStatusApi',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['allTaskStatuses'],
  endpoints: (builder) => ({
    createTaskStatus: builder.mutation({
      query: (body: any) => ({
        url: `/TaskStatus`,
        method: 'POST',
        headers: getHeaders(),
        body,
      }),
      invalidatesTags: ['allTaskStatuses'],
    }),
    getAllTaskStatuses: builder.query<
      BaseApiResponse<{ items: TaskStatus[] }>,
      QueryParams
    >({
      query: (data: any) => ({
        url: generateQueryStr(`/TaskStatus?`, data),
        method: 'GET',
        headers: getHeaders(),
      }),
      providesTags: ['allTaskStatuses'],
    }),
    getTaskStatusById: builder.query({
      query: (id: any) => ({
        url: `/TaskStatus/${id}`,
        method: 'GET',
        headers: getHeaders(),
      }),
    }),
    updateTaskStatus: builder.mutation({
      query: ({ id, ...body }) => ({
        url: `/TaskStatus/${id}`,
        method: 'PUT',
        headers: getHeaders(),
        body,
      }),
      invalidatesTags: ['allTaskStatuses'],
    }),
    deleteTaskStatus: builder.mutation({
      query: ({ id, ...body }) => ({
        url: `/TaskStatus/${id}`,
        method: 'DELETE',
        headers: getHeaders(),
        body,
      }),
      invalidatesTags: ['allTaskStatuses'],
    }),
    searchTaskStatuses: builder.mutation({
      query: (body: any) => ({
        url: `/TaskStatus/Search`,
        method: 'POST',
        headers: getHeaders(),
        body,
      }),
    }),
  }),
});

export const {
  useCreateTaskStatusMutation,
  useGetAllTaskStatusesQuery,
  useGetTaskStatusByIdQuery,
  useUpdateTaskStatusMutation,
  useDeleteTaskStatusMutation,
  useSearchTaskStatusesMutation,
} = taskStatusApi;
