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
  transferredTo: number | undefined;
  transferredFrom: number | undefined;
  newOwnerId: number | undefined;
  previousOwnerId: number | undefined;
  initiatedBy: number | undefined;
  transferDate: string;
  assetId: number;
  comments?: string;
  createdBy: string | undefined;
}
