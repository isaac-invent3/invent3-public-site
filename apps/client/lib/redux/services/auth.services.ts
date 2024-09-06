import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const getHeaders = () => ({
  'Content-Type': 'application/json',
});

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({ baseUrl: '' }),
  tagTypes: ['Auth'],
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (body) => ({
        url: `/login`,
        method: 'POST',
        headers: getHeaders(),
        body,
      }),
    }),
  }),
});

export const { useLoginMutation } = authApi;
