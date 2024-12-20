import { BaseEntity } from '@repo/interfaces';

export interface AssetType extends BaseEntity {
  assetTypeId: number;
  typeName: string;
}
