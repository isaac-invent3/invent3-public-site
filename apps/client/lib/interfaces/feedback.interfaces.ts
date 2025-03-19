import { BaseEntity } from '@repo/interfaces';

interface Feedback extends BaseEntity {
  alias: string | null;
  assignedTo: string | null;
  assignedToFirstName: string | null;
  assignedToLastName: string | null;
  authorId: number;
  companyId: number | null;
  companyName: string | null;
  companyType: string | null;
  description: string;
  designationName: string | null;
  displayColorCode: string | null;
  feedbackId: number;
  feedbackTypeId: string | null;
  feedbackTypeName: string | null;
  resolutionNote: string | null;
  authorFirstName: string | null;
  authorLastName: string | null;
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
  feedbackId?: number;
  createdBy: string;
}

interface CreateFeedbackPayload {
  feedbackTypeId: number;
  resolved?: boolean;
  authorFirstName?: string;
  authorLastName?: string;
  assignedTo?: number;
  authorId: number;
  subject: string;
  description: string;
  companyId?: number;
  submittedDate: string;
  statusId?: number;
  createdBy: string;
}

interface CreateFeedbackWithAttachmentPayload {
  createFeedbackDto: CreateFeedbackPayload;

  createFeedbackAttachmentDto: CreateFeedbackAttachmentPayload[];
}

interface UpdateFeedbackPayload {
  feedbackId: number;
  data: Partial<Feedback>;
}

interface ResolveFeedbackPayload {
  id: number;
  lastModifiedBy: string;
}

export type {
  CreateFeedbackAttachmentPayload,
  CreateFeedbackPayload,
  CreateFeedbackWithAttachmentPayload,
  Feedback,
  FeedbackAttachment,
  ResolveFeedbackPayload,
  UpdateFeedbackPayload,
};
