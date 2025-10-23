import { VStack } from '@chakra-ui/react';
import { useField } from 'formik';
import DateTimeButtons from '../DateTimeComponents/DateTimeButtons';
import ErrorMessage from '../ErrorMessage';

interface CustomDatePickerProps {
  name: string;
  label: string;
  type?: 'date' | 'datetime';
  minDate?: Date;
  maxDate?: Date | undefined;
  // eslint-disable-next-line no-unused-vars
  handleSelectedDate?: (date: string) => void;
  includeTime?: boolean;
  showPredefinedDate?: boolean;
}

const CustomDatePicker = (props: CustomDatePickerProps) => {
  const {
    name,
    label,
    minDate,
    maxDate,
    handleSelectedDate,
    showPredefinedDate = false,
  } = props;
  // eslint-disable-next-line no-unused-vars
  const [field, meta, helpers] = useField(name);

  return (
    <VStack width="full" alignItems="flex-start" spacing="4px" id={name}>
      <DateTimeButtons
        buttonVariant="secondary"
        includeTime={false}
        minDate={minDate}
        maxDate={maxDate}
        selectedDate={meta.value}
        selectedTime={undefined}
        customDateHeader="Date"
        customButtonLabel={label ?? 'Select Date'}
        showPredefinedDates={showPredefinedDate}
        handleDateTimeSelect={(dateTime) => {
          const splittedDateTime = dateTime?.split(' ');
          helpers.setValue(splittedDateTime?.[0] ?? null);
          if (handleSelectedDate && splittedDateTime?.[0]) {
            handleSelectedDate(splittedDateTime?.[0]);
          }
        }}
      />
      {meta.touched && meta.error && <ErrorMessage>{meta.error}</ErrorMessage>}
    </VStack>
  );
};

export default CustomDatePicker;
