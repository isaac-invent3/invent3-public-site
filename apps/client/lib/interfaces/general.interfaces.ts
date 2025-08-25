import { ComponentWithAs, IconProps } from '@chakra-ui/react';
import { GeoJsonTypes } from 'geojson';
import {
  FORM_ENUM,
  OPERATORS,
  ROUTES,
  SYSTEM_CONTEXT_TYPE,
} from '../utils/constants';
import { ModuleKey } from './role.interfaces';
import { BaseEntity } from '@repo/interfaces';

interface Option {
  label: string;
  value: string | number;
}

interface SearchCriterion {
  columnName: string;
  columnValue: string | number;
  operation: (typeof OPERATORS)[keyof typeof OPERATORS];
}

interface GeoJSONFeature {
  type: string;
  properties: {
    objectid: string;
    statecode: string;
    state: string;
    capcity: string;
    name: string;
    source: string;
    timestamp: string;
    globalid: string;
    shape_area: string;
    shape_len: string;
    geozone: string;
    cartodb_id: number;
    created_at: string;
    updated_at: string;
  };
  geometry: {
    type: GeoJsonTypes;
    coordinates: number[][][]; // Adjust this if the structure of the coordinates differs
  };
}

interface RepeatInterval {
  annually: {
    [name: number]: number[];
  };
  daily: string[];
  weekly: number[];
  monthly: number[];
}

interface RecurrenceInfo {
  interval: number;
  frequency: Option | null;
  startDate: string | null;
  startTime: string | null;
  endDate: string | null;
  endTime: string | null;
  repeatIntervals: RepeatInterval;
}

interface LocationFilter {
  region: Option[];
  area: Option[];
  branch: Option[];
}

interface AppConfig {
  DEFAULT_COMPLETED_TASK_STATUS_ID: string | null;
  DEFAULT_ESTIMATED_TASK_DURATION_IN_HOURS: string | null;
}

interface GenericTableProps {
  isLoading?: boolean;
  isFetching?: boolean;
  emptyText?: string;
  showFooter?: boolean;
  emptyLines?: number;
  pageNumber?: number;
  pageSize?: number;
  totalPages?: number;
  selectedRows?: number[];
  disabledRows?: number[];
  setSelectedRows?: React.Dispatch<React.SetStateAction<number[]>>;
  setPageNumber?: React.Dispatch<React.SetStateAction<number>>;
  setPageSize?: React.Dispatch<React.SetStateAction<number>>;
  isSelectable?: boolean;
  selectMultipleRows?: boolean;
  showPopover?: boolean;
  showEmptyState?: boolean;
}

interface Document {
  documentId: number | null;
  documentName: string | null;
  base64Document: string | null;
  base64Prefix: string | null;
}

type ActionType = 'bulk' | 'filter' | null;

interface sidebarChildren {
  name: string;
  route: string;
}

interface SideBarData {
  name: string;
  route: string;
  icon: ComponentWithAs<'svg', IconProps>;
  permissionKey: ModuleKey;
  contextId?: (typeof SYSTEM_CONTEXT_TYPE)[keyof typeof SYSTEM_CONTEXT_TYPE];
  description?: string;
  children?: SidebarChildren[];
}

interface SidebarChildren {
  name: string;
  route: string;
}

type ContextKey =
  | 'ASSETS'
  | 'MAINTENANCE_PLANS'
  | 'MAINTENANCE_SCHEDULES'
  | 'MAINTENANCE_SCHEDULE_INSTANCE'
  | 'TASKS'
  | 'TICKETS'
  | 'USER'
  | 'VENDOR'
  | 'AUDIT'
  | 'COMPANY'
  | 'COMPLIANCE'
  | 'FEEDBACK'
  | 'NOTES'
  | 'USERROLE'
  | 'GROUP'
  | 'ASSET_TRANSFER'
  | 'ASSET_DISPOSAL'
  | 'ASSET_BULK_ACTION';

interface SystemContextDetail {
  id: (typeof SYSTEM_CONTEXT_TYPE)[keyof typeof SYSTEM_CONTEXT_TYPE];
  route: (typeof ROUTES)[keyof typeof ROUTES];
  slug: string;
  relatedPermissionKeys?: ModuleKey[];
  displayName: string;
  label: string;
}

interface ImageObject {
  imageId: number | null;
  imageName: string | null;
  base64PhotoImage: string;
  base64Prefix: string | null;
}

interface BaseDto {
  createdBy?: string;
  lastModifiedBy?: string;
  changeInitiatedBy?: string | null;
  actionType?: (typeof FORM_ENUM)[keyof typeof FORM_ENUM];
}

interface LocationDto extends BaseDto {
  lgaId: number | null;
  facilityId: number | null;
  buildingId: number | null;
  floorId: number | null;
  departmentId: number | null;
  roomId: number | null;
  locationId?: number | null;
  aisleId: number | null;
  shelfId: number | null;
}

interface BaseUpdateDto {
  changeInitiatedBy: string | null;
  actionType: (typeof FORM_ENUM)[keyof typeof FORM_ENUM];
}

type ExportTableName =
  | 'Assets'
  | 'AssetCompliances'
  | 'AuditRecords'
  | 'Users'
  | 'Vendors'
  | 'Tickets'
  | 'Tasks';

type ValidFileType =
  | 'application/pdf'
  | 'application/msword'
  | 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
  | 'application/vnd.ms-excel'
  | 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
  | 'application/vnd.ms-powerpoint'
  | 'application/vnd.openxmlformats-officedocument.presentationml.presentation'
  | 'text/plain'
  | 'image/jpeg';

interface DataUpload {
  isNew: boolean;
  createdDate: Date;
  createdBy: string;
  lastModifiedDate: Date;
  lastModifiedBy: string;
  isDeleted: boolean;
  deletedDate: Date;
  deletedBy: string;
  guid: string;
  dataUploadHistoryId: number;
  dataUploadId: number;
  stageName: string;
  stageId: number;
  stageStatusId: number;
  stageStatusName: string;
  dateCreated: Date;
}

interface FailedUploadItems extends BaseEntity {
  dataUploadFailedItemId: number;
  dataUploadId: number;
  tabName: string;
  cell: string;
  reason: string;
  dateCreated: Date;
}

interface DataUploadStageHistory {
  dataUploadHistoryId: number;
  dataUploadId: number;
  stageName: string | null;
  stageId: number | null;
  stageStatusId: number | null;
  stageStatusName: string | null;
  dateCreated: string;
}

export type {
  ActionType,
  AppConfig,
  BaseDto,
  BaseUpdateDto,
  ContextKey,
  Document,
  GenericTableProps,
  GeoJSONFeature,
  ImageObject,
  LocationDto,
  LocationFilter,
  Option,
  RecurrenceInfo,
  RepeatInterval,
  SearchCriterion,
  sidebarChildren,
  SideBarData,
  SystemContextDetail,
  ExportTableName,
  ValidFileType,
  DataUpload,
  FailedUploadItems,
  DataUploadStageHistory,
};
