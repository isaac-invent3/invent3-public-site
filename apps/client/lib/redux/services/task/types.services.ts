import { createApi } from '@reduxjs/toolkit/query/react';
import { generateQueryStr } from '~/lib/utils/queryGenerator';
import baseQueryWithReauth from '../../baseQueryWithReauth';

const getHeaders = () => ({
  'Content-Type': 'application/json',
});
export const taskTypeApi = createApi({
  reducerPath: 'taskTypeApi',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['allTaskType'],
  endpoints: (builder) => ({
    getAllTaskType: builder.query({
      query: (data: any) => ({
        url: generateQueryStr(`/TaskTypes?`, data),
        method: 'GET',
        headers: getHeaders(),
      }),
      providesTags: ['allTaskType'],
    }),
    searchTaskType: builder.mutation({
      query: (body: any) => ({
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
