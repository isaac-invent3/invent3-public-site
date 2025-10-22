import enGB from 'date-fns/locale/en-GB';
import './style.css';
import DatePicker, { registerLocale } from 'react-datepicker';
import moment from 'moment';
import 'react-datepicker/dist/react-datepicker.css';

registerLocale('en-GB', enGB);

interface CommonDatePickerProps {
  minDate?: Date;
  maxDate?: Date;
  // eslint-disable-next-line no-unused-vars
  setSelectedDate: (date: Date) => void;
  selectedDate: Date | undefined;
}
const CommonDatePicker = (props: CommonDatePickerProps) => {
  const { minDate, maxDate, setSelectedDate, selectedDate } = props;
  return (
    <DatePicker
      onChange={(date) => {
        if (date) {
          setSelectedDate(date);
        }
      }}
      dateFormat="mm/dd/yyyy"
      showMonthDropdown
      showYearDropdown
      // scrollableYearDropdown
      minDate={minDate}
      maxDate={maxDate}
      selected={selectedDate}
      inline
      locale="en-GB"
      weekDayClassName={(date) =>
        moment(date).format('dd') == 'Sa' || moment(date).format('dd') == 'Su'
          ? 'custom-weekend'
          : ''
      }
      dayClassName={(date) =>
        date.getDay() === 0 || date.getDay() === 6 ? 'custom-weekend' : ''
      }
    />
  );
};

export default CommonDatePicker;
