import { createApi } from '@reduxjs/toolkit/query/react';
import { generateQueryStr } from '~/lib/utils/queryGenerator';
import baseQueryWithReauth from '../baseQueryWithReauth';
import {
  BaseApiResponse,
  ListResponse,
  QueryParams,
  SearchQuery,
} from '@repo/interfaces';
import { Vendor } from '~/lib/interfaces/vendor.interfaces';

const getHeaders = () => ({
  'Content-Type': 'application/json',
});
export const vendorApi = createApi({
  reducerPath: 'vendorApi',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['allVendors', 'vendorDetail'],
  endpoints: (builder) => ({
    getAllVendors: builder.query<
      BaseApiResponse<ListResponse<Vendor>>,
      QueryParams
    >({
      query: (data) => ({
        url: generateQueryStr(`/Vendors?`, data),
        method: 'GET',
        headers: getHeaders(),
      }),
      providesTags: ['allVendors'],
    }),
    getVendorById: builder.query<BaseApiResponse<Vendor>, { vendorId: number }>(
      {
        query: ({ vendorId }) => ({
          url: `/Vendors/${vendorId}`,
          method: 'GET',
          headers: getHeaders(),
        }),
        providesTags: ['vendorDetail'],
      }
    ),
    searchVendors: builder.mutation<
      BaseApiResponse<ListResponse<Vendor>>,
      SearchQuery
    >({
      query: (body) => ({
        url: `/Vendors/Search`,
        method: 'POST',
        headers: getHeaders(),
        body,
      }),
    }),
    deleteVendor: builder.mutation<void, { id: number; deletedBy: string }>({
      query: ({ id, ...body }) => ({
        url: `/Vendors/${id}`,
        method: 'DELETE',
        headers: getHeaders(),
        body,
      }),
      invalidatesTags: ['allVendors'],
    }),
  }),
});

export const {
  useGetAllVendorsQuery,
  useSearchVendorsMutation,
  useDeleteVendorMutation,
  useGetVendorByIdQuery,
} = vendorApi;
