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
  AISLE: 15,
  APPROVAL_ACTIONS: 80,
  APPROVAL_ACTIONS_OPTIONS: 81,
  ASSET: 1,
  ASSET_CATEGORY: 18,
  ASSET_COMPONENTS: 19,
  ASSET_CONDITION: 20,
  ASSET_DEPRECIATION: 21,
  ASSET_DISPOSAL_REASONS: 78,
  ASSET_DISPOSAL_REQUESTS: 77,
  ASSET_DOCUMENTS: 22,
  ASSET_DOCUMENTS_LINK: 79,
  ASSET_GROUP_PLANS: 23,
  ASSET_GROUP_TYPES: 24,
  ASSET_IMAGES: 25,
  ASSET_PLANS: 26,
  ASSET_STATUS: 27,
  ASSET_SUB_CATEGORY: 28,
  ASSET_TRANSFERS: 29,
  ASSET_VENDOR_CONTRACTS: 31,
  ASSET_VENDORS: 32,
  ASSET_WARRANTY: 33,
  BUILDING: 11,
  COMPANY: 17,
  COUNTRIES: 8,
  DOCUMENT_TYPE: 34,
  EMPLOYEE: 35,
  FACILITY: 10,
  FLOOR: 12,
  GROUPS: 36,
  LOCATION: 7,
  MAINTENANCE_FREQUENCY: 37,
  MAINTENANCE_PLAN_STATUSES: 38,
  MAINTENANCE_PLAN_TYPES: 39,
  MAINTENANCE_SCHEDULE_INTERVALS: 41,
  MAINTENANCE_TYPE: 42,
  MENTAINANCE_PLAN: 4,
  NOTES_CONTEXT_MAP: 44,
  NOTIFICATION_HISTORY: 45,
  NOTIFICATIONS: 46,
  NOTIFICATIONS_DELIVERY_METHODS: 47,
  NOTIFICATIONS_PRIORITY: 48,
  NOTIFICATION_STATUS_TYPES: 49,
  NOTIFICATION_TRIGGER_EVENT_TYPES: 50,
  NOTIFICATION_TRIGGERS: 51,
  NOTIFICATION_TRIGGER_TYPES: 52,
  NOTIFICATION_TYPES: 53,
  PARENT_TYPE: 54,
  PERMISSIONS: 55,
  ROLES: 56,
  ROOM: 14,
  SHELF: 16,
  STATELGAS: 9,
  STATES: 57,
  STATUS_CATEGORY: 58,
  SYSTEM_CONTEXT_TYPES: 59,
  TASK_IMAGES: 60,
  TASK_INSTANCES: 61,
  TASK_PRIORITY: 62,
  TASK_STATUS: 63,
  TASK_TYPE: 64,
  TEMPLATES: 65,
  TICKET_TYPES: 66,
  USER_SESSIONS: 67,
  VENDOR_CONTRACT_DOCUMENTS: 69,
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
  FEEDBACK:'feedback'
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
  SYSTEM_ROLES,
  timeRangeOptions,
  USER_STATUS_ENUM,
  yearOptions,
};
