import { VStack } from '@chakra-ui/react';
import { useField } from 'formik';
import moment from 'moment';

import {
  DateTimeButtons,
  ErrorMessage,
  FormInputWrapper,
} from '@repo/ui/components';

interface StartDateProps {
  sectionMaxWidth: string;
  spacing: string;
  // eslint-disable-next-line no-unused-vars
  handleSelectedDate?: (date: Date | undefined) => void;
}
const StartDate = (props: StartDateProps) => {
  const { sectionMaxWidth, spacing, handleSelectedDate } = props;
  // eslint-disable-next-line no-unused-vars
  const [field, meta, helpers] = useField('startDate');
  return (
    <FormInputWrapper
      sectionMaxWidth={sectionMaxWidth}
      customSpacing={spacing}
      title="Start Date"
      description="Set the starting date for the maintenance"
      isRequired
    >
      <VStack width="full" spacing="4px" alignItems="flex-start">
        <DateTimeButtons
          buttonVariant="secondary"
          includeTime={false}
          minDate={new Date()}
          selectedDate={meta.value ?? undefined}
          handleDateTimeSelect={(dateTime) => {
            helpers.setValue(dateTime?.trim() ?? null);
            if (handleSelectedDate) {
              handleSelectedDate(moment(dateTime, 'DD/MM/YYYY').toDate());
            }
          }}
        />
        {meta.touched && meta.error !== undefined && (
          <ErrorMessage>{meta.error}</ErrorMessage>
        )}
      </VStack>
    </FormInputWrapper>
  );
};

export default StartDate;
