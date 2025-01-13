import { BaseEntity } from '@repo/interfaces';

export interface AssetTransfer extends BaseEntity {
  transferId: number;
  transferredTo: number;
  transferredFrom: number;
  newOwnerId: number;
  previousOwnerId: number;
  initiatedBy: number;
  authorizedBy: number;
  transferDate: string;
  assetId: number;
  comments: string;
}

export interface AssetTransferQuery {
  transferredTo: number;
  newOwnerId: number;
  initiatedBy: number;
  transferDate: string;
  assetIds: number[];
  comments: string | null;
  createdBy: string;
}
