import { createApi } from '@reduxjs/toolkit/query/react';
import { generateQueryStr } from '~/lib/utils/queryGenerator';
import baseQueryWithReauth from '../../baseQueryWithReauth';
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
export const aisleApi = createApi({
  reducerPath: 'aisleApi',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['allAisles', 'aislesByRoomId'],
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
  }),
});

export const {
  useCreateAisleMutation,
  useGetAislesByRoomIdQuery,
  useGetAllAislesQuery,
  useSearchAisleMutation,
  useDeleteAisleMutation,
} = aisleApi;
