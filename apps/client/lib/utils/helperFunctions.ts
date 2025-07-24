import { Option } from '@repo/interfaces';
import moment from 'moment';
import { Event as EventType, View } from 'react-big-calendar';
import { ActualProjectedData } from '../interfaces/dashboard.interfaces';
import { FILE_ICONS } from './constants';
import nigeriaStatesByLandSize from './NigeriaCordinates/landSize';
import { Document } from '../interfaces/general.interfaces';
import { getSession } from 'next-auth/react';
import { env } from 'next-runtime-env';
const baseURL = env('NEXT_PUBLIC_API_URL');

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

function getSelectedOption(options: Option[], value: number | string) {
  const selectedOption = options.find((item) => item.value === value);

  if (selectedOption) return selectedOption;

  return { value: '', label: '' };
}

function getDocumentInfo(document: Document) {
  let mimeType: string | null = null;
  let base64Data: string | null = null;
  let extensionName: keyof typeof FILE_ICONS;

  // Check if the base64 string has a prefix like 'data:application/pdf;base64,'
  const base64WithPrefixPattern = /^data:(.+);base64,(.+)$/;
  let matches;
  if (document?.base64Document && typeof document.base64Document === 'string') {
    matches = document.base64Document.match(base64WithPrefixPattern);
  }

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
  }

  // Calculate the document size in bytes
  const sizeInBytes = base64Data
    ? (base64Data.length * 3) / 4 -
      (base64Data.endsWith('==') ? 2 : base64Data.endsWith('=') ? 1 : 0)
    : 0;

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
    return (value / 1e12)?.toFixed(2) + 'T'; // Trillions
  } else if (value >= 1e9) {
    return (value / 1e9)?.toFixed(2) + 'B'; // Billions
  } else if (value >= 1e6) {
    return (value / 1e6)?.toFixed(2) + 'M'; // Millions
  } else if (value >= 1e3) {
    return (value / 1e3)?.toFixed(2) + 'K'; // Thousands
  } else {
    return value?.toString(); // Less than 1,000
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

const extractTenantFromUrl = (): string | null | undefined => {
  try {
    const { pathname } = window.location;
    const segments = pathname.split('/').filter(Boolean); // Remove empty parts

    if (segments.length >= 2 && segments[1] === 'signin') {
      return segments[0];
    }

    return null;
  } catch (error) {
    return null;
  }
};

const handleExport = async (filePath: string) => {
  const session = await getSession();

  try {
    const response = await fetch(
      `${baseURL}/api/Invent3Pro/Download?filePath=${filePath}`,
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${session?.user.accessToken}`,
          Apikey: `${session?.user.apiKey}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error(`Failed to download file: ${response.statusText}`);
    }

    const blob = await response.blob();

    // Trigger download
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filePath ?? '';
    document.body.appendChild(a);
    a.click();

    // Cleanup
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
  } catch (error) {
    console.error('Error downloading file:', error);
  }
};

export {
  formatNumberShort,
  formattedDateTime,
  generateLastFiveYears,
  generateOptions,
  getDisplayDate,
  getDocumentInfo,
  getScaleByStateSize,
  getSelectedOption,
  transformCostsData,
  transformToCalendarEvents,
  extractTenantFromUrl,
  handleExport,
};
