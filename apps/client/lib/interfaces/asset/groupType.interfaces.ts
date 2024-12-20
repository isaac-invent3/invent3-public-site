import { QueryParams, BaseEntity } from '@repo/interfaces';

interface AssetGroupTypes extends BaseEntity {
  groupTypeId: number;
  groupTypeName: string;
  groupTypeTableName: string;
  groupTypeTableKeyColumn: string;
  groupTypeNameIdentifierColumn: string;
}

interface GroupTypeContext {
  groupContextID: number;
  groupContextTypeName: string;
}

interface GroupTypeContextQuery extends QueryParams {
  groupTypeId: number | undefined;
}

export type { AssetGroupTypes, GroupTypeContext, GroupTypeContextQuery };
