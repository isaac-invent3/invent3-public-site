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

export type { INotification };
