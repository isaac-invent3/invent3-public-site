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
    searchFacilities: builder.mutation({
      query: (body: any) => ({
        url: `/Facilities/Search`,
        method: 'POST',
        headers: getHeaders(),
        body,
      }),
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
    searchBuilding: builder.mutation({
      query: (body: any) => ({
        url: `/Buildings/Search`,
        method: 'POST',
        headers: getHeaders(),
        body,
      }),
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
    searchDepartments: builder.mutation({
      query: (body: any) => ({
        url: `/Departments/Search`,
        method: 'POST',
        headers: getHeaders(),
        body,
      }),
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
    searchFloors: builder.mutation({
      query: (body: any) => ({
        url: `/Floors/Search`,
        method: 'POST',
        headers: getHeaders(),
        body,
      }),
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
    searchRooms: builder.mutation({
      query: (body: any) => ({
        url: `/Rooms/Search`,
        method: 'POST',
        headers: getHeaders(),
        body,
      }),
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
    searchAisle: builder.mutation({
      query: (body: any) => ({
        url: `/Aisles/Search`,
        method: 'POST',
        headers: getHeaders(),
        body,
      }),
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
    searchShelf: builder.mutation({
      query: (body: any) => ({
        url: `/Shelves/Search`,
        method: 'POST',
        headers: getHeaders(),
        body,
      }),
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
  useSearchBuildingMutation,
  useSearchAisleMutation,
  useSearchDepartmentsMutation,
  useSearchFacilitiesMutation,
  useSearchFloorsMutation,
  useSearchRoomsMutation,
  useSearchShelfMutation,
} = locationApi;
