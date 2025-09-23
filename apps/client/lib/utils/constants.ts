import {
  AiOutlineFileExcel,
  AiOutlineFileImage,
  AiOutlineFilePdf,
  AiOutlineFilePpt,
  AiOutlineFileText,
  AiOutlineFileWord,
  AiOutlineQuestion,
} from 'react-icons/ai';
import {
  ContextKey,
  SystemContextDetail,
} from '../interfaces/general.interfaces';

const OPERATORS = {
  Equals: 1,
  NotEquals: 2,
  GreaterThan: 3,
  GreaterThanOrEquals: 4,
  LessThan: 5,
  LessThanOrEquals: 6,
  Contains: 7,
  StartsWith: 8,
  EndsWith: 9,
};

const COLOR_CODES_FALLBACK = {
  default: '#8595A5',
};

const FORM_ENUM = {
  add: 1,
  delete: 2,
  update: 3,
};

const INSTANCE_UPDATE_ENUM = {
  ONLY_THIS_INSTANCE: 1,
  CURRENT_AND_FUTURE_INSTANCES: 2,
};

const AREA_ENUM = {
  country: 1,
  state: 2,
};

const MAINTENANCE_PLAN_ENUM = {
  default: 1,
  custom: 2,
};

const FILE_ICONS = {
  pdf: AiOutlineFilePdf,
  doc: AiOutlineFileWord,
  docx: AiOutlineFileWord,
  xls: AiOutlineFileExcel,
  xlsx: AiOutlineFileExcel,
  ppt: AiOutlineFilePpt,
  pptx: AiOutlineFilePpt,
  txt: AiOutlineFileText,
  jpeg: AiOutlineFileImage,
  jpg: AiOutlineFileImage,
  invalid: AiOutlineQuestion,
};

const DATE_PERIOD = {
  WEEK: 7,
  MONTH: 30,
  QUARTER: 90,
  YEAR: 365,
};

const timeRangeOptions = [
  {
    label: 'Last 7 days',
    value: DATE_PERIOD.WEEK,
  },
  {
    label: 'Last 30 days',
    value: DATE_PERIOD.MONTH,
  },
  {
    label: 'Last 90 days',
    value: DATE_PERIOD.QUARTER,
  },
  {
    label: 'Last 1 year',
    value: DATE_PERIOD.YEAR,
  },
];

const yearOptions = [
  {
    label: '2024',
    value: 2024,
  },
  {
    label: '2023',
    value: 2023,
  },
];

const monthOptions = [
  {
    label: 'All',
    value: 0,
  },
  {
    label: 'January',
    value: 1,
  },
  {
    label: 'February',
    value: 2,
  },
  {
    label: 'March',
    value: 3,
  },
  {
    label: 'April',
    value: 4,
  },
  {
    label: 'May',
    value: 5,
  },
  {
    label: 'June',
    value: 6,
  },
  {
    label: 'July',
    value: 7,
  },
  {
    label: 'August',
    value: 8,
  },
  {
    label: 'September',
    value: 9,
  },
  {
    label: 'October',
    value: 10,
  },
  {
    label: 'November',
    value: 11,
  },
  {
    label: 'December',
    value: 12,
  },
];

const planScopeOptions = [
  {
    label: 'Asset',
    value: 'asset',
  },
  {
    label: 'Asset Group',
    value: 'asset_group',
  },
];

const STATUS_CATEGORY_ENUM = {
  ACTIVE: 1,
  INACTIVE: 2,
  COMPLETED: 3,
};

const SYSTEM_CONTEXT_TYPE = {
  ASSETS: 1,
  ASSET_TYPE: 30,
  ASSET_CATEGORY: 18,
  ASSET_COMPLIANCE: 146,
  ASSET_TRANSFER: 99,
  ASSET_DISPOSAL: 77,
  ASSET_BULK_ACTION: 171,
  TASKS: 2,
  TICKETS: 3,
  MAINTENANCE_PLANS: 4,
  MAINTENANCE_SCHEDULES: 5,
  USERS: 6,
  MAINTENANCE_SCHEDULE_INSTANCE: 40,
  TASKS_INSTANCES: 61,
  NOTES: 43,
  VENDOR: 68,
  AUDIT: 73,
  COMPANY: 17,
  TEMPLATES: 65,
  ROLES: 56,
  FEEDBACK: 151,
  USER_ROLE: 125,
  GROUP: 36,
};

const ROUTES = {
  ASSETS: 'asset-management',
  DASHBOARD: 'dashboard',
  MAINTENANCE: 'maintenance',
  MAINTENANCE_HISTORY: 'history',
  MAINTENANCE_PLANS: 'plans',
  MAINTENANCE_SCHEDULES: 'schedules',
  PROFILE: 'profile',
  REPORT: 'report-analytics',
  TASKS: 'task-management',
  TEMPLATES: 'template-management',
  TICKETS: 'ticket-management',
  USERS: 'user-management',
  AUDIT_LOG: 'log-management',
  ROLES: 'role-management',
  COMPANY: 'company-management',
  VENDOR: 'vendor-management',
  SETTINGS: 'settings',
  USER_SETTINGS: 'user-settings',
  COMPLIANCE: 'compliance',
  FEEDBACK: 'feedback',
  APPROVAL: 'approval-flow',
  LOCATION: 'facility-management',
};

const SYSTEM_CONTEXT_DETAILS: Record<ContextKey, SystemContextDetail> = {
  ASSETS: {
    id: SYSTEM_CONTEXT_TYPE.ASSETS,
    route: ROUTES.ASSETS,
    slug: 'assetId',
    displayName: 'Asset Management',
    relatedPermissionKeys: ['task'],
    label: 'asset',
  },

  MAINTENANCE_PLANS: {
    id: SYSTEM_CONTEXT_TYPE.MAINTENANCE_PLANS,
    route: ROUTES.MAINTENANCE_PLANS,
    slug: 'maintenancePlanId',
    relatedPermissionKeys: ['task'],
    displayName: 'Maintenance Plans',
    label: 'maintenance plan',
  },
  MAINTENANCE_SCHEDULES: {
    id: SYSTEM_CONTEXT_TYPE.MAINTENANCE_SCHEDULES,
    route: ROUTES.MAINTENANCE_SCHEDULES,
    slug: 'maintenanceScheduleId',
    relatedPermissionKeys: ['task'],
    displayName: 'Maintenance Schedules',
    label: 'maintenance schedule',
  },
  MAINTENANCE_SCHEDULE_INSTANCE: {
    id: SYSTEM_CONTEXT_TYPE.MAINTENANCE_SCHEDULE_INSTANCE,
    route: ROUTES.MAINTENANCE_SCHEDULES,
    slug: 'maintenanceScheduleInstanceId',
    relatedPermissionKeys: ['task'],
    displayName: 'Maintenance Schedule Instance',
    label: 'maintenance schedule',
  },
  TASKS: {
    id: SYSTEM_CONTEXT_TYPE.TASKS,
    route: ROUTES.TASKS,
    slug: 'taskId',
    displayName: 'Task Management',
    label: 'task',
  },
  TICKETS: {
    id: SYSTEM_CONTEXT_TYPE.TICKETS,
    route: ROUTES.TICKETS,
    slug: 'ticketId',
    relatedPermissionKeys: ['task'],
    displayName: 'Ticket Management',
    label: 'ticket',
  },
  USER: {
    id: SYSTEM_CONTEXT_TYPE.USERS,
    route: ROUTES.USERS,
    slug: 'userId',
    displayName: 'User Management',
    label: 'user',
  },
  VENDOR: {
    id: SYSTEM_CONTEXT_TYPE.VENDOR,
    route: ROUTES.VENDOR,
    slug: 'vendorId',
    displayName: 'Vendor Management',
    label: 'vendor',
  },
  COMPANY: {
    id: SYSTEM_CONTEXT_TYPE.COMPANY,
    route: ROUTES.COMPANY,
    slug: 'companyId',
    displayName: 'Company Management',
    label: 'company',
  },
  COMPLIANCE: {
    id: SYSTEM_CONTEXT_TYPE.ASSET_COMPLIANCE,
    route: ROUTES.COMPLIANCE,
    slug: 'complianceId',
    displayName: 'Compliance',
    label: 'compliance',
  },
  AUDIT: {
    id: SYSTEM_CONTEXT_TYPE.AUDIT,
    route: ROUTES.AUDIT_LOG,
    slug: 'logId',
    displayName: 'Audits',
    label: 'audit',
  },
  FEEDBACK: {
    id: SYSTEM_CONTEXT_TYPE.FEEDBACK,
    route: ROUTES.FEEDBACK,
    slug: 'feedbackId',
    displayName: 'Feedbacks',
    label: 'feedback',
  },
  NOTES: {
    id: SYSTEM_CONTEXT_TYPE.NOTES,
    route: ROUTES.FEEDBACK,
    slug: 'noteId',
    displayName: 'Notes',
    label: 'note',
  },
  USERROLE: {
    id: SYSTEM_CONTEXT_TYPE.USER_ROLE,
    route: ROUTES.ROLES,
    slug: 'roleId',
    displayName: 'Roles',
    label: 'role',
  },
  GROUP: {
    id: SYSTEM_CONTEXT_TYPE.GROUP,
    route: ROUTES.ROLES,
    slug: 'groupId',
    displayName: 'Groups',
    label: 'group',
  },
  ASSET_TRANSFER: {
    id: SYSTEM_CONTEXT_TYPE.ASSET_TRANSFER,
    route: ROUTES.APPROVAL,
    slug: '',
    displayName: 'Asset Transfer',
    label: 'asset transfer',
  },
  ASSET_DISPOSAL: {
    id: SYSTEM_CONTEXT_TYPE.ASSET_DISPOSAL,
    route: ROUTES.APPROVAL,
    slug: '',
    displayName: 'Asset Disposal',
    label: 'asset diposal',
  },
  ASSET_BULK_ACTION: {
    id: SYSTEM_CONTEXT_TYPE.ASSET_BULK_ACTION,
    route: ROUTES.APPROVAL,
    slug: '',
    displayName: 'Bulk Action',
    label: 'bulk action',
  },
};

const NOTIFICATION_EVENT_TYPE_ENUM = {
  CREATE: 1,
  UPDATE: 2,
  DELETE: 3,
  SCHEDULE: 4,
  ASSIGNED: 5,
  APPROVED: 6,
  REJECTED: 7,
  REQUESTED: 8,
  COMPLETED: 9,
  CANCELLED: 10,
  TAG: 11,
  INFORM: 12,
  ADD: 13,
};

const ASSET_GROUP_TYPE = {
  ASSET_TYPE: 1,
};

const DEFAULT_PAGE_SIZE = 25;

const EXPORT_TYPE_ENUM = {
  CSV: 1,
  PDF: 2,
};

const ROLE_IDS_ENUM = {
  EXECUTIVE: 20,
  OPERATION_MANAGER: 21,
  CLIENT_ADMIN: 26,
  FRONT_DESK: 25,
  SUPER_ADMIN: 6,
  THIRD_PARTY: 27,
  FIELD_ENGINEER: 22,
};

const COMPANY_TYPE_ENUM = {
  MANAGE_OWN_DATA: 1,
  MANAGE_DATA_FOR_COMPANIES: 2,
};

const COMPANY_COMPLIANCE_ENUM = {
  COMPLIANT: 1,
  NON_COMPLIANT: 2,
  NOT_APPLICABLE: 3,
};

const USER_STATUS_ENUM = {
  ACTIVE: 1,
  NON_ACTIVE: 2,
};

const AUTHENTICATION_PROTOCOL_ENUM = {
  BASIC: 1,
  ACTIVE_DIRECTORY: 2,
};

const UNIT_ID = {
  DEGREE_CELSIUS: 8,
  RELATIVE_HUMIDITY: 10,
  LUX: 11,
  LUMEN: 12,
  CANDELA: 13,
  LUMINANCE: 14,
  PARTS_PER_MILLION: 15,
  KILOWATT_HOUR: 16,
};

const COMPLIANT_STATUS = {
  COMPLIANT: 1,
  NONCOMPLIANT: 2,
};

const APPROVAL_WORKFLOW_STATUSES = {
  NOT_STARTED: 1,
  IN_PROGRESS: 2,
  APPROVED: 3,
  REJECTED: 4,
  CANCELLED: 5,
  RESOVLED: 6,
};

const APPROVAL_ACTION = {
  REQUESTED_THE_APPROVAL: 6,
};

const ASSET_BULK_ACTION_TYPE = {
  ASSET_TRANSFER: 2,
  ASSET_DISPOSAL: 4,
};

const DATA_UPLOAD_STATUS = {
  InProgress: 1,
  Completed: 2,
  Failed: 3,
  Done: 4,
};

const APPROVAL_REQUEST_TYPES = {
  TRANSFER: 1,
  BULK_TRANSFER: 2,
  DISPOSAL: 3,
  BULK_DISPOSAL: 4,
};

const EMPLOYEE_TYPE_ENUM = {
  PART_TIME: 1,
  FULL_TIME: 2,
};

const FORECAST_TYPE_ENUM = {
  REPLACEMENT: 1,
  FAILURE: 2,
};

export {
  AREA_ENUM,
  ASSET_GROUP_TYPE,
  COLOR_CODES_FALLBACK,
  COMPANY_TYPE_ENUM,
  DATE_PERIOD,
  DEFAULT_PAGE_SIZE,
  EXPORT_TYPE_ENUM,
  FILE_ICONS,
  FORM_ENUM,
  INSTANCE_UPDATE_ENUM,
  MAINTENANCE_PLAN_ENUM,
  monthOptions,
  NOTIFICATION_EVENT_TYPE_ENUM,
  OPERATORS,
  planScopeOptions,
  ROLE_IDS_ENUM,
  ROUTES,
  STATUS_CATEGORY_ENUM,
  SYSTEM_CONTEXT_DETAILS,
  SYSTEM_CONTEXT_TYPE,
  timeRangeOptions,
  USER_STATUS_ENUM,
  yearOptions,
  AUTHENTICATION_PROTOCOL_ENUM,
  UNIT_ID,
  COMPLIANT_STATUS,
  APPROVAL_WORKFLOW_STATUSES,
  ASSET_BULK_ACTION_TYPE,
  DATA_UPLOAD_STATUS,
  APPROVAL_REQUEST_TYPES,
  APPROVAL_ACTION,
  COMPANY_COMPLIANCE_ENUM,
  EMPLOYEE_TYPE_ENUM,
  FORECAST_TYPE_ENUM,
};
