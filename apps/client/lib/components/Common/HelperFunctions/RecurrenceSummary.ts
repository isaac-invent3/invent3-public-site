import _ from 'lodash';
import moment from 'moment';
import { dateFormatter } from '~/lib/utils/Formatters';

const formatAnnualRepeats = (annualIntervals: { [name: number]: number[] }) => {
  try {
    const formattedValue = _(annualIntervals)
      // Convert object entries to an array and filter out months with no days
      .toPairs()
      // eslint-disable-next-line no-unused-vars
      .filter(([month, days]) => days.length > 0)
      // Sort the months by month number in ascending order
      .sortBy(([month]) => Number(month))
      .map(([month, days]) => {
        // Sort days in ascending order
        const sortedDays = _.sortBy(days);
        // Convert month number to month name
        const monthName = moment()
          .month(Number(month) - 1)
          .format('MMMM');
        // Format days as a comma-separated string
        const formattedDays = sortedDays.join(', ');
        return `${monthName} ${formattedDays}`;
      })
      .join(', ');
    return formattedValue;
  } catch {
    return '';
  }
};

// Helper to format recurrence interval and suffix
const formatRecurrenceInterval = (interval: number) => {
  const recurrenceInterval = interval > 1 ? ` ${interval}` : '';
  const intervalSuffix = interval > 1 ? 's' : '';
  return { recurrenceInterval, intervalSuffix };
};

const formatEndDateLabel = (endDate: string | null) =>
  endDate ? `, until ${dateFormatter(endDate, 'MMM D, YYYY')}` : '';

const formatDaily = (occurrences: any, interval: number) => {
  const { recurrenceInterval, intervalSuffix } =
    formatRecurrenceInterval(interval);
  try {
    const times = (occurrences as string[])
      .map((time) => dateFormatter(time, 'hh:mm A', ['HH:mm']))
      .join(', ');
    return `Repeats every${recurrenceInterval} day${intervalSuffix} at ${times}`;
  } catch {
    return '';
  }
};

const formatWeekly = (occurrences: any, interval: number) => {
  const { recurrenceInterval, intervalSuffix } =
    formatRecurrenceInterval(interval);
  try {
    const daysOfWeek = _.sortBy(occurrences)
      .map((dayNumber) => moment().day(dayNumber).format('dddd'))
      .join(', ');
    return `Repeats every${recurrenceInterval} week${intervalSuffix} on ${daysOfWeek}`;
  } catch {
    return '';
  }
};

const formatMonthlyOrQuarterly = (occurrences: any, interval: number) => {
  const { recurrenceInterval, intervalSuffix } =
    formatRecurrenceInterval(interval);
  try {
    const daysOfMonth = _.sortBy(occurrences).join(', ');
    return `Repeats every${recurrenceInterval} month${intervalSuffix} on day ${daysOfMonth}`;
  } catch {
    return '';
  }
};

const formatAnnually = (occurrences: any, interval: number) => {
  const { recurrenceInterval, intervalSuffix } =
    formatRecurrenceInterval(interval);
  const formattedAnnualRepeats = formatAnnualRepeats(occurrences);
  return `Repeats every${recurrenceInterval} year${intervalSuffix} on ${formattedAnnualRepeats}`;
};

function parseOccurrences(occurrences: any) {
  if (!occurrences) return null; // Return null if input is null or undefined

  try {
    if (occurrences.includes(':')) {
      // Handle object-like string
      const objectString = occurrences.replace(/(\d+):/g, '"$1":');
      const parsedObject = JSON.parse(objectString); // Parse to JavaScript object
      return Object.fromEntries(
        Object.entries(parsedObject).map(([key, value]) => [Number(key), value])
      ); // Convert keys to numbers
    } else {
      // Handle array-like string
      return JSON.parse(occurrences);
    }
  } catch {
    return null; // Return null if parsing fails
  }
}

interface SummaryTextProps {
  occurrences: any;
  frequency: string | undefined;
  endDate: string | null;
  interval: number;
}
const summaryText = ({
  occurrences,
  frequency,
  endDate,
  interval,
}: SummaryTextProps) => {
  const endDateLabel = formatEndDateLabel(endDate);
  switch (frequency) {
    case 'Daily':
      return `${formatDaily(occurrences, interval)}${endDateLabel}`;
    case 'Weekly':
      return `${formatWeekly(occurrences, interval)}${endDateLabel}`;
    case 'Monthly':
    case 'Quarterly':
      return `${formatMonthlyOrQuarterly(occurrences, interval)}${endDateLabel}`;
    case 'Annually':
      return `${formatAnnually(occurrences, interval)}${endDateLabel}`;
    default:
      return '';
  }
};

export { summaryText, parseOccurrences };
