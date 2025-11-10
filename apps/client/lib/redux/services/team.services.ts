import { baseApi } from '~/lib/redux/services/baseApi.services';
import { generateQueryStr } from '~/lib/utils/queryGenerator';

import {
  BaseApiResponse,
  ListResponse,
  QueryParams,
  SearchQuery,
} from '@repo/interfaces';
import {
  Team,
  TeamMember,
  TeamPayload,
  UserTeam,
} from '~/lib/interfaces/team.interfaces';

const getHeaders = () => ({
  'Content-Type': 'application/json',
});
export const teamApi = baseApi.injectEndpoints({
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
    getAllUserTeams: builder.query<
      BaseApiResponse<ListResponse<UserTeam>>,
      QueryParams & { userId: number }
    >({
      query: (data) => ({
        url: generateQueryStr(
          `/UserTeams/GetUserTeamsInfoHeaderByUserId?`,
          data
        ),
        method: 'GET',
        headers: getHeaders(),
      }),
      providesTags: ['allUserTeams'],
    }),
    getAllUserTeamMembers: builder.query<
      BaseApiResponse<ListResponse<TeamMember>>,
      QueryParams & { teamId: number }
    >({
      query: ({ teamId, ...data }) => ({
        url: generateQueryStr(`/UserTeams/GetUsersWithTeam/${teamId}?`, data),
        method: 'GET',
        headers: getHeaders(),
      }),
      providesTags: ['allUserTeams'],
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
  useGetAllUserTeamsQuery,
  useGetAllUserTeamMembersQuery,
} = teamApi;
