import { baseApi } from '~/lib/redux/services/baseApi.services';

import {
  BaseApiResponse,
  ListResponse,
  QueryParams,
  SearchQuery,
} from '@repo/interfaces';
import {
  CreateTaskPayload,
  SingleTask,
  Task,
  TaskPayload,
} from '~/lib/interfaces/task.interfaces';
import { generateQueryStr } from '~/lib/utils/queryGenerator';

import { GenericDocument } from '~/lib/interfaces/general.interfaces';

const getHeaders = () => ({
  'Content-Type': 'application/json',
});
export const taskApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createTask: builder.mutation<
      BaseApiResponse<SingleTask>,
      CreateTaskPayload
    >({
      query: (body) => ({
        url: `/Invent3Pro/Tasks/Create`,
        method: 'POST',
        headers: getHeaders(),
        body,
      }),
      invalidatesTags: ['allTasksByScheduleId', 'allTasks'],
    }),
    updateTask: builder.mutation<BaseApiResponse<SingleTask>, TaskPayload>({
      query: (body) => ({
        url: `/Tasks/${body.taskId}`,
        method: 'PUT',
        headers: getHeaders(),
        body,
      }),
      invalidatesTags: ['allTasksByScheduleId', 'allTasks'],
    }),
    deleteTask: builder.mutation<void, { id: number; deletedBy: string }>({
      query: ({ id, ...body }) => ({
        url: `/Tasks/${id}`,
        method: 'DELETE',
        headers: getHeaders(),
        body,
      }),
      invalidatesTags: ['allTasksByScheduleId', 'allTasks'],
    }),
    getAllTasks: builder.query<
      BaseApiResponse<ListResponse<Task>>,
      { taskStatusId?: number; statusCategoryId?: number } & QueryParams
    >({
      query: (data) => ({
        url: generateQueryStr(`/Tasks?`, data),
        method: 'GET',
        headers: getHeaders(),
      }),
      providesTags: ['allTasks'],
    }),
    getTaskById: builder.query<BaseApiResponse<SingleTask>, number>({
      query: (id) => ({
        url: `/Tasks/${id}`,
        method: 'GET',
        headers: getHeaders(),
      }),
    }),
    getAllTasksByScheduleId: builder.query<
      BaseApiResponse<ListResponse<Task>>,
      { id: number } & QueryParams
    >({
      query: ({ id, ...data }) => ({
        url: generateQueryStr(
          `/Tasks/GetMaintenanceScheduleTasksInfoHeadersByScheduleId/${id}?`,
          data
        ),
        method: 'GET',
        headers: getHeaders(),
      }),
      providesTags: ['allTasksByScheduleId'],
    }),
    getTaskDocumentsById: builder.query<
      BaseApiResponse<ListResponse<GenericDocument>>,
      QueryParams & { taskId: number }
    >({
      query: ({ taskId, ...data }) => ({
        url: generateQueryStr(
          `/TaskDocuments/GetTaskDocumentsByTaskId/${taskId}?`,
          data
        ),
        method: 'GET',
        headers: getHeaders(),
      }),
    }),
    searchTasks: builder.mutation<
      BaseApiResponse<ListResponse<Task>>,
      SearchQuery
    >({
      query: (body) => ({
        url: `/Tasks/Search`,
        method: 'POST',
        headers: getHeaders(),
        body,
      }),
    }),
  }),
});

export const {
  useCreateTaskMutation,
  useUpdateTaskMutation,
  useDeleteTaskMutation,
  useGetAllTasksQuery,
  useGetTaskByIdQuery,
  useSearchTasksMutation,
  useGetAllTasksByScheduleIdQuery,
  useGetTaskDocumentsByIdQuery,
} = taskApi;
