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

interface Notification {
  rowId: number;
  notificationId: number;
  guid: string;
  systemContextTypeId: number;
  contextId: number;
  isRead: boolean;
  readAt: string;
  message: string;
  isDeleted: boolean;
  dateCreated: string;
  notificationTypeId: number;
  notificationTypeName: string;
  notificationPriorityId: number;
  notificationPriorityName: string;
  deliveryMethodId: number;
  deliveryMethod: string;
  notificationTriggerId: number;
  notificationTriggerEventTypeId: number;
  notificationTriggerEventTypeName: string;
  notificationTriggerTypeId: number;
  notificationTriggerTypeName: string;
  userId: number;
  username: string;
  firstName: string;
  lastName: string;
}

export type { INotification, Notification };
