import { createApi } from '@reduxjs/toolkit/query/react';
import { BaseApiResponse, ListResponse, SearchQuery } from '@repo/interfaces';
import {
  CreateNotePayload,
  GetAllNotesQueryParams,
  GetAllPinnedNotesQueryParams,
  Note,
} from '~/lib/interfaces/notes.interfaces';
import { generateQueryStr } from '~/lib/utils/queryGenerator';
import baseQueryWithReauth from '../baseQueryWithReauth';

const getHeaders = () => ({
  'Content-Type': 'application/json',
});

export const notesApi = createApi({
  reducerPath: 'notesApi',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['allNotes', 'pinnedNotes'],
  endpoints: (builder) => ({
    getAllUserNotes: builder.query<
      BaseApiResponse<ListResponse<Note>>,
      GetAllNotesQueryParams
    >({
      query: (data) => ({
        url: generateQueryStr(`/Notes`, data),
        method: 'GET',
        headers: getHeaders(),
      }),
      providesTags: ['allNotes'],
    }),

    createNote: builder.mutation<BaseApiResponse<Note>, CreateNotePayload>({
      query: (body) => ({
        url: '/Notes',
        method: 'POST',
        headers: getHeaders(),
        body,
      }),

      invalidatesTags: ['allNotes'],
    }),

    getNoteById: builder.query<BaseApiResponse<Note>, { id: number }>({
      query: ({ id }) => ({
        url: `/Notes/${id}`,
        method: 'GET',
        headers: getHeaders(),
      }),
    }),

    updateNote: builder.mutation<
      BaseApiResponse<Note>,
      { id: number; data: Partial<Note> }
    >({
      query: ({ id, data }) => ({
        url: `/Notes/${id}`,
        method: 'PUT',
        headers: getHeaders(),
        body: data,
      }),
      invalidatesTags: ['allNotes', 'pinnedNotes'],
    }),

    deleteNote: builder.mutation<BaseApiResponse<void>, { id: number }>({
      query: ({ id }) => ({
        url: `/Notes/${id}`,
        method: 'DELETE',
        headers: getHeaders(),
      }),
      invalidatesTags: ['allNotes', 'pinnedNotes'],
    }),

    pinNote: builder.mutation<BaseApiResponse<Note>, string>({
      query: (noteId) => ({
        url: `/Notes/PinNote/${noteId}`,
        method: 'POST',
        headers: getHeaders(),
      }),
      invalidatesTags: ['allNotes', 'pinnedNotes'],
    }),

    getPinnedNotes: builder.query<
      BaseApiResponse<ListResponse<Note>>,
      GetAllPinnedNotesQueryParams
    >({
      query: (userId) => ({
        url: `/Notes/GetPinnedNotes/${userId}`,
        method: 'GET',
        headers: getHeaders(),
      }),
      providesTags: ['pinnedNotes'],
    }),

    searchNotes: builder.mutation<
      BaseApiResponse<ListResponse<Note>>,
      SearchQuery
    >({
      query: (body) => ({
        url: `/Notes/Search`,
        method: 'POST',
        headers: getHeaders(),
        body,
      }),
    }),
  }),
});

export const {
  useGetAllUserNotesQuery,
  useCreateNoteMutation,
  useDeleteNoteMutation,
  useGetNoteByIdQuery,
  useGetPinnedNotesQuery,
  usePinNoteMutation,
  useSearchNotesMutation,
} = notesApi;
