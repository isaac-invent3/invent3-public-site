import { createApi } from '@reduxjs/toolkit/query/react';
import { generateQueryStr } from '~/lib/utils/queryGenerator';
import baseQueryWithReauth from '../../baseQueryWithReauth';

const getHeaders = () => ({
  'Content-Type': 'application/json',
});
export const locationApi = createApi({
  reducerPath: 'locationApi',
  baseQuery: baseQueryWithReauth,
  tagTypes: [
    'allFacilities',
    'allBuildings',
    'allDepartments',
    'allFloors',
    'allRooms',
    'allAisles',
    'allShelves',
  ],
  endpoints: (builder) => ({
    getAllFacilities: builder.query({
      query: (data: any) => ({
        url: generateQueryStr(`/Facilities?`, data),
        method: 'GET',
        headers: getHeaders(),
      }),
      providesTags: ['allFacilities'],
    }),
    createFacility: builder.mutation({
      query: (body: any) => ({
        url: `/Facilities`,
        method: 'POST',
        headers: getHeaders(),
        body,
      }),
      invalidatesTags: ['allFacilities'],
    }),
    getAllBuildings: builder.query({
      query: (data: any) => ({
        url: generateQueryStr(`/Buildings?`, data),
        method: 'GET',
        headers: getHeaders(),
      }),
      providesTags: ['allBuildings'],
    }),
    createBuilding: builder.mutation({
      query: (body: any) => ({
        url: `/Buildings`,
        method: 'POST',
        headers: getHeaders(),
        body,
      }),
      invalidatesTags: ['allBuildings'],
    }),
    getAllDepartments: builder.query({
      query: (data: any) => ({
        url: generateQueryStr(`/Departments?`, data),
        method: 'GET',
        headers: getHeaders(),
      }),
      providesTags: ['allDepartments'],
    }),
    createDepartment: builder.mutation({
      query: (body: any) => ({
        url: `/Departments`,
        method: 'POST',
        headers: getHeaders(),
        body,
      }),
      invalidatesTags: ['allDepartments'],
    }),
    getAllFloors: builder.query({
      query: (data: any) => ({
        url: generateQueryStr(`/Floors?`, data),
        method: 'GET',
        headers: getHeaders(),
      }),
      providesTags: ['allFloors'],
    }),
    createFloor: builder.mutation({
      query: (body: any) => ({
        url: `/Floors`,
        method: 'POST',
        headers: getHeaders(),
        body,
      }),
      invalidatesTags: ['allFloors'],
    }),
    getAllRooms: builder.query({
      query: (data: any) => ({
        url: generateQueryStr(`/Rooms?`, data),
        method: 'GET',
        headers: getHeaders(),
      }),
      providesTags: ['allRooms'],
    }),
    createRoom: builder.mutation({
      query: (body: any) => ({
        url: `/Rooms`,
        method: 'POST',
        headers: getHeaders(),
        body,
      }),
      invalidatesTags: ['allRooms'],
    }),
    getAllAisles: builder.query({
      query: (data: any) => ({
        url: generateQueryStr(`/Aisles?`, data),
        method: 'GET',
        headers: getHeaders(),
      }),
      providesTags: ['allAisles'],
    }),
    createAisle: builder.mutation({
      query: (body: any) => ({
        url: `/Aisles`,
        method: 'POST',
        headers: getHeaders(),
        body,
      }),
      invalidatesTags: ['allAisles'],
    }),
    getAllShelves: builder.query({
      query: (data: any) => ({
        url: generateQueryStr(`/Shelves?`, data),
        method: 'GET',
        headers: getHeaders(),
      }),
      providesTags: ['allShelves'],
    }),
    createShelf: builder.mutation({
      query: (body: any) => ({
        url: `/Shelves`,
        method: 'POST',
        headers: getHeaders(),
        body,
      }),
      invalidatesTags: ['allShelves'],
    }),
  }),
});

export const {
  useCreateAisleMutation,
  useCreateBuildingMutation,
  useCreateDepartmentMutation,
  useCreateFacilityMutation,
  useCreateFloorMutation,
  useCreateRoomMutation,
  useCreateShelfMutation,
  useGetAllAislesQuery,
  useGetAllBuildingsQuery,
  useGetAllDepartmentsQuery,
  useGetAllFacilitiesQuery,
  useGetAllFloorsQuery,
  useGetAllRoomsQuery,
  useGetAllShelvesQuery,
} = locationApi;
