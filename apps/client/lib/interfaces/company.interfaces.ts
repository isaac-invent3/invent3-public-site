interface Company {
  isNew: boolean;
  createdDate: Date;
  createdBy: string;
  lastModifiedDate: Date;
  lastModifiedBy: string;
  isDeleted: boolean;
  deletedDate: Date;
  deletedBy: string;
  guid: string;
  companyId: number;
  companyName: string;
  address: string;
  apikey: string;
}

export type { Company };
