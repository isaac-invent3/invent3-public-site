import { QueryParams } from '@repo/interfaces';

type NotificationType = 1 | 2 | 3 | 4;

interface INotification {
  isRead: boolean;
  createdDate: string;
  createdBy: string;
  type: NotificationType;
  contextID: number;
  title: string;
  user: string | null;
  userProfilePicture: string | null;
}

interface GetUserNotificationQueryParams extends QueryParams {
  userId: number;
  isRead?: boolean;
  isArchived?: boolean;
  isAlert?: boolean;
}

interface MarkAllNotificationsAsReadParams {
  userId: number;
  lastModifiedBy: number;
}

interface Notification {
  rowId: number;
  notificationId: number;
  guid: string;
  systemContextTypeId: number;
  contextId: number;
  priorityId: number;
  isRead: boolean;
  readAt: string;
  message: string;
  notificationEventTypeId: number;
  isDeleted: boolean;
  isArchived: boolean;
  dateCreated: string;
  notificationTypeId: number;
  notificationTypeName: string;
  notificationPriorityId: number;
  notificationPriorityName: string;
  deliveryMethodId: number;
  deliveryMethod: string;
  notificationTriggerEventTypeName: string;
  recipientUserId: number;
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  recipientGroupId: string;
  groupName: string;
  recipientRoleId: number;
  roleName: string;
}

interface NotificationCount {
  totalNotifications: number;
  unreadNotifications: number;
  archivedNotifications: number;
  alerts: number;
}

type NotificationTabType = 'All' | 'Unread' | 'Alerts' | 'Archived';

export type {
  GetUserNotificationQueryParams,
  INotification,
  MarkAllNotificationsAsReadParams,
  Notification,
  NotificationTabType,
  NotificationCount,
};
