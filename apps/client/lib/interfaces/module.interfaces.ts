interface Module {
  isNew: boolean;
  createdDate: Date;
  createdBy: string;
  lastModifiedDate: Date;
  lastModifiedBy: string;
  isDeleted: boolean;
  deletedDate: Date;
  deletedBy: string;
  guid: string;
  systemModuleContextTypeId: number;
  description: string;
  moduleContextTypeName: string;
  moduleContextTypeKeyName: string;
}

interface SubModule {
  systemSubModuleContextTypeId: number;
  subModuleContextTypeName: string;
  subModuleContextTypeKeyName: string;
  description: string;
  parentId: number;
  isNew: boolean;
  createdDate: Date;
  createdBy: null;
  lastModifiedDate: null;
  lastModifiedBy: null;
  isDeleted: boolean;
  deletedDate: null;
  deletedBy: null;
  guid: string;
}

export type { Module, SubModule };
