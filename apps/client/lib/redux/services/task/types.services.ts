import { baseApi } from '~/lib/redux/services/baseApi.services';

import { generateQueryStr } from '~/lib/utils/queryGenerator';

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
export const taskTypeApi = baseApi.injectEndpoints({
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
