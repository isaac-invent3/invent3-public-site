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

type FeedbackAttachment = BaseEntity & CreateFeedbackAttachmentPayload;

interface CreateFeedbackAttachmentPayload {
  attachmentName: string;
  base64Attachment: string;
  base64Prefix: string;
  feedbackId: number;
  createdBy: string;
}

interface CreateFeedbackPayload {
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
}

interface CreateFeedbackWithAttachmentPayload {
  createFeedbackDto: CreateFeedbackPayload;

  createFeedbackAttachmentDto: CreateFeedbackAttachmentPayload | null;
}

// Feedback Types
interface FeedbackTypes extends BaseEntity {
  feedbackTypeId: number;
  feedbackTypeName: string;
}

export type {
  CreateFeedbackAttachmentPayload,
  CreateFeedbackPayload,
  CreateFeedbackWithAttachmentPayload,
  Feedback,
  FeedbackTypes,
  FeedbackAttachment,
};
