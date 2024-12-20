import { QueryParams } from '@repo/interfaces';

interface Category {
  categoryId: number;
  categoryName: string;
  isNew: boolean;
  createdDate: string;
  createdBy: string | null;
  lastModifiedDate: string | null;
  lastModifiedBy: string | null;
  isDeleted: boolean;
  deletedDate: string | null;
  deletedBy: string | null;
  guid: string;
}

interface SubCategory {
  isNew: boolean;
  createdDate: string; // ISO 8601 date format
  createdBy: string;
  lastModifiedDate: string; // ISO 8601 date format
  lastModifiedBy: string;
  isDeleted: boolean;
  deletedDate: string; // ISO 8601 date format
  deletedBy: string;
  guid: string; // UUID
  subCategoryId: number;
  subCategoryName: string;
  categoryId: number;
}

interface GetAssetSubCatgoriesByCategoryIdQuery extends QueryParams {
  categoryId: number | undefined;
  includeDeleted?: boolean;
}

export type { Category, SubCategory, GetAssetSubCatgoriesByCategoryIdQuery };
