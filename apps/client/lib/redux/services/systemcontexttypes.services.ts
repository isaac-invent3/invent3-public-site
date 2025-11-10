import { baseApi } from '~/lib/redux/services/baseApi.services';
import {
  BaseApiResponse,
  ListResponse,
  QueryParams,
  SearchQuery,
} from '@repo/interfaces';
import {
  GetSystemContextTypeColumnsPayload,
  SystemContextType,
  SystemContextTypeColumns,
} from '~/lib/interfaces/systemContextType.interfaces';
import { generateQueryStr } from '~/lib/utils/queryGenerator';

const getHeaders = () => ({
  'Content-Type': 'application/json',
});
export const systemContextTypesApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllSystemContextType: builder.query<
      BaseApiResponse<ListResponse<SystemContextType>>,
      QueryParams & { isOnlyTemplateAllowed: boolean }
    >({
      query: (data) => ({
        url: generateQueryStr(`/SystemContextTypes?`, data),
        method: 'GET',
        headers: getHeaders(),
      }),
      providesTags: ['reportableSystemContextTypes'],
    }),

    getReportableSystemContextTypes: builder.query<
      BaseApiResponse<ListResponse<SystemContextType>>,
      SearchQuery
    >({
      query: (data) => ({
        url: generateQueryStr(
          `/SystemContextTypes/GetReportableSystemContextTypes?`,
          data
        ),
        method: 'GET',
        headers: getHeaders(),
      }),
      providesTags: ['reportableSystemContextTypes'],
    }),

    getSystemContextTypeColumnsInfo: builder.query<
      BaseApiResponse<ListResponse<SystemContextTypeColumns>>,
      GetSystemContextTypeColumnsPayload
    >({
      query: ({ systemContextTypeId, ...data }) => ({
        url: generateQueryStr(
          `/SystemContextTypes/GetSystemContextTypeColumnsInfo/${systemContextTypeId}?`,
          data
        ),
        method: 'GET',
        headers: getHeaders(),
      }),
    }),

    searchContextTypes: builder.mutation<
      BaseApiResponse<ListResponse<SystemContextType>>,
      SearchQuery
    >({
      query: (body) => ({
        url: `/SystemContextTypes/Search`,
        method: 'POST',
        headers: getHeaders(),
        body,
      }),
    }),
  }),
});

export const {
  useGetAllSystemContextTypeQuery,
  useGetReportableSystemContextTypesQuery,
  useSearchContextTypesMutation,
  useGetSystemContextTypeColumnsInfoQuery,
} = systemContextTypesApi;
