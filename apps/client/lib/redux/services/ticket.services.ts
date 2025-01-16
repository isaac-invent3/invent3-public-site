import { createApi } from '@reduxjs/toolkit/query/react';
import {
  BaseApiResponse,
  ListResponse,
  QueryParams,
  SearchQuery,
} from '@repo/interfaces';
import {
  CreateTicketPayload,
  DeleteTicketPayload,
  Ticket,
  TicketCategory,
  TicketTypeDetails,
  UpdateTicketPayload,
} from '~/lib/interfaces/ticket.interfaces';
import { generateQueryStr } from '~/lib/utils/queryGenerator';
import baseQueryWithReauth from '../baseQueryWithReauth';

const getHeaders = () => ({
  'Content-Type': 'application/json',
});
export const ticketApi = createApi({
  reducerPath: 'ticketApi',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['allTickets', 'allTicketTypes'],
  endpoints: (builder) => ({
    createTicket: builder.mutation<
      BaseApiResponse<Ticket>,
      CreateTicketPayload
    >({
      query: (body) => ({
        url: `/Tickets`,
        method: 'POST',
        headers: getHeaders(),
        body,
      }),
      invalidatesTags: ['allTickets'],
    }),
    updateTicket: builder.mutation<
      BaseApiResponse<Ticket>,
      UpdateTicketPayload
    >({
      query: ({ id, ...body }) => ({
        url: `/Tickets/${id}`,
        method: 'PUT',
        headers: getHeaders(),
        body,
      }),
      invalidatesTags: ['allTickets'],
    }),
    deleteTicket: builder.mutation<BaseApiResponse<null>, DeleteTicketPayload>({
      query: ({ id, ...body }) => ({
        url: `/Tickets/${id}`,
        method: 'DELETE',
        headers: getHeaders(),
        body,
      }),
      invalidatesTags: ['allTickets'],
    }),
    getTicketsByTabScope: builder.query<
      BaseApiResponse<ListResponse<Ticket>>,
      { tabScopeName: TicketCategory } & QueryParams
    >({
      query: (data) => ({
        url: generateQueryStr(`/Tickets/GetTicketsByTabScope?`, data),
        method: 'GET',
        headers: getHeaders(),
      }),
      providesTags: ['allTickets'],
    }),

    getAssetOpenTickets: builder.query<
      BaseApiResponse<ListResponse<Ticket>>,
      { assetId: number } & QueryParams
    >({
      query: ({ assetId, ...data }) => ({
        url: generateQueryStr(`/Tickets/GetAssetOpenTickets/${assetId}?`, data),
        method: 'GET',
        headers: getHeaders(),
      }),
      providesTags: ['allTickets'],
    }),
    getTicketById: builder.query<BaseApiResponse<Ticket>, { id: number }>({
      query: ({ id }) => ({
        url: `/Tickets/${id}`,
        method: 'GET',
        headers: getHeaders(),
      }),
    }),
    searchTickets: builder.mutation<
      BaseApiResponse<ListResponse<Ticket>>,
      SearchQuery
    >({
      query: (body) => ({
        url: `/Tickets/Search`,
        method: 'POST',
        headers: getHeaders(),
        body,
      }),
    }),
    scheduleTickets: builder.mutation({
      query: (body) => ({
        url: `/Invent3Pro/CreateScheduleAndTasks`,
        method: 'POST',
        headers: getHeaders(),
        body,
      }),
      invalidatesTags: ['allTickets'],
    }),
    getAllTicketTypes: builder.query<
      BaseApiResponse<ListResponse<TicketTypeDetails>>,
      QueryParams
    >({
      query: (data) => ({
        url: generateQueryStr(`/TicketTypes?`, data),
        method: 'GET',
        headers: getHeaders(),
      }),
      providesTags: ['allTicketTypes'],
    }),

    searchTicketTypes: builder.mutation<
      BaseApiResponse<ListResponse<TicketTypeDetails>>,
      SearchQuery
    >({
      query: (body) => ({
        url: `/TicketTypes/Search`,
        method: 'POST',
        headers: getHeaders(),
        body,
      }),
    }),
  }),
});

export const {
  useCreateTicketMutation,
  useUpdateTicketMutation,
  useDeleteTicketMutation,
  useGetTicketsByTabScopeQuery,
  useGetTicketByIdQuery,
  useGetAllTicketTypesQuery,
  useSearchTicketsMutation,
  useScheduleTicketsMutation,
  useSearchTicketTypesMutation,
  useGetAssetOpenTicketsQuery
} = ticketApi;
