import { baseApi } from '~/lib/redux/services/baseApi.services';

import { generateQueryStr } from '~/lib/utils/queryGenerator';

import {
  BaseApiResponse,
  ListResponse,
  QueryParams,
  SearchQuery,
} from '@repo/interfaces';
import {
  Facility,
  FacilityExtended,
  GroupByState,
  LGAFacilityCount,
  LocationMasterFormDto,
  LocationQueryParams,
  StateFacilityCount,
} from '~/lib/interfaces/location.interfaces';

const getHeaders = () => ({
  'Content-Type': 'application/json',
});
export const facilityApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllFacilities: builder.query<
      BaseApiResponse<ListResponse<Facility>>,
      QueryParams
    >({
      query: (data) => ({
        url: generateQueryStr(`/Facilities?`, data),
        method: 'GET',
        headers: getHeaders(),
      }),
      providesTags: ['allFacilities'],
    }),
    getAllFacilitiesExtendedData: builder.query<
      BaseApiResponse<ListResponse<FacilityExtended>>,
      QueryParams
    >({
      query: (data) => ({
        url: generateQueryStr(`/Facilities/GetAllFacilities?`, data),
        method: 'GET',
        headers: getHeaders(),
      }),
      providesTags: ['allFacilitiesExtendedData'],
    }),
    getFacilitiesByLGAId: builder.query<
      BaseApiResponse<ListResponse<Facility>>,
      LocationQueryParams
    >({
      query: ({ id, ...data }) => ({
        url: generateQueryStr(`/Facilities/GetFacilitiesByLGAId/${id}?`, data),
        method: 'GET',
        headers: getHeaders(),
      }),
      providesTags: ['facilitiesByLGAId'],
    }),
    getFacilitiesByStateId: builder.query<
      BaseApiResponse<ListResponse<Facility>>,
      LocationQueryParams
    >({
      query: ({ id, ...data }) => ({
        url: generateQueryStr(
          `/Facilities/GetFacilitiesByStateId/${id}?`,
          data
        ),
        method: 'GET',
        headers: getHeaders(),
      }),
      providesTags: ['facilitiesByStateId'],
    }),
    getFacilityById: builder.query<BaseApiResponse<Facility>, { id: string }>({
      query: ({ id }) => ({
        url: `/Facilities/${id}`,
        method: 'GET',
        headers: getHeaders(),
      }),
    }),
    getAggregateFacilityByState: builder.query<
      BaseApiResponse<GroupByState[]>,
      void
    >({
      query: () => ({
        url: `/Facilities/GroupByState`,
        method: 'GET',
        headers: getHeaders(),
      }),
    }),
    createFacility: builder.mutation<
      BaseApiResponse<Facility>,
      {
        lgaId: number | undefined;
        facilityName: string;
        facilityRef: string;
        address: string;
        longitude: number;
        latitude: number;
        createdBy: string | undefined;
      }
    >({
      query: (body) => ({
        url: `/Facilities`,
        method: 'POST',
        headers: getHeaders(),
        body,
      }),
      invalidatesTags: ['allFacilities', 'facilitiesByLGAId'],
    }),
    searchFacilities: builder.mutation<
      BaseApiResponse<ListResponse<Facility>>,
      SearchQuery
    >({
      query: (body) => ({
        url: `/Facilities/Search`,
        method: 'POST',
        headers: getHeaders(),
        body,
      }),
    }),
    createMasterFacility: builder.mutation<
      void,
      {
        createFacilityDtos: LocationMasterFormDto[];
      }
    >({
      query: (body) => ({
        url: `/Invent3Pro/Facilities/with-structure`,
        method: 'POST',
        headers: getHeaders(),
        body,
      }),
    }),
    deleteFacility: builder.mutation<void, { id: number; deletedBy: string }>({
      query: ({ id, ...body }) => ({
        url: `/Facilities/${id}`,
        method: 'DELETE',
        headers: getHeaders(),
        body,
      }),
      invalidatesTags: ['facilitiesByStateId', 'facilitiesByLGAId'],
    }),
    updateFacility: builder.mutation<
      BaseApiResponse<Facility>,
      {
        facilityId: number;
        facilityName: string;
        facilityRef: string;
        address: string;
        longitude: number;
        latitude: number;
        lastModifiedBy: string;
      }
    >({
      query: (body) => ({
        url: `/Facilities/${body.facilityId}`,
        method: 'PUT',
        headers: getHeaders(),
        body,
      }),
      invalidatesTags: ['facilitiesByLGAId', 'facilitiesByLGAId'],
    }),
    getStateFacilityCountByCountryId: builder.query<
      BaseApiResponse<ListResponse<StateFacilityCount>>,
      { id: number | undefined; pageNumber?: number; pageSize?: number }
    >({
      query: ({ id, ...data }) => ({
        url: generateQueryStr(
          `/Facilities/GetStateFacilityCountByCountryId/${id}?`,
          data
        ),
        method: 'GET',
        headers: getHeaders(),
      }),
      providesTags: ['allStatesFacilityCount'],
    }),
    getLGAFacilityCountByStateId: builder.query<
      BaseApiResponse<ListResponse<LGAFacilityCount>>,
      { id: number | undefined; pageNumber?: number; pageSize?: number }
    >({
      query: ({ id, ...data }) => ({
        url: generateQueryStr(
          `/Facilities/GetLGAFacilityCountByStateId/${id}?`,
          data
        ),
        method: 'GET',
        headers: getHeaders(),
      }),
      providesTags: ['allLGAsFacilityCount'],
    }),
  }),
});

export const {
  useCreateFacilityMutation,
  useGetAllFacilitiesQuery,
  useGetFacilitiesByLGAIdQuery,
  useSearchFacilitiesMutation,
  useGetFacilityByIdQuery,
  useGetFacilitiesByStateIdQuery,
  useGetAggregateFacilityByStateQuery,
  useCreateMasterFacilityMutation,
  useDeleteFacilityMutation,
  useUpdateFacilityMutation,
  useGetLGAFacilityCountByStateIdQuery,
  useGetStateFacilityCountByCountryIdQuery,
  useGetAllFacilitiesExtendedDataQuery,
} = facilityApi;
