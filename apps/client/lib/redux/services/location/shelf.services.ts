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
  LocationQueryParams,
  Shelf,
} from '~/lib/interfaces/location.interfaces';

const getHeaders = () => ({
  'Content-Type': 'application/json',
});
export const shelfApi = createApi({
  reducerPath: 'shelfApi',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['allShelves', 'shelvesByAisleId'],
  endpoints: (builder) => ({
    getAllShelves: builder.query<
      BaseApiResponse<ListResponse<Shelf>>,
      QueryParams
    >({
      query: (data) => ({
        url: generateQueryStr(`/Shelves?`, data),
        method: 'GET',
        headers: getHeaders(),
      }),
      providesTags: ['allShelves'],
    }),
    getShelvesByAisleId: builder.query<
      BaseApiResponse<ListResponse<Shelf>>,
      LocationQueryParams
    >({
      query: ({ id, ...data }) => ({
        url: generateQueryStr(`/Shelves/GetShelfByAisleId/${id}?`, data),
        method: 'GET',
        headers: getHeaders(),
      }),
      providesTags: ['shelvesByAisleId'],
    }),
    createShelf: builder.mutation<
      BaseApiResponse<Shelf>,
      {
        shelfName: string;
        shelfRef: string;
        aisleId: number | undefined;
        createdBy: string | undefined;
      }
    >({
      query: (body) => ({
        url: `/Shelves`,
        method: 'POST',
        headers: getHeaders(),
        body,
      }),
      invalidatesTags: ['allShelves', 'shelvesByAisleId'],
    }),
    searchShelf: builder.mutation<
      BaseApiResponse<ListResponse<Shelf>>,
      SearchQuery
    >({
      query: (body) => ({
        url: `/Shelves/Search`,
        method: 'POST',
        headers: getHeaders(),
        body,
      }),
    }),
    deleteShelf: builder.mutation<void, { id: number; deletedBy: string }>({
      query: ({ id, ...body }) => ({
        url: `/Shelves/${id}`,
        method: 'DELETE',
        headers: getHeaders(),
        body,
      }),
      invalidatesTags: ['shelvesByAisleId'],
    }),
  }),
});

export const {
  useCreateShelfMutation,
  useGetAllShelvesQuery,
  useGetShelvesByAisleIdQuery,
  useSearchShelfMutation,
  useDeleteShelfMutation,
} = shelfApi;
