import { baseApi } from '~/lib/redux/services/baseApi.services';

import { generateQueryStr } from '~/lib/utils/queryGenerator';

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
export const roomApi = baseApi.injectEndpoints({
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
    deleteRoom: builder.mutation<void, { id: number; deletedBy: string }>({
      query: ({ id, ...body }) => ({
        url: `/Rooms/${id}`,
        method: 'DELETE',
        headers: getHeaders(),
        body,
      }),
      invalidatesTags: ['roomsByDepartmentId'],
    }),
    updateRoom: builder.mutation<
      BaseApiResponse<Room>,
      {
        roomId: number;
        roomName: string;
        roomRef: string;
        currentCapacity?: number;
        maxCapacity?: number;
      }
    >({
      query: (body) => ({
        url: `/Rooms/${body.roomId}`,
        method: 'PUT',
        headers: getHeaders(),
        body,
      }),
      invalidatesTags: ['roomsByDepartmentId'],
    }),
  }),
});

export const {
  useCreateRoomMutation,
  useGetAllRoomsQuery,
  useGetRoomsByDepartmentIdQuery,
  useSearchRoomsMutation,
  useGetAllRoomsInAFloorQuery,
  useDeleteRoomMutation,
  useUpdateRoomMutation,
} = roomApi;
