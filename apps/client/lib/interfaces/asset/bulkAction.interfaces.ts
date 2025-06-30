interface AssetBulkAction {
  bulkActionId: number;
  bulkActionTypeId: number;
  guid: string;
  totalAssets: number;
  transferredTo: number;
  transsferedToLocation: string;
  transferredFrom: number;
  transsferedFromLocation: string;
  newOwnerId: number;
  currentOwner: number;
  requestedBy: number;
  authorizedById: number;
  actionDate: Date;
  comments: string;
  newOwner: string;
  previousOwner: string;
  initiatedBy: string;
  authorizedBy: string;
}

interface AssetBulkActionMap {
  assetBulkActionsMapId: number;
  bulkActionId: number;
  assetId: number;
  approvalRequestId: number;
  bulkActionTypeId: number;
  totalAssets: number;
  currentOwner: number;
  disposalReasonId: number;
  transferredFrom: number;
  transferredTo: number;
  newOwnerId: number;
  authorizedBy: number;
  actionDate: string;
  comments: string;
  requestedBy: number;
  assetName: string;
  isDeleted: boolean;
}

export type { AssetBulkAction, AssetBulkActionMap };
