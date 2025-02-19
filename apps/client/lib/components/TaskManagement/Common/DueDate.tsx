import { VStack } from '@chakra-ui/react';

import {
  DateTimeButtons,
  ErrorMessage,
  FormInputWrapper,
} from '@repo/ui/components';
import { useField } from 'formik';

interface DueDateProps {
  sectionMaxWidth: string;
  spacing: string;
}
const DueDate = (props: DueDateProps) => {
  const { sectionMaxWidth, spacing } = props;
  // eslint-disable-next-line no-unused-vars
  const [field, meta, helpers] = useField('dueDate');

  return (
    <FormInputWrapper
      sectionMaxWidth={sectionMaxWidth}
      customSpacing={spacing}
      title="Due Date"
      description="Select the date when the task would be due"
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
          }}
        />
        {meta.touched && meta.error !== undefined && (
          <ErrorMessage>{meta.error}</ErrorMessage>
        )}
      </VStack>
    </FormInputWrapper>
  );
};

export default DueDate;
