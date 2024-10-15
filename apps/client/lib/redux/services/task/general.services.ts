import { createApi } from '@reduxjs/toolkit/query/react';
import { generateQueryStr } from '~/lib/utils/queryGenerator';
import baseQueryWithReauth from '../../baseQueryWithReauth';

const getHeaders = () => ({
  'Content-Type': 'application/json',
});
export const taskApi = createApi({
  reducerPath: 'taskApi',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['allTasks'],
  endpoints: (builder) => ({
    getAllTasks: builder.query({
      query: (data: any) => ({
        url: generateQueryStr(`/Tasks?`, data),
        method: 'GET',
        headers: getHeaders(),
      }),
      providesTags: ['allTasks'],
    }),
    searchTasks: builder.mutation({
      query: (body: any) => ({
        url: `/Tasks/Search`,
        method: 'POST',
        headers: getHeaders(),
        body,
      }),
    }),
  }),
});

export const { useGetAllTasksQuery, useSearchTasksMutation } = taskApi;
