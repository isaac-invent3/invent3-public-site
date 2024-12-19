import { BaseEntity } from '@repo/interfaces';

interface Vendor extends BaseEntity {
  vendorId: number;
  vendorName: string;
  address: string;
  phoneNumber: string;
  emailAddress: string;
}

export type { Vendor };
