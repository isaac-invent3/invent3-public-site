import { BaseEntity } from '@repo/interfaces';

interface ImportHistory {
  dataUploadName: string;
  fileName: string;
  uploadedBy: number;
  totalRecordCount: number;
  dataUploadId: number;
  dateCreated: string;
  dataUploadHistoryId: number;
  stageName: string;
  stageId: number;
  stageStatusId: number;
  stageStatusName: string;
  historyDate: string;
  tabName: string;
  cell: string;
  reason: string;
  uploadedByFullName: string;
  dataUploadFailedItemId: number;
  failedItemsHistoryId: number;
  failedItemDateCreated: string;
  erorrs: number;
  isDeleted: boolean;
}

interface DataUpload {
  isNew: boolean;
  createdDate: Date;
  createdBy: string;
  lastModifiedDate: Date;
  lastModifiedBy: string;
  isDeleted: boolean;
  deletedDate: Date;
  deletedBy: string;
  guid: string;
  dataUploadHistoryId: number;
  dataUploadId: number;
  stageName: string;
  stageId: number;
  stageStatusId: number;
  stageStatusName: string;
  dateCreated: Date;
}

interface FailedUploadItems extends BaseEntity {
  dataUploadFailedItemId: number;
  dataUploadId: number;
  tabName: string;
  cell: string;
  reason: string;
  dateCreated: Date;
}

interface DataUploadStageHistory {
  dataUploadHistoryId: number;
  dataUploadId: number;
  stageName: string | null;
  stageId: number | null;
  stageStatusId: number | null;
  stageStatusName: string | null;
  dateCreated: string;
}

export type {
  ImportHistory,
  DataUpload,
  FailedUploadItems,
  DataUploadStageHistory,
};
