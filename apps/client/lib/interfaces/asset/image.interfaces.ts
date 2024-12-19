import { QueryParams, BaseEntity } from '@repo/interfaces';

interface AssetImage extends BaseEntity {
  imageId: number;
  imageName: string;
  photoImage: string;
  base64Prefix: string;
  isPrimaryImage: true;
  assetId: number;
}

interface AssetImageQuery extends QueryParams {
  assetId: number | undefined;
  includeDeleted?: boolean;
}

export type { AssetImageQuery, AssetImage };
