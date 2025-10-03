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
import { UpdateTicketMetadataPayload } from '~/lib/interfaces/template.interfaces';
import { GenericDocument } from '~/lib/interfaces/general.interfaces';
import { AuditRecord } from '~/lib/interfaces/log.interfaces';

const getHeaders = () => ({
  'Content-Type': 'application/json',
});
export const ticketApi = createApi({
  reducerPath: 'ticketApi',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['allTickets', 'allTicketTypes', 'allAssetOpenTickets'],
  endpoints: (builder) => ({
    createTicket: builder.mutation<
      BaseApiResponse<Ticket>,
      CreateTicketPayload
    >({
      query: (body) => ({
        url: `/Invent3Pro/Tickets/Create`,
        method: 'POST',
        headers: getHeaders(),
        body,
      }),
      invalidatesTags: ['allTickets', 'allAssetOpenTickets'],
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
    getAllTickets: builder.query<
      BaseApiResponse<ListResponse<Ticket>>,
      QueryParams
    >({
      query: (data) => ({
        url: generateQueryStr(`/Tickets?`, data),
        method: 'GET',
        headers: getHeaders(),
      }),
    }),

    getTicketDocumentsById: builder.query<
      BaseApiResponse<ListResponse<GenericDocument>>,
      QueryParams & { ticketId: number }
    >({
      query: ({ ticketId, ...data }) => ({
        url: generateQueryStr(
          `/TicketDocuments/GetTicketDocumentsByTicketId/${ticketId}?`,
          data
        ),
        method: 'GET',
        headers: getHeaders(),
      }),
    }),

    getTicketsByTabScope: builder.query<
      BaseApiResponse<ListResponse<Ticket>>,
      { userId?: number; tabScopeName?: TicketCategory } & QueryParams
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
      providesTags: ['allAssetOpenTickets'],
    }),
    getTicketById: builder.query<BaseApiResponse<Ticket>, { id: number }>({
      query: ({ id }) => ({
        url: `/Tickets/GetTicketInfoHeader/${id}`,
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
      invalidatesTags: [],
    }),
    getTicketsByListOfIds: builder.query<
      BaseApiResponse<ListResponse<Ticket>>,
      {
        ticketIds: number[];
      } & QueryParams
    >({
      query: (data) => ({
        url: generateQueryStr(`/Tickets/GetTicketsByListOfIds?`, data),
        method: 'GET',
        headers: getHeaders(),
      }),
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

    UpdateTicketMetadataPayload: builder.mutation<
      void,
      UpdateTicketMetadataPayload
    >({
      query: (body) => ({
        url: `/Tickets/UpdateTicketMetadataIds`,
        method: 'PUT',
        headers: getHeaders(),
        body,
      }),
    }),
    getTicketAuditTrailById: builder.query<
      BaseApiResponse<ListResponse<AuditRecord>>,
      {
        ticketId: number;
      } & QueryParams
    >({
      query: ({ ticketId, ...data }) => ({
        url: generateQueryStr(
          `/Tickets/GetTicketAuditTrail/${ticketId}?`,
          data
        ),
        method: 'GET',
        headers: getHeaders(),
      }),
    }),
    getEscalatedTicketCount: builder.query<
      BaseApiResponse<{ escalatedTickets: number }>,
      void
    >({
      query: (data) => ({
        url: `/Tickets/GetEscalatedTicketsCount`,
        method: 'GET',
        headers: getHeaders(),
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
  useGetAssetOpenTicketsQuery,
  useUpdateTicketMetadataPayloadMutation,
  useGetTicketsByListOfIdsQuery,
  useGetAllTicketsQuery,
  useGetTicketDocumentsByIdQuery,
  useGetTicketAuditTrailByIdQuery,
  useGetEscalatedTicketCountQuery,
} = ticketApi;
