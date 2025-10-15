import moment from 'moment';

const dateFormatter = (
  date: string | Date | null | undefined,
  format?: string,
  stringFormat?: string | string[],
  useLocal: boolean = true
) => {
  if (!date) return null;

  const m = stringFormat ? moment.utc(date, stringFormat) : moment.utc(date);

  if (useLocal) {
    m.local();
  }

  return m.format(format ?? 'DD-MM-YYYY');
};

export { dateFormatter };
