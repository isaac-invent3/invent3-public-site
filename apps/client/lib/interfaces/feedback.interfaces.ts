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

interface CreateFeedbackAttachmentPayload {
  attachmentName: string;
  base64Attachment: string;
  base64Prefix: string;
  feedbackId: 0;
  createdBy: string;
}

interface CreateFeedbackPayload {
  createFeedbackDto: {
    feedbackTypeId: number;
    resolved?: boolean;
    authorFirstName?: string;
    authorLastName?: string;
    assignedTo?: number;
    subject: string;
    description: string;
    companyId?: number;
    submittedDate: string;
    statusId?: number;
    createdBy: string;
  };

  createFeedbackAttachmentDto: CreateFeedbackAttachmentPayload | null;
}

// Feedback Types
interface FeedbackTypes extends BaseEntity {
  feedbackTypeId: number;
  feedbackTypeName: string;
}

export type {
  CreateFeedbackPayload,
  Feedback,
  FeedbackTypes,
  CreateFeedbackAttachmentPayload,
};
