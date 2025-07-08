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
  stringFormat?: string | string[]
) => {
  if (date) {
    if (stringFormat) {
      return moment
        .utc(date, stringFormat)
        .local()
        .format(format ?? 'DD-MM-YYYY');
    }
    return moment
      .utc(date)
      .local()
      .format(format ?? 'DD-MM-YYYY');
  }
  return null;
};

export { amountFormatter, dateFormatter };
