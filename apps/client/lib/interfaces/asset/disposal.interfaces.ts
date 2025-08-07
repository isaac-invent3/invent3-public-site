import { AssetDocumentsDto } from './general.interface';

interface AssetDisposalReason {
  isNew: boolean;
  createdDate: Date;
  createdBy: string;
  lastModifiedDate: Date;
  lastModifiedBy: string;
  isDeleted: boolean;
  deletedDate: Date;
  deletedBy: string;
  guid: string;
  disposalReasonId: number;
  reason: string;
  description: string;
}

interface AssetDisposal {
  disposalReasonId: number;
  reason: string;
  description: string;
  disposalRequestId: number;
  guid: string;
  currentOwner: number;
  disposalDate: Date;
  assetId: number;
  comments: string;
  disposalRequestedBy: number;
  isDeleted: boolean;
  assetName: string;
  fullName: string;
}

interface AssetDisposalQuery {
  createBulkAssetDisposalRequestDto: CreateAssetDisposalRequestDto;
  createAssetDocumentsDto?: AssetDocumentsDto[] | null;
  assetDocumentIds?: number[] | null;
}

interface CreateAssetDisposalRequestDto {
  disposalReasonId: number;
  disposalDate: string;
  assetIds: number[];
  comments: string | null;
  disposalRequestedBy: number;
  createdBy: string;
}

export type {
  AssetDisposalReason,
  AssetDisposal,
  AssetDisposalQuery,
  CreateAssetDisposalRequestDto,
};
