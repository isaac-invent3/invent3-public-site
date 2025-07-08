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
        imageBasePrefix: string | null;
        floorPlanImage: string | null;
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
    deleteFloor: builder.mutation<void, { id: number; deletedBy: string }>({
      query: ({ id, ...body }) => ({
        url: `/Floors/${id}`,
        method: 'DELETE',
        headers: getHeaders(),
        body,
      }),
      invalidatesTags: ['floorsByBuildingId'],
    }),
    updateFloor: builder.mutation<
      BaseApiResponse<Floor>,
      {
        floorId: number;
        floorName: string;
        floorRef?: string;
        imageBasePrefix?: string;
        floorPlanImage?: string;
        lastModifiedBy: string;
      }
    >({
      query: (body) => ({
        url: `/Floors/${body.floorId}`,
        method: 'PUT',
        headers: getHeaders(),
        body,
      }),
      invalidatesTags: ['floorsByBuildingId'],
    }),
  }),
});

export const {
  useCreateFloorMutation,
  useGetAllFloorsQuery,
  useGetFloorsByBuildingIdQuery,
  useSearchFloorsMutation,
  useDeleteFloorMutation,
  useUpdateFloorMutation,
} = floorApi;
