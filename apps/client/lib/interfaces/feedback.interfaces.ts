import { BaseEntity } from '@repo/interfaces';

interface Feedback extends BaseEntity {
  feedbackID: number;
  user: string;
  userRoleName: string;
  subject: string;
  companyName: string;
  email: string;
  feedbackTypeId: string;
  feedbackType: string;
  submittedDate: string;
  statusID: string;
  statusName: string;
}

export type  { Feedback };
