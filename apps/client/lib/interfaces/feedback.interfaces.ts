import { BaseEntity } from '@repo/interfaces';

interface Feedback extends BaseEntity {
  alias: string | null;
  assignedTo: string | null;
  attachment: string | null;
  attachmentName: string | null;
  authorFirstName: string | null;
  authorLastName: string | null;
  base64Prefix: string | null;
  companyId: string | null;
  companyName: string | null;
  companyType: string | null;
  description: string;
  designationName: string | null;
  displayColorCode: string | null;
  feedbackId: number;
  feedbackTypeId: string | null;
  feedbackTypeName: string | null;
  firstName: string | null;
  lastName: string | null;
  resolved: boolean;
  statusId: string | null;
  statusName: string | null;
  subject: string;
  submittedDate: string;
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
  FeedbackAttachment,
  FeedbackTypes,
};
