import { createApi } from '@reduxjs/toolkit/query/react';
import {
  BaseApiResponse,
  ListResponse,
  QueryParams,
  SearchQuery,
} from '@repo/interfaces';
import { TaskPriority } from '~/lib/interfaces/task.interfaces';
import { generateQueryStr } from '~/lib/utils/queryGenerator';
import baseQueryWithReauth from '../../baseQueryWithReauth';

const getHeaders = () => ({
  'Content-Type': 'application/json',
});
export const taskPrioritiesApi = createApi({
  reducerPath: 'taskPrioritiesApi',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['allTaskPriorities'],
  endpoints: (builder) => ({
    getAllTaskPriorities: builder.query<
      BaseApiResponse<ListResponse<TaskPriority>>,
      QueryParams
    >({
      query: (data) => ({
        url: generateQueryStr(`/TaskPriorities?`, data),
        method: 'GET',
        headers: getHeaders(),
      }),
      providesTags: ['allTaskPriorities'],
    }),
    searchTaskPriorities: builder.mutation<
      BaseApiResponse<ListResponse<TaskPriority>>,
      SearchQuery
    >({
      query: (body: any) => ({
        url: `/TaskPriorities/Search`,
        method: 'POST',
        headers: getHeaders(),
        body,
      }),
    }),
  }),
});

export const { useGetAllTaskPrioritiesQuery, useSearchTaskPrioritiesMutation } =
  taskPrioritiesApi;
