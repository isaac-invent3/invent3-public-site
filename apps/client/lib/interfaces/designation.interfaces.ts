interface designationPayload {
  designationTypeId: number;
  designationName: string;
  createdBy: string;
}

interface Designation {
  designationId: number;
  designationTypeId: number;
  designationName: string;
  isNew: boolean;
  createdDate: string;
  createdBy: null;
  lastModifiedDate: null;
  lastModifiedBy: null;
  isDeleted: boolean;
  deletedDate: null;
  deletedBy: null;
  guid: string;
}

interface DesignationType {
  isNew: boolean;
  createdDate: string;
  createdBy: string;
  lastModifiedDate: string;
  lastModifiedBy: string;
  isDeleted: boolean;
  deletedDate: string;
  deletedBy: string;
  guid: string;
  designationId: number;
  designationTypeId: number;
  designationName: string;
}

export type { designationPayload, Designation, DesignationType };
