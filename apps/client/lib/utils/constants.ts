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
};

const SYSTEM_CONTEXT_TYPE = {
  ASSETS: 1,
  ASSET_TYPE: 30,
  TASKS: 2,
  TICKETS: 3,
  MAINTENANCE_PLANS: 4,
  MAINTENANCE_SCHEDULES: 5,
  USERS: 6,
  MAINTENANCE_SCHEDULE_INSTANCES: 40,
  TASKS_INSTANCES: 61,
  NOTES: 43,
  VENDOR: 68,
  AUDIT: 73,
  COMPANY: 0,
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
  APPROVAL:'approval-flow'
};

const SYSTEM_CONTEXT_DETAILS: Record<ContextKey, SystemContextDetail> = {
  ASSETS: {
    id: SYSTEM_CONTEXT_TYPE.ASSETS,
    route: ROUTES.ASSETS,
    slug: 'assetId',
    displayName: 'Asset Management',
    relatedPermissionKeys: ['task'],
  },

  MAINTENANCE_PLANS: {
    id: SYSTEM_CONTEXT_TYPE.MAINTENANCE_PLANS,
    route: ROUTES.MAINTENANCE_PLANS,
    slug: 'maintenancePlanId',
    relatedPermissionKeys: ['task'],
    displayName: 'Maintenance Plans',
  },
  MAINTENANCE_SCHEDULES: {
    id: SYSTEM_CONTEXT_TYPE.MAINTENANCE_SCHEDULES,
    route: ROUTES.MAINTENANCE_SCHEDULES,
    slug: 'maintenanceScheduleId',
    relatedPermissionKeys: ['task'],
    displayName: 'Maintenance Schedules',
  },
  MAINTENANCE_SCHEDULE_INSTANCE: {
    id: SYSTEM_CONTEXT_TYPE.MAINTENANCE_SCHEDULE_INSTANCES,
    route: ROUTES.MAINTENANCE_SCHEDULES,
    slug: 'maintenanceScheduleInstanceId',
    relatedPermissionKeys: ['task'],
    displayName: 'Maintenance Schedule Instance',
  },
  TASKS: {
    id: SYSTEM_CONTEXT_TYPE.TASKS,
    route: ROUTES.TASKS,
    slug: 'taskId',
    displayName: 'Task Management',
  },
  TICKETS: {
    id: SYSTEM_CONTEXT_TYPE.TICKETS,
    route: ROUTES.TICKETS,
    slug: 'ticketId',
    relatedPermissionKeys: ['task'],
    displayName: 'Ticket Management',
  },
  USER: {
    id: SYSTEM_CONTEXT_TYPE.USERS,
    route: ROUTES.USERS,
    slug: 'userId',
    displayName: 'User Management',
  },
  VENDOR: {
    id: SYSTEM_CONTEXT_TYPE.VENDOR,
    route: ROUTES.VENDOR,
    slug: 'vendorId',
    displayName: 'Vendor Management',
  },
  COMPANY: {
    id: SYSTEM_CONTEXT_TYPE.COMPANY,
    route: ROUTES.COMPANY,
    slug: 'companyId',
    displayName: 'Company Management',
  },
  AUDIT: {
    id: SYSTEM_CONTEXT_TYPE.AUDIT,
    route: ROUTES.AUDIT_LOG,
    slug: 'logId',
    displayName: 'Audits',
  },
};

const NOTIFICATION_EVENT_TYPE_ENUM = {
  TICKET_CREATED: 3,
};

const ASSET_GROUP_TYPE = {
  ASSET_TYPE: 1,
};

const DEFAULT_PAGE_SIZE = 25;

const SYSTEM_ROLES = {
  LOGIN: 1,
  ADMIN: 2,
  FRONT_DESK: 3,
  EXECUTIVE: 4,
  MANAGER: 5,
  TEAM_MEMBERS: 6,
  VISITORS: 7,
};

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

const USER_STATUS_ENUM = {
  ACTIVE: 1,
  NON_ACTIVE: 2,
};

export {
  AREA_ENUM,
  ASSET_GROUP_TYPE,
  COLOR_CODES_FALLBACK,
  DATE_PERIOD,
  DEFAULT_PAGE_SIZE,
  FILE_ICONS,
  FORM_ENUM,
  INSTANCE_UPDATE_ENUM,
  MAINTENANCE_PLAN_ENUM,
  monthOptions,
  NOTIFICATION_EVENT_TYPE_ENUM,
  OPERATORS,
  planScopeOptions,
  ROUTES,
  STATUS_CATEGORY_ENUM,
  SYSTEM_CONTEXT_TYPE,
  SYSTEM_CONTEXT_DETAILS,
  SYSTEM_ROLES,
  timeRangeOptions,
  yearOptions,
  EXPORT_TYPE_ENUM,
  ROLE_IDS_ENUM,
  COMPANY_TYPE_ENUM,
  USER_STATUS_ENUM,
};
