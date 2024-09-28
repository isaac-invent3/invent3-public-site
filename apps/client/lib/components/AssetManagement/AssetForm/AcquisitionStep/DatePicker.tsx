import { Flex, Icon } from '@chakra-ui/react';
import { useField } from 'formik';
import { useRef } from 'react';
import DatePicker from 'react-datepicker';

import 'react-datepicker/dist/react-datepicker.css';
import { CalendarIcon } from '~/lib/components/CustomIcons';
import TextInput from '~/lib/components/UI/TextInput';
import { dateFormatter } from '~/lib/utils/Formatters';

interface CustomDatePickerProps {
  name: string;
  label: string;
}

const CustomDatePicker = (props: CustomDatePickerProps) => {
  const { name, label } = props;
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
        customStyle={{
          onClick: () => handleButtonClick(),
          autoComplete: 'off',
        }}
        customRightElement={
          <Icon as={CalendarIcon} boxSize="20px" color="#374957" />
        }
      />
      <DatePicker
        onChange={(date) =>
          helpers.setValue(dateFormatter(date as Date, 'DD/MM/YYYY'))
        }
        dateFormat="mm/dd/yyyy"
        ref={pickerRef}
        className="hidden-input"
      />
    </Flex>
  );
};

export default CustomDatePicker;
