interface Vendor {
  isNew: boolean;
  createdDate: string;
  createdBy: string;
  lastModifiedDate: string;
  lastModifiedBy: string;
  isDeleted: boolean;
  deletedDate: string;
  deletedBy: string;
  guid: string;
  vendorId: number;
  vendorName: string;
  address: string;
  phoneNumber: string;
  emailAddress: string;
}

export type { Vendor };
