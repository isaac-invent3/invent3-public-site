import { createApi } from '@reduxjs/toolkit/query/react';
import {
  BaseApiResponse,
  ListResponse,
  QueryParams,
  SearchQuery,
} from '@repo/interfaces';
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
  tagTypes: ['allNotes', 'pinnedNotes', 'noteComments', 'unPinnedNotes'],
  endpoints: (builder) => ({
    getAllUserNotes: builder.query<
      BaseApiResponse<ListResponse<Note>>,
      GetAllNotesQueryParams
    >({
      query: (data) => ({
        url: generateQueryStr(`/Notes?`, data),
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

    deleteNote: builder.mutation<
      BaseApiResponse<void>,
      {
        id: number;
        deletedBy: string;
      }
    >({
      query: ({ id, ...body }) => ({
        url: `/Notes/${id}`,
        method: 'DELETE',
        headers: getHeaders(),
        body,
      }),
      invalidatesTags: ['allNotes', 'pinnedNotes'],
    }),

    pinNote: builder.mutation<
      BaseApiResponse<Note>,
      { id: number; authorId: number }
    >({
      query: ({ id, ...data }) => ({
        url: generateQueryStr(`/Notes/PinNote/${id}?`, data),
        method: 'POST',
        headers: getHeaders(),
      }),
      invalidatesTags: ['allNotes', 'pinnedNotes'],
    }),
    duplicateNote: builder.mutation<BaseApiResponse<Note>, { id: number }>({
      query: ({ id }) => ({
        url: `/Notes/DuplicateNote/${id}`,
        method: 'GET',
        headers: getHeaders(),
      }),
      invalidatesTags: ['allNotes', 'pinnedNotes'],
    }),

    getPinnedNotes: builder.query<
      BaseApiResponse<ListResponse<Note>>,
      GetAllPinnedNotesQueryParams
    >({
      query: ({ userId, ...data }) => ({
        url: generateQueryStr(`/Notes/GetPinnedNotes/${userId}?`, data),
        method: 'GET',
        headers: getHeaders(),
      }),
      providesTags: ['pinnedNotes'],
    }),
    getUnPinnedNotes: builder.query<
      BaseApiResponse<ListResponse<Note>>,
      GetAllPinnedNotesQueryParams
    >({
      query: ({ userId, ...data }) => ({
        url: generateQueryStr(`/Notes/GetUnpinnedNotes/${userId}?`, data),
        method: 'GET',
        headers: getHeaders(),
      }),
      providesTags: ['unPinnedNotes'],
    }),

    getNoteComments: builder.query<
      BaseApiResponse<ListResponse<Note>>,
      { noteId: number } & QueryParams
    >({
      query: ({ noteId, ...data }) => ({
        url: generateQueryStr(`/Notes/GetNoteComments/${noteId}?`, data),
        method: 'GET',
        headers: getHeaders(),
      }),
      providesTags: ['noteComments'],
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
  useGetUnPinnedNotesQuery,
  useUpdateNoteMutation,
  usePinNoteMutation,
  useDuplicateNoteMutation,
  useSearchNotesMutation,
  useGetNoteCommentsQuery,
} = notesApi;
