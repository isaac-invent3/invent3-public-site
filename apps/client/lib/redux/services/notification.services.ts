import { createApi } from '@reduxjs/toolkit/query/react';
import { generateQueryStr } from '~/lib/utils/queryGenerator';
import baseQueryWithReauth from '../baseQueryWithReauth';
import { BaseApiResponse, ListResponse, QueryParams } from '@repo/interfaces';
import { Notification } from '~/lib/interfaces/notification.interfaces';

const getHeaders = () => ({
  'Content-Type': 'application/json',
});

export const notificationApi = createApi({
  reducerPath: 'notificationApi',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['allNotifications'],
  endpoints: (builder) => ({
    getAllNotification: builder.query<
      BaseApiResponse<ListResponse<Notification>>,
      QueryParams
    >({
      query: (data) => ({
        url: generateQueryStr(`/Notifications?`, data),
        method: 'GET',
        headers: getHeaders(),
      }),
      providesTags: ['allNotifications'],
    }),
  }),
});

export const { useGetAllNotificationQuery } = notificationApi;
