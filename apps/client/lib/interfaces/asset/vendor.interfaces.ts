import { BaseEntity } from '@repo/interfaces';

interface AssetVendor extends BaseEntity {
  vendorId: number;
  vendorName: string;
  address: string;
  phoneNumber: string;
  emailAddress: string;
}

export type { AssetVendor };
