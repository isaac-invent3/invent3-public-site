import { createApi } from '@reduxjs/toolkit/query/react';
import { generateQueryStr } from '~/lib/utils/queryGenerator';
import baseQueryWithReauth from '../baseQueryWithReauth';
import {
  BaseApiResponse,
  ListResponse,
  QueryParams,
  SearchQuery,
} from '@repo/interfaces';
import { Team, TeamPayload } from '~/lib/interfaces/team.interfaces';

const getHeaders = () => ({
  'Content-Type': 'application/json',
});
export const teamApi = createApi({
  reducerPath: 'teamApi',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['allTeams'],
  endpoints: (builder) => ({
    getAllTeams: builder.query<
      BaseApiResponse<ListResponse<Team>>,
      QueryParams
    >({
      query: (data) => ({
        url: generateQueryStr(`/Teams?`, data),
        method: 'GET',
        headers: getHeaders(),
      }),
      providesTags: ['allTeams'],
    }),
    getTeamById: builder.query<
      BaseApiResponse<Team>,
      { id: number | undefined }
    >({
      query: ({ id }) => ({
        url: `/Teams/${id}`,
        method: 'GET',
        headers: getHeaders(),
      }),
    }),
    searchTeams: builder.mutation<
      BaseApiResponse<ListResponse<Team>>,
      SearchQuery
    >({
      query: (body) => ({
        url: `/AssetStatus/Search`,
        method: 'POST',
        headers: getHeaders(),
        body,
      }),
    }),
    createTeam: builder.mutation<BaseApiResponse<Team>, TeamPayload>({
      query: (body) => ({
        url: `/Teams`,
        method: 'POST',
        headers: getHeaders(),
        body,
      }),
      invalidatesTags: ['allTeams'],
    }),
  }),
});

export const {
  useGetAllTeamsQuery,
  useSearchTeamsMutation,
  useGetTeamByIdQuery,
  useCreateTeamMutation,
} = teamApi;
