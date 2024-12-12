import moment from 'moment';

const dateFormatter = (
  date: string | Date | null | undefined,
  format?: string,
  stringFormat?: string | string[]
) => {
  if (date) {
    if (stringFormat) {
      return moment(date, stringFormat).format(format ?? 'DD-MM-YYYY');
    }
    return moment(date).format(format ?? 'DD-MM-YYYY');
  }
  return null;
};

export default dateFormatter;
