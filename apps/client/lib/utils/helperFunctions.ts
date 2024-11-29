import moment from 'moment';
import { AssetFormDocument } from '../interfaces/asset.interfaces';
import { ActualProjectedData } from '../interfaces/dashboard.interfaces';
import { FILE_ICONS, OPERATORS } from './constants';
import nigeriaStatesByLandSize from './NigeriaCordinates/landSize';
import { Event as EventType, View } from 'react-big-calendar';
import { SearchCriterion } from '../interfaces/general.interfaces';

interface IOption {
  [key: string]: any;
}

function generateOptions(
  options: IOption[] | undefined,
  labelKey: string | string[],
  valueKey: string
) {
  const selectOptions = [];

  if (options?.length) {
    for (let i = 0; i < options.length; i++) {
      if (options[i]) {
        // Handle labelKey being a string or array of strings
        const label = Array.isArray(labelKey)
          ? labelKey.map((key) => options[i]?.[key] ?? '').join(' ') // Concatenate labels with spaces
          : (options[i]?.[labelKey] ?? '');

        selectOptions.push({
          label: label,
          value: options[i]?.[valueKey] ?? '',
        });
      }
    }
  }

  return selectOptions;
}

function getDocumentInfo(document: AssetFormDocument) {
  let mimeType: string;
  let base64Data: string;
  let extensionName: keyof typeof FILE_ICONS;

  // Check if the base64 string has a prefix like 'data:application/pdf;base64,'
  const base64WithPrefixPattern = /^data:(.+);base64,(.+)$/;
  const matches = document.base64Document.match(base64WithPrefixPattern);

  extensionName =
    (document.documentName?.substring(
      document.documentName.lastIndexOf('.') + 1
    ) as 'pdf') || 'invalid';

  if (matches) {
    // Case 1: The base64Document includes the MIME type prefix
    mimeType = matches[1] as string;
    base64Data = matches[2] as string;
  } else if (document.base64Prefix) {
    // Case 2: No MIME type in the base64Document, use base64Prefix
    mimeType = document.base64Prefix;
    base64Data = document.base64Document;
  } else {
    throw new Error('No valid MIME type found.');
  }

  // Calculate the document size in bytes
  const sizeInBytes =
    (base64Data.length * 3) / 4 -
    (base64Data.endsWith('==') ? 2 : base64Data.endsWith('=') ? 1 : 0);

  // Convert size from bytes to MB
  const sizeInMB = sizeInBytes / (1024 * 1024);

  return {
    mimeType,
    extensionName,
    sizeInBytes,
    sizeInMB,
  };
}
const getScaleByStateSize = (stateName: string) => {
  const size = nigeriaStatesByLandSize?.[stateName as 'Abia'];

  if (!size) {
    return 8000;
  }

  if (size < 10000) {
    return 23000;
  } else if (size >= 10000 && size < 20000) {
    return 16000;
  } else if (size >= 20000 && size < 25000) {
    return 13000;
  } else if (size >= 25000 && size < 35000) {
    return 11500;
  } else if (size >= 35000 && size < 50000) {
    return 11000;
  } else if (size >= 50000) {
    return 8000;
  }
};

function formatNumberShort(value: number) {
  if (value >= 1e12) {
    return (value / 1e12).toFixed(1) + 'T'; // Trillions
  } else if (value >= 1e9) {
    return (value / 1e9).toFixed(1) + 'B'; // Billions
  } else if (value >= 1e6) {
    return (value / 1e6).toFixed(1) + 'M'; // Millions
  } else if (value >= 1e3) {
    return (value / 1e3).toFixed(1) + 'K'; // Thousands
  } else {
    return value.toString(); // Less than 1,000
  }
}

function generateLastFiveYears() {
  const currentYear = new Date().getFullYear();
  const yearsArray = [];

  for (let i = 0; i < 5; i++) {
    const year = currentYear - i;
    yearsArray.push({ label: year.toString(), value: year.toString() });
  }

  return yearsArray;
}

function transformCostsData(
  data: ActualProjectedData[] | undefined,
  showWeeks: boolean = false
) {
  const monthLabels = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];
  const weekLabels = ['Week 1', 'Week 2', 'Week 3', 'Week 4'];

  // Return empty arrays if data is undefined or empty
  if (!data || data.length === 0) {
    return { projectedCost: [], actualCost: [], labels: [] };
  }

  const projectedCost = data.map((item) => item.projectedCost);
  const actualCost = data.map((item) => item.actualCost);
  const labels = data.map((item) => {
    if (showWeeks && item.weekId && item.weekId >= 1 && item.weekId <= 4) {
      return weekLabels[item.weekId - 1]; // Subtract 1 to get 0-based index
    } else if (item.monthId >= 1 && item.monthId <= 12) {
      return monthLabels[item.monthId - 1]; // Subtract 1 to get 0-based index
    }
    return 'Unknown'; // Fallback label
  });

  return {
    projectedCost,
    actualCost,
    labels,
  };
}

// Function to transform data into react-big-calendar events
const transformToCalendarEvents = (data: any[]): EventType[] => {
  return data.map((item, index) => {
    return {
      id: index,
      title: 'Scheduled Event',
      start: new Date(item.scheduledDate),
      end:
        item?.completionDate || item?.maxCompletionDate
          ? new Date(item.maxCompletionDate || item.completionDate)
          : new Date(new Date(item.scheduledDate).getTime() + 60 * 60 * 1000),
      allDay: false,
      resource: { ...item },
    };
  });
};

const getDisplayDate = (date: Date, view: View) => {
  let startDate: string = '';
  let endDate: string = '';
  let displayDate: string = '';

  if (view === 'day') {
    // Day view: from 00:00:00 to 23:59:59 of the selected day
    startDate = moment(date).startOf('day').toISOString();
    endDate = moment(date).endOf('day').toISOString();
    displayDate = moment(date).format('MMMM Do, YYYY');
  } else if (view === 'week') {
    // Week view: from 00:00:00 of the start of the week to 23:59:59 of the end of the week
    const startOfWeek = moment(date).startOf('week');
    const endOfWeek = moment(date).endOf('week');

    startDate = startOfWeek.toISOString();
    endDate = endOfWeek.toISOString();

    const sameMonth = startOfWeek.isSame(endOfWeek, 'month');
    displayDate = sameMonth
      ? `${startOfWeek.format('MMMM D')} - ${endOfWeek.format('D, YYYY')}`
      : `${startOfWeek.format('MMMM D')} - ${endOfWeek.format('MMMM D, YYYY')}`;
  } else if (view === 'month') {
    // Month view: from 00:00:00 of the first day of the month to 23:59:59 of the last day of the month
    const startOfMonth = moment(date).startOf('month');
    const endOfMonth = moment(date).endOf('month');

    startDate = startOfMonth.toISOString();
    endDate = endOfMonth.toISOString();
    displayDate = moment(date).format('MMMM, YYYY');
  }

  return {
    startDate,
    endDate,
    displayDate,
  };
};

const formattedDateTime = (date: Date | null, time: string | null) => {
  const formatted = time
    ? moment(`${moment(date).format('YYYY-MM-DD')} ${time}`, 'YYYY-MM-DD HH:mm')
    : moment(date);

  return formatted;
};

const generateSearchCriterion = (
  columnName: string,
  columnValues: (string | number)[],
  operator: (typeof OPERATORS)[keyof typeof OPERATORS]
) => {
  const finalSearchCriterion: SearchCriterion[] = [];

  columnValues.forEach((item) =>
    finalSearchCriterion.push({
      columnName,
      columnValue: item,
      operation: operator,
    })
  );
  return finalSearchCriterion;
};

export {
  generateOptions,
  getDocumentInfo,
  getScaleByStateSize,
  formatNumberShort,
  generateLastFiveYears,
  transformCostsData,
  transformToCalendarEvents,
  getDisplayDate,
  formattedDateTime,
  generateSearchCriterion,
};
