import { BaseEntity } from '@repo/interfaces';

interface AssetType extends BaseEntity {
  assetTypeId: number;
  typeName: string;
}

interface AssetTypePayload {
  typeName: string;
  createdBy: string;
}

export type { AssetTypePayload, AssetType };
