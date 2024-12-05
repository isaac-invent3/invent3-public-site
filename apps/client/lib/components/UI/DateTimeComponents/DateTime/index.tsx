import moment from 'moment';
import DatePicker from 'react-datepicker';
import './style.css';


interface DateTimeProps {
  isOpen: boolean;
  onClose: () => void;
  minDate?: Date;
  maxDate?: Date;
  initialDate?: Date;
  initialTime?: string;
  shouldIncludeTime?: boolean;
  handleSetDateTime?: (
    date: Date | undefined,
    time: string | undefined
  ) => void;
  // eslint-disable-next-line no-unused-vars
}

const DateTime = () => {
  return (
    <DatePicker
      dateFormat="mm/dd/yyyy"
      // showMonthDropdown
      // showYearDropdown

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

export default DateTime;
