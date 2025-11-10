import { baseApi } from '~/lib/redux/services/baseApi.services';

import {
  BaseApiResponse,
  ListResponse,
  QueryParams,
  SearchQuery,
} from '@repo/interfaces';
import { TaskPriority } from '~/lib/interfaces/task.interfaces';
import { generateQueryStr } from '~/lib/utils/queryGenerator';

const getHeaders = () => ({
  'Content-Type': 'application/json',
});
export const taskPrioritiesApi = baseApi.injectEndpoints({
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
      query: (body) => ({
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
