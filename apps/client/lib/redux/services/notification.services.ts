import { createApi } from '@reduxjs/toolkit/query/react';
import { BaseApiResponse, ListResponse } from '@repo/interfaces';
import {
  GetUserNotificationQueryParams,
  MarkAllNotificationsAsReadParams,
  Notification,
} from '~/lib/interfaces/notification.interfaces';
import { generateQueryStr } from '~/lib/utils/queryGenerator';
import baseQueryWithReauth from '../baseQueryWithReauth';

const getHeaders = () => ({
  'Content-Type': 'application/json',
});

export const notificationApi = createApi({
  reducerPath: 'notificationApi',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['allNotifications'],
  endpoints: (builder) => ({
    getUserNotification: builder.query<
      BaseApiResponse<ListResponse<Notification>>,
      GetUserNotificationQueryParams
    >({
      query: ({ userId, ...data }) => ({
        url: generateQueryStr(
          `/Notifications/GetNotifications/${userId}?`,
          data
        ),
        method: 'GET',
        headers: getHeaders(),
      }),
      providesTags: ['allNotifications'],
    }),

    markAllNotificationsAsRead: builder.mutation<
      BaseApiResponse<string>,
      MarkAllNotificationsAsReadParams
    >({
      query: ({ userId, ...data }) => ({
        url: generateQueryStr(
          `/Notifications/MarkAllNotificationsAsRead/${userId}?`,
          data
        ),
        method: 'PUT',
        headers: getHeaders(),
      }),
      invalidatesTags: ['allNotifications'],
    }),
    markANotificationAsRead: builder.mutation<
      BaseApiResponse<string>,
      { notificationId: number; lastModifiedBy: string }
    >({
      query: ({ notificationId, ...data }) => ({
        url: generateQueryStr(
          `/Notifications/MarkNotificationAsRead/${notificationId}?`,
          data
        ),
        method: 'PUT',
        headers: getHeaders(),
      }),
      invalidatesTags: ['allNotifications'],
    }),
  }),
});

export const {
  useGetUserNotificationQuery,
  useMarkAllNotificationsAsReadMutation,
  useMarkANotificationAsReadMutation,
} = notificationApi;
