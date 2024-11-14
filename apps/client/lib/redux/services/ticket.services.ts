import { createApi } from '@reduxjs/toolkit/query/react';
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
    createTicket: builder.mutation({
      query: (body: any) => ({
        url: `/Tickets`,
        method: 'POST',
        headers: getHeaders(),
        body,
      }),
      invalidatesTags: ['allTickets'],
    }),
    updateTicket: builder.mutation({
      query: ({ id, ...body }) => ({
        url: `/Tickets/${id}`,
        method: 'PUT',
        headers: getHeaders(),
        body,
      }),
      invalidatesTags: ['allTickets'],
    }),
    deleteTicket: builder.mutation({
      query: ({ id, ...body }) => ({
        url: `/Tickets/${id}`,
        method: 'DELETE',
        headers: getHeaders(),
        body,
      }),
      invalidatesTags: ['allTickets'],
    }),
    getAllTickets: builder.query({
      query: (data: any) => ({
        url: generateQueryStr(`/Tickets?`, data),
        method: 'GET',
        headers: getHeaders(),
      }),
      providesTags: ['allTickets'],
    }),
    getTicketById: builder.query({
      query: (id: any) => ({
        url: `/Tickets/${id}`,
        method: 'GET',
        headers: getHeaders(),
      }),
    }),
    searchTickets: builder.mutation({
      query: (body: any) => ({
        url: `/Tickets/Search`,
        method: 'POST',
        headers: getHeaders(),
        body,
      }),
    }),
    scheduleTickets: builder.mutation({
      query: (body: any) => ({
        url: `/Invent3Pro/CreateScheduleAndTasks`,
        method: 'POST',
        headers: getHeaders(),
        body,
      }),
    }),
    getAllTicketTypes: builder.query({
      query: (data: any) => ({
        url: generateQueryStr(`/TicketTypes?`, data),
        method: 'GET',
        headers: getHeaders(),
      }),
      providesTags: ['allTicketTypes'],
    }),

    searchTicketTypes: builder.mutation({
      query: (body: any) => ({
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
  useGetAllTicketsQuery,
  useGetTicketByIdQuery,
  useGetAllTicketTypesQuery,
  useSearchTicketsMutation,
  useScheduleTicketsMutation,
  useSearchTicketTypesMutation
} = ticketApi;
