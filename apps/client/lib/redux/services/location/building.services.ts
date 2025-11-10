import { baseApi } from '~/lib/redux/services/baseApi.services';

import { generateQueryStr } from '~/lib/utils/queryGenerator';

import {
  BaseApiResponse,
  ListResponse,
  QueryParams,
  SearchQuery,
} from '@repo/interfaces';
import {
  Building,
  LocationQueryParams,
} from '~/lib/interfaces/location.interfaces';

const getHeaders = () => ({
  'Content-Type': 'application/json',
});
export const buildingApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllBuildings: builder.query<
      BaseApiResponse<ListResponse<Building>>,
      QueryParams
    >({
      query: (data) => ({
        url: generateQueryStr(`/Buildings?`, data),
        method: 'GET',
        headers: getHeaders(),
      }),
      providesTags: ['allBuildings'],
    }),
    getBuildingsByFacilityId: builder.query<
      BaseApiResponse<ListResponse<Building>>,
      LocationQueryParams
    >({
      query: ({ id, ...data }) => ({
        url: generateQueryStr(
          `/Buildings/GetBuildingByFacilityId/${id}?`,
          data
        ),
        method: 'GET',
        headers: getHeaders(),
      }),
      providesTags: ['buildingsByFacilityId'],
    }),
    createBuilding: builder.mutation<
      BaseApiResponse<Building>,
      {
        buildingName: string;
        facilityId: number | undefined;
        buildingRef: string;
        address: string;
        longitude: number;
        latitude: number;
        createdBy: string | undefined;
      }
    >({
      query: (body) => ({
        url: `/Buildings`,
        method: 'POST',
        headers: getHeaders(),
        body,
      }),
      invalidatesTags: ['allBuildings', 'buildingsByFacilityId'],
    }),
    searchBuilding: builder.mutation<
      BaseApiResponse<ListResponse<Building>>,
      SearchQuery
    >({
      query: (body) => ({
        url: `/Buildings/Search`,
        method: 'POST',
        headers: getHeaders(),
        body,
      }),
    }),
    deleteBuilding: builder.mutation<void, { id: number; deletedBy: string }>({
      query: ({ id, ...body }) => ({
        url: `/Buildings/${id}`,
        method: 'DELETE',
        headers: getHeaders(),
        body,
      }),
      invalidatesTags: ['buildingsByFacilityId'],
    }),
    updateBuilding: builder.mutation<
      BaseApiResponse<Building>,
      {
        buildingId: number;
        buildingName: string;
        buildingRef?: string;
        address?: string;
        longitude?: number;
        latitude?: number;
        energyCostPerKwh?: number;
        lastModifiedBy: string;
      }
    >({
      query: (body) => ({
        url: `/Buildings/${body.buildingId}`,
        method: 'PUT',
        headers: getHeaders(),
        body,
      }),
      invalidatesTags: ['allBuildings', 'buildingsByFacilityId'],
    }),
  }),
});

export const {
  useCreateBuildingMutation,
  useGetAllBuildingsQuery,
  useGetBuildingsByFacilityIdQuery,
  useSearchBuildingMutation,
  useDeleteBuildingMutation,
  useUpdateBuildingMutation,
} = buildingApi;
