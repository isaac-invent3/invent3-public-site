import { baseApi } from '~/lib/redux/services/baseApi.services';

import { BaseApiResponse } from '@repo/interfaces';
import {
  BMSData,
  BuildingSetting,
  FloorSetting,
  RoomSetting,
} from '~/lib/interfaces/settings.interfaces';

const getHeaders = () => ({
  'Content-Type': 'application/json',
});
export const settingsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    bmsSettings: builder.mutation<void, BMSData & { createdBy: string }>({
      query: (body) => ({
        url: `/Invent3Pro/BMSAdminSettings`,
        method: 'POST',
        headers: getHeaders(),
        body,
      }),
    }),
    getBuildingSettingsByFacilityId: builder.query<
      BaseApiResponse<number[]>,
      { facilityId: number }
    >({
      query: ({ facilityId }) => ({
        url: `/Invent3Pro/BMSFacilityBuildingSettings/${facilityId}`,
        method: 'GET',
        headers: getHeaders(),
      }),
    }),
    getBuildingSettingsByBuilidingId: builder.query<
      BaseApiResponse<BuildingSetting>,
      { buildingId: number }
    >({
      query: ({ buildingId }) => ({
        url: `/Invent3Pro/BMSBuildingSetting/${buildingId}`,
        method: 'GET',
        headers: getHeaders(),
      }),
    }),
    getFloorSettingsByFloorId: builder.query<
      BaseApiResponse<FloorSetting>,
      { floorId: number }
    >({
      query: ({ floorId }) => ({
        url: `/Invent3Pro/BMSFloorSetting/${floorId}`,
        method: 'GET',
        headers: getHeaders(),
      }),
    }),
    getRoomSettingsByRoomId: builder.query<
      BaseApiResponse<RoomSetting>,
      { roomId: number }
    >({
      query: ({ roomId }) => ({
        url: `/Invent3Pro/BMSRoomSetting/${roomId}`,
        method: 'GET',
        headers: getHeaders(),
      }),
    }),
  }),
});

export const {
  useBmsSettingsMutation,
  useGetBuildingSettingsByBuilidingIdQuery,
  useGetBuildingSettingsByFacilityIdQuery,
  useGetFloorSettingsByFloorIdQuery,
  useGetRoomSettingsByRoomIdQuery,
} = settingsApi;
