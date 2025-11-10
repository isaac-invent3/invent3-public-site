import { baseApi } from '~/lib/redux/services/baseApi.services';
import { generateQueryStr } from '~/lib/utils/queryGenerator';

import {
  BaseApiResponse,
  ListResponse,
  QueryParams,
  SearchQuery,
} from '@repo/interfaces';
import {
  UpdateVendorPayload,
  Vendor,
  VendorCategory,
} from '~/lib/interfaces/vendor.interfaces';

const getHeaders = () => ({
  'Content-Type': 'application/json',
});
export const vendorApi = baseApi.injectEndpoints({
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
    UpdateVendor: builder.mutation<BaseApiResponse<void>, UpdateVendorPayload>({
      query: (body) => ({
        url: `/Invent3Pro/Vendor/Update`,
        method: 'PUT',
        headers: getHeaders(),
        body,
      }),
      invalidatesTags: ['allVendors'],
    }),
    getVendorCategories: builder.query<
      BaseApiResponse<ListResponse<VendorCategory>>,
      QueryParams
    >({
      query: (data) => ({
        url: generateQueryStr(`/VendorCategories?`, data),
        method: 'GET',
        headers: getHeaders(),
      }),
      providesTags: ['allVendors'],
    }),
    searchVendorCategories: builder.mutation<
      BaseApiResponse<ListResponse<VendorCategory>>,
      SearchQuery
    >({
      query: (body) => ({
        url: `/VendorCategories/Search`,
        method: 'POST',
        headers: getHeaders(),
        body,
      }),
    }),
    createVendorCategory: builder.mutation<
      BaseApiResponse<VendorCategory>,
      { categoryName: string; createdBy: string }
    >({
      query: (body) => ({
        url: `/VendorCategories`,
        method: 'POST',
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
  useUpdateVendorMutation,
  useGetVendorCategoriesQuery,
  useSearchVendorCategoriesMutation,
  useCreateVendorCategoryMutation,
} = vendorApi;
