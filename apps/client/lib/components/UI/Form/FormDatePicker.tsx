import { Flex, Icon } from '@chakra-ui/react';
import { useField } from 'formik';
import { useRef } from 'react';
import DatePicker from 'react-datepicker';

import 'react-datepicker/dist/react-datepicker.css';
import InputMask from 'react-input-mask';
import { CalendarIcon } from '~/lib/components/CustomIcons';
import TextInput from '~/lib/components/UI/TextInput';
import { dateFormatter } from '~/lib/utils/Formatters';

interface CustomDatePickerProps {
  name: string;
  label: string;
  type?: 'date' | 'datetime';
  minDate?: Date;
  maxDate?: Date | undefined;
  // eslint-disable-next-line no-unused-vars
  handleSelectedDate?: (date: string) => void;
}

const CustomDatePicker = (props: CustomDatePickerProps) => {
  const {
    name,
    label,
    type = 'date',
    minDate,
    maxDate,
    handleSelectedDate,
  } = props;
  const pickerRef = useRef<DatePicker | null>(null);
  // eslint-disable-next-line no-unused-vars
  const [field, meta, helpers] = useField(name);

  const handleButtonClick = () => {
    if (pickerRef.current) {
      pickerRef.current.setFocus();
    }
  };

  return (
    <Flex width="full" direction="column">
      <TextInput
        name={name}
        type="text"
        label={label}
        placeholder={type === 'date' ? 'DD/MM/YYYY' : 'DD/MM/YYYY HH:mm'}
        customStyle={{
          autoComplete: 'off',
          as: InputMask,
          mask: type === 'date' ? '99/99/9999' : '99/99/9999 99:99',
        }}
        customRightElement={
          <Icon
            as={CalendarIcon}
            boxSize="20px"
            color="#374957"
            cursor="pointer"
            onClick={() => handleButtonClick()}
          />
        }
      />
      <DatePicker
        onChange={(date) => {
          const inputtedDate = dateFormatter(
            date as Date,
            `DD/MM/YYYY${type === 'datetime' ? ' HH:mm' : ''}`
          );
          helpers.setValue(inputtedDate);
          if (inputtedDate && handleSelectedDate) {
            handleSelectedDate(inputtedDate);
          }
        }}
        dateFormat="mm/dd/yyyy"
        showMonthDropdown
        showYearDropdown
        minDate={minDate}
        maxDate={maxDate}
        showTimeSelect={type === 'datetime'}
        showTimeInput={type === 'datetime'}
        ref={pickerRef}
        className="hidden-input"
      />
    </Flex>
  );
};

export default CustomDatePicker;
