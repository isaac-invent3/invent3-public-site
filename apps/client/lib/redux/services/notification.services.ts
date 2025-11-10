import { baseApi } from '~/lib/redux/services/baseApi.services';
import { BaseApiResponse, ListResponse } from '@repo/interfaces';
import {
  GetUserNotificationQueryParams,
  MarkAllNotificationsAsReadParams,
  Notification,
  NotificationCount,
} from '~/lib/interfaces/notification.interfaces';
import { generateQueryStr } from '~/lib/utils/queryGenerator';

const getHeaders = () => ({
  'Content-Type': 'application/json',
});

export const notificationApi = baseApi.injectEndpoints({
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
      invalidatesTags: ['allNotifications', 'notificationCount'],
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
      invalidatesTags: ['allNotifications', 'notificationCount'],
    }),
    getNotificationCount: builder.query<
      BaseApiResponse<NotificationCount>,
      { userId: number }
    >({
      query: ({ userId }) => ({
        url: `/Notifications/GetNotificationCounts/${userId}`,
        method: 'GET',
        headers: getHeaders(),
      }),
      providesTags: ['notificationCount'],
    }),
  }),
});

export const {
  useGetUserNotificationQuery,
  useMarkAllNotificationsAsReadMutation,
  useMarkANotificationAsReadMutation,
  useGetNotificationCountQuery,
} = notificationApi;
