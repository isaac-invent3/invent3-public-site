import moment from 'moment';
import { NumericFormat } from 'react-number-format';

function amountFormatter(
  value: number,
  prefix: string = '₦',
  showDecimal: boolean = true
) {
  return (
    <NumericFormat
      value={value}
      displayType="text"
      thousandSeparator
      fixedDecimalScale={showDecimal}
      decimalScale={2}
      prefix={prefix}
    />
  );
}

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

export { amountFormatter, dateFormatter };
