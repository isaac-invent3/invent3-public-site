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
  isNew: boolean;
  createdDate: string;
  createdBy: string;
  lastModifiedDate: string;
  lastModifiedBy: string;
  isDeleted: boolean;
  deletedDate: string;
  deletedBy: string;
  guid: string;
  disposalRequestId: number;
  currentOwner: number;
  disposalReasonId: number;
  disposalDate: string;
  assetId: number;
  comments: string;
  disposalRequestedBy: number;
}

interface AssetDisposalQuery {
  createAssetDisposalRequestDto: CreateAssetDisposalRequestDto;
  createAssetDocumentsDto?: AssetDocumentsDto[] | null;
  assetDocumentIds?: number[] | null;
}

interface CreateAssetDisposalRequestDto {
  currentOwner: number;
  disposalReasonId: number;
  disposalDate: string;
  assetId: number;
  comments?: string;
  disposalRequestedBy: number;
  createdBy: string;
}

export type {
  AssetDisposalReason,
  AssetDisposal,
  AssetDisposalQuery,
  CreateAssetDisposalRequestDto,
};
