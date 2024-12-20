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
  Floor,
  LocationQueryParams,
} from '~/lib/interfaces/location.interfaces';

const getHeaders = () => ({
  'Content-Type': 'application/json',
});
export const floorApi = createApi({
  reducerPath: 'floorApi',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['allFloors', 'floorsByBuildingId'],
  endpoints: (builder) => ({
    getAllFloors: builder.query<
      BaseApiResponse<ListResponse<Floor>>,
      QueryParams
    >({
      query: (data) => ({
        url: generateQueryStr(`/Floors?`, data),
        method: 'GET',
        headers: getHeaders(),
      }),
      providesTags: ['allFloors'],
    }),
    getFloorsByBuildingId: builder.query<
      BaseApiResponse<ListResponse<Floor>>,
      LocationQueryParams
    >({
      query: ({ id, ...data }) => ({
        url: generateQueryStr(`/Floors/GetFloorByBuilingId/${id}?`, data),
        method: 'GET',
        headers: getHeaders(),
      }),
      providesTags: ['floorsByBuildingId'],
    }),
    createFloor: builder.mutation<
      BaseApiResponse<Floor>,
      {
        buildingId: number | undefined;
        floorName: string;
        floorRef: string;
        createdBy: string | undefined;
      }
    >({
      query: (body) => ({
        url: `/Floors`,
        method: 'POST',
        headers: getHeaders(),
        body,
      }),
      invalidatesTags: ['allFloors', 'floorsByBuildingId'],
    }),
    searchFloors: builder.mutation<
      BaseApiResponse<ListResponse<Floor>>,
      SearchQuery
    >({
      query: (body) => ({
        url: `/Floors/Search`,
        method: 'POST',
        headers: getHeaders(),
        body,
      }),
    }),
  }),
});

export const {
  useCreateFloorMutation,
  useGetAllFloorsQuery,
  useGetFloorsByBuildingIdQuery,
  useSearchFloorsMutation,
} = floorApi;
