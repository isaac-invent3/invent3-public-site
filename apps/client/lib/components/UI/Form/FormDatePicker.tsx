import { VStack } from '@chakra-ui/react';
import { useField } from 'formik';
import ErrorMessage from '../ErrorMessage';
import DateTimeButtons from '../DateTimeComponents/DateTimeButtons';

interface CustomDatePickerProps {
  name: string;
  label: string;
  type?: 'date' | 'datetime';
  minDate?: Date;
  maxDate?: Date | undefined;
  // eslint-disable-next-line no-unused-vars
  handleSelectedDate?: (date: string) => void;
  includeTime?: boolean;
}

const CustomDatePicker = (props: CustomDatePickerProps) => {
  const { name, label, minDate, maxDate, handleSelectedDate } = props;
  // eslint-disable-next-line no-unused-vars
  const [field, meta, helpers] = useField(name);

  return (
    <VStack width="full" alignItems="flex-start" spacing="4px">
      <DateTimeButtons
        buttonVariant="secondary"
        includeTime={false}
        minDate={minDate}
        maxDate={maxDate}
        selectedDate={meta.value}
        selectedTime={undefined}
        customDateHeader="Date"
        customButtonLabel={label ?? 'Select Date'}
        showPredefinedDates={false}
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
