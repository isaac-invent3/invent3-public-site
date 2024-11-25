interface State {
  isNew: boolean;
  createdDate: string; // ISO 8601 date string
  createdBy: string;
  lastModifiedDate: string; // ISO 8601 date string
  lastModifiedBy: string;
  isDeleted: boolean;
  deletedDate: string; // ISO 8601 date string
  deletedBy: string;
  guid: string; // UUID
  stateId: number;
  stateName: string;
  countryId: number;
}

export type { State };
