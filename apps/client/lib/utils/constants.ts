import {
  AiOutlineFilePdf,
  AiOutlineFileWord,
  AiOutlineFileExcel,
  AiOutlineFilePpt,
  AiOutlineFileText,
  AiOutlineFileImage,
  AiOutlineQuestion,
} from 'react-icons/ai';

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
  TASKS: 2,
  TICKETS: 3,
  MAINTENANCE_PLANS: 4,
  MAINTENANCE_SCHEDULES: 5,
  USERS: 6,
  MAINTENANCE_SCHEDULE_INSTANCES: 40,
  TASKS_INSTANCES: 61,
  NOTES: 43,
};

const DEFAULT_PAGE_SIZE = 25;

export {
  OPERATORS,
  FORM_ENUM,
  AREA_ENUM,
  FILE_ICONS,
  MAINTENANCE_PLAN_ENUM,
  DATE_PERIOD,
  timeRangeOptions,
  yearOptions,
  monthOptions,
  planScopeOptions,
  STATUS_CATEGORY_ENUM,
  COLOR_CODES_FALLBACK,
  DEFAULT_PAGE_SIZE,
  SYSTEM_CONTEXT_TYPE,
};
