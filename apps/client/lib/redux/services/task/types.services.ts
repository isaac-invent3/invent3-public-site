import { createApi } from '@reduxjs/toolkit/query/react';
import { generateQueryStr } from '~/lib/utils/queryGenerator';
import baseQueryWithReauth from '../../baseQueryWithReauth';
import {
  BaseApiResponse,
  ListResponse,
  QueryParams,
  SearchQuery,
} from '@repo/interfaces';
import { TaskType } from '~/lib/interfaces/task.interfaces';

const getHeaders = () => ({
  'Content-Type': 'application/json',
});
export const taskTypeApi = createApi({
  reducerPath: 'taskTypeApi',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['allTaskType'],
  endpoints: (builder) => ({
    getAllTaskType: builder.query<
      BaseApiResponse<ListResponse<TaskType>>,
      QueryParams
    >({
      query: (data) => ({
        url: generateQueryStr(`/TaskTypes?`, data),
        method: 'GET',
        headers: getHeaders(),
      }),
      providesTags: ['allTaskType'],
    }),
    searchTaskType: builder.mutation<
      BaseApiResponse<ListResponse<TaskType>>,
      SearchQuery
    >({
      query: (body) => ({
        url: `/TaskTypes/Search`,
        method: 'POST',
        headers: getHeaders(),
        body,
      }),
    }),
  }),
});

export const { useGetAllTaskTypeQuery, useSearchTaskTypeMutation } =
  taskTypeApi;
