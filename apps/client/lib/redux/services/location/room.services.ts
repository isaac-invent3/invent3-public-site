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
  Room,
} from '~/lib/interfaces/location.interfaces';

const getHeaders = () => ({
  'Content-Type': 'application/json',
});
export const roomApi = createApi({
  reducerPath: 'roomApi',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['allRooms', 'roomsByDepartmentId'],
  endpoints: (builder) => ({
    getAllRooms: builder.query<
      BaseApiResponse<ListResponse<Room>>,
      QueryParams
    >({
      query: (data) => ({
        url: generateQueryStr(`/Rooms?`, data),
        method: 'GET',
        headers: getHeaders(),
      }),
      providesTags: ['allRooms'],
    }),
    getAllRoomsInAFloor: builder.query<
      BaseApiResponse<Room[]>,
      { floorId: number }
    >({
      query: ({ floorId, ...data }) => ({
        url: generateQueryStr(
          `/Invent3Pro/GetAllRoomsInFloor/${floorId}?`,
          data
        ),
        method: 'GET',
        headers: getHeaders(),
      }),
      providesTags: ['allRooms'],
    }),
    getRoomsByDepartmentId: builder.query<
      BaseApiResponse<ListResponse<Room>>,
      LocationQueryParams
    >({
      query: ({ id, ...data }) => ({
        url: generateQueryStr(`/Rooms/GetRoomByDepartmentId/${id}?`, data),
        method: 'GET',
        headers: getHeaders(),
      }),
      providesTags: ['roomsByDepartmentId'],
    }),
    createRoom: builder.mutation<
      BaseApiResponse<Room>,
      {
        roomName: string;
        roomRef: string;
        departmentId: number | undefined;
        createdBy: string | undefined;
      }
    >({
      query: (body) => ({
        url: `/Rooms`,
        method: 'POST',
        headers: getHeaders(),
        body,
      }),
      invalidatesTags: ['allRooms', 'roomsByDepartmentId'],
    }),
    searchRooms: builder.mutation<
      BaseApiResponse<ListResponse<Room>>,
      SearchQuery
    >({
      query: (body) => ({
        url: `/Rooms/Search`,
        method: 'POST',
        headers: getHeaders(),
        body,
      }),
    }),
  }),
});

export const {
  useCreateRoomMutation,
  useGetAllRoomsQuery,
  useGetRoomsByDepartmentIdQuery,
  useSearchRoomsMutation,
  useGetAllRoomsInAFloorQuery,
} = roomApi;
