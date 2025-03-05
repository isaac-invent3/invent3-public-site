interface Industry {
  isNew: boolean;
  createdDate: Date;
  createdBy: string;
  lastModifiedDate: Date;
  lastModifiedBy: string;
  isDeleted: boolean;
  deletedDate: string;
  deletedBy: string;
  guid: string;
  industryId: number;
  industryName: string;
  dateCreated: Date;
}

export type { Industry };
