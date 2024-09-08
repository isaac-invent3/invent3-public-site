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
  date: string | Date,
  format?: string,
  stringFormat?: string
) => {
  if (stringFormat) {
    return moment(date, stringFormat).format(format ?? 'DD-MM-YYYY');
  }
  return moment(date).format(format ?? 'DD-MM-YYYY');
};

export { amountFormatter, dateFormatter };
