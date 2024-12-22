import moment, { Moment } from 'moment';

type DateInput = string | number | Date | Moment;

interface DateUtils {
  format: (date: DateInput, format?: string) => string;
  parse: (dateString: string, format?: string) => Moment;
  now: () => Moment;
  add: (
    date: DateInput,
    amount: number,
    unit: moment.unitOfTime.DurationConstructor
  ) => Moment;
  subtract: (
    date: DateInput,
    amount: number,
    unit: moment.unitOfTime.DurationConstructor
  ) => Moment;
  diff: (
    date1: DateInput,
    date2: DateInput,
    unit?: moment.unitOfTime.Diff
  ) => number;
  toISOString: (date: DateInput) => string;
  isUTCOffset: (date: DateInput) => boolean;
  utcOffset: (date: DateInput, offSet?: number, keepLocal?: boolean) => Moment;
  isBefore: (date1: DateInput, date2: DateInput) => boolean;
  isAfter: (date1: DateInput, date2: DateInput) => boolean;
  parseAndFormat: (
    dateString: string,
    inputFormat: string,
    outputFormat: string
  ) => string;
}

const dateUtils: DateUtils = {
  // Format a date to a specific format
  format: (date, format = 'YYYY-MM-DD') => moment(date).format(format),

  // Parse a date string to a moment object
  parse: (dateString, format = 'YYYY-MM-DD') => moment(dateString, format),

  // Get the current date
  now: () => moment(),

  // Add time to a date
  add: (date, amount, unit) => moment(date).add(amount, unit),

  // Subtract time from a date
  subtract: (date, amount, unit) => moment(date).subtract(amount, unit),

  // Calculate the difference between two dates
  diff: (date1, date2, unit = 'milliseconds') =>
    moment(date1).diff(moment(date2), unit),

  // Convert a date to ISO 8601 string
  toISOString: (date) => moment(date).toISOString(),

  // Check if a date has a UTC offset
  isUTCOffset: (date) => moment(date).utcOffset() !== 0,

  // Get the UTC offset
  utcOffset: (date, offSet, keepLocal) =>
    moment(date).utcOffset(offSet ?? 0, keepLocal),

  // Compare if one date is before another
  isBefore: (date1, date2) => moment(date1).isBefore(moment(date2)),

  // Compare if one date is after another
  isAfter: (date1, date2) => moment(date1).isAfter(moment(date2)),

  // Parse a date in one format and format it into another
  parseAndFormat: (dateString, inputFormat, outputFormat) =>
    moment(dateString, inputFormat).format(outputFormat),
};

export default dateUtils;
