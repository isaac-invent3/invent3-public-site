import { BaseEntity } from '@repo/interfaces';

interface AssetTransfer extends BaseEntity {
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

interface AssetTransferInfoHeader {
  transferId: number;
  guid: string;
  transferredTo: number;
  transsferedToLocation: string;
  transferredFrom: number;
  transsferedFromLocation: string;
  newOwnerId: number;
  previousOwnerId: number;
  initiatedById: number;
  authorizedById: number;
  transferDate: Date;
  assetId: number;
  comments: string;
  newOwner: string;
  previousOwner: string;
  initiatedBy: string;
  authorizedBy: string;
  assetName: string;
}

interface AssetTransferQuery {
  transferredTo: number;
  newOwnerId: number;
  initiatedBy: number;
  transferDate: string;
  assetIds: number[];
  comments: string | null;
  createdBy: string;
}

export type { AssetTransfer, AssetTransferInfoHeader, AssetTransferQuery };
