import { createApi } from '@reduxjs/toolkit/query/react';
import { generateQueryStr } from '~/lib/utils/queryGenerator';
import baseQueryWithReauth from '../../baseQueryWithReauth';

const getHeaders = () => ({
  'Content-Type': 'application/json',
});
export const vendorsApi = createApi({
  reducerPath: 'vendorsApi',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['allVendors'],
  endpoints: (builder) => ({
    getAllVendors: builder.query({
      query: (data: any) => ({
        url: generateQueryStr(`/Vendors?`, data),
        method: 'GET',
        headers: getHeaders(),
      }),
      providesTags: ['allVendors'],
    }),
    searchVendors: builder.mutation({
      query: (body: any) => ({
        url: `/Vendors/Search`,
        method: 'POST',
        headers: getHeaders(),
        body,
      }),
    }),
    getVendorById: builder.query({
      query: (id) => ({
        url: `/Vendors/${id}?`,
        method: 'GET',
        headers: getHeaders(),
      }),
    }),
  }),
});

export const {
  useGetAllVendorsQuery,
  useSearchVendorsMutation,
  useGetVendorByIdQuery,
} = vendorsApi;
