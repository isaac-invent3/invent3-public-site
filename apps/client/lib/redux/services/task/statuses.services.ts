import { baseApi } from '~/lib/redux/services/baseApi.services';

import {
  BaseApiResponse,
  ListResponse,
  QueryParams,
  SearchQuery,
} from '@repo/interfaces';
import { TaskStatus } from '~/lib/interfaces/task.interfaces';
import { generateQueryStr } from '~/lib/utils/queryGenerator';

const getHeaders = () => ({
  'Content-Type': 'application/json',
});
export const taskStatusApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllTaskStatuses: builder.query<
      BaseApiResponse<ListResponse<TaskStatus>>,
      QueryParams
    >({
      query: (data) => ({
        url: generateQueryStr(`/TaskStatus?`, data),
        method: 'GET',
        headers: getHeaders(),
      }),
      providesTags: ['allTaskStatuses'],
    }),
    searchTaskStatuses: builder.mutation<
      BaseApiResponse<ListResponse<TaskStatus>>,
      SearchQuery
    >({
      query: (body) => ({
        url: `/TaskStatus/Search`,
        method: 'POST',
        headers: getHeaders(),
        body,
      }),
    }),
  }),
});

export const { useGetAllTaskStatusesQuery, useSearchTaskStatusesMutation } =
  taskStatusApi;
