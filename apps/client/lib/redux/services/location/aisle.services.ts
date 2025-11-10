import { baseApi } from '~/lib/redux/services/baseApi.services';

import { generateQueryStr } from '~/lib/utils/queryGenerator';

import {
  BaseApiResponse,
  ListResponse,
  QueryParams,
  SearchQuery,
} from '@repo/interfaces';
import {
  Aisle,
  LocationQueryParams,
} from '~/lib/interfaces/location.interfaces';

const getHeaders = () => ({
  'Content-Type': 'application/json',
});
export const aisleApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllAisles: builder.query<
      BaseApiResponse<ListResponse<Aisle>>,
      QueryParams
    >({
      query: (data) => ({
        url: generateQueryStr(`/Aisles?`, data),
        method: 'GET',
        headers: getHeaders(),
      }),
      providesTags: ['allAisles'],
    }),
    getAislesByRoomId: builder.query<
      BaseApiResponse<ListResponse<Aisle>>,
      LocationQueryParams
    >({
      query: ({ id, ...data }) => ({
        url: generateQueryStr(`/Aisles/GetAisleByRoomId/${id}?`, data),
        method: 'GET',
        headers: getHeaders(),
      }),
      providesTags: ['aislesByRoomId'],
    }),
    createAisle: builder.mutation<
      BaseApiResponse<Aisle>,
      {
        aisleName: string;
        aisleRef: string;
        roomId: number | undefined;
        createdBy: string | undefined;
      }
    >({
      query: (body) => ({
        url: `/Aisles`,
        method: 'POST',
        headers: getHeaders(),
        body,
      }),
      invalidatesTags: ['allAisles', 'aislesByRoomId'],
    }),
    searchAisle: builder.mutation<
      BaseApiResponse<ListResponse<Aisle>>,
      SearchQuery
    >({
      query: (body) => ({
        url: `/Aisles/Search`,
        method: 'POST',
        headers: getHeaders(),
        body,
      }),
    }),
    deleteAisle: builder.mutation<void, { id: number; deletedBy: string }>({
      query: ({ id, ...body }) => ({
        url: `/Aisles/${id}`,
        method: 'DELETE',
        headers: getHeaders(),
        body,
      }),
      invalidatesTags: ['aislesByRoomId'],
    }),
    updateAisle: builder.mutation<
      BaseApiResponse<Aisle>,
      {
        aisleName: string;
        aisleRef?: string;
        aisleId: number;
        lastModifiedBy: string;
      }
    >({
      query: (body) => ({
        url: `/Aisles/${body.aisleId}`,
        method: 'PUT',
        headers: getHeaders(),
        body,
      }),
      invalidatesTags: ['aislesByRoomId'],
    }),
  }),
});

export const {
  useCreateAisleMutation,
  useGetAislesByRoomIdQuery,
  useGetAllAislesQuery,
  useSearchAisleMutation,
  useDeleteAisleMutation,
  useUpdateAisleMutation,
} = aisleApi;
