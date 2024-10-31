import {
  AiOutlineFilePdf,
  AiOutlineFileWord,
  AiOutlineFileExcel,
  AiOutlineFilePpt,
  AiOutlineFileText,
  AiOutlineFileImage,
  AiOutlineQuestion,
} from 'react-icons/ai';
import { Option } from '../interfaces/general.interfaces';

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

const timeRangeOptions = [
  {
    label: 'Last 7 days',
    value: 7,
  },
  {
    label: 'Last 30 days',
    value: 30,
  },
  {
    label: 'Last 90 days',
    value: 90,
  },
  {
    label: 'Last 1 year',
    value: 365,
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

const repeatOptions: Option[] = [
  {
    label: 'Daily',
    value: 1,
  },
  {
    label: 'Weekly',
    value: 2,
  },
  {
    label: 'Monthly',
    value: 3,
  },
  {
    label: 'Annually',
    value: 4,
  },
];

export {
  OPERATORS,
  FORM_ENUM,
  AREA_ENUM,
  FILE_ICONS,
  MAINTENANCE_PLAN_ENUM,
  timeRangeOptions,
  yearOptions,
  monthOptions,
  planScopeOptions,
  repeatOptions,
};
