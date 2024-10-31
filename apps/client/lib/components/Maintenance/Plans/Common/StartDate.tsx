import { Flex, HStack, VStack } from '@chakra-ui/react';
import { useField } from 'formik';
import React from 'react';
import DateTimeButtons from '~/lib/components/UI/DateTimeComponents/DateTimeButtons';
import ErrorMessage from '~/lib/components/UI/ErrorMessage';
import SectionInfo from '~/lib/components/UI/Form/FormSectionInfo';
import { dateFormatter } from '~/lib/utils/Formatters';

interface StartDateProps {
  sectionMaxWidth: string;
  spacing: string;
  // eslint-disable-next-line no-unused-vars
  handleSelectedDate?: (date: string | null) => void;
}
const StartDate = (props: StartDateProps) => {
  const { sectionMaxWidth, spacing, handleSelectedDate } = props;
  // eslint-disable-next-line no-unused-vars
  const [field, meta, helpers] = useField('startDate');
  return (
    <HStack width="full" alignItems="flex-start" spacing={spacing}>
      <Flex width="full" maxW={sectionMaxWidth}>
        <SectionInfo
          title="Start Date"
          info="Add name that users can likely search with"
          isRequired
        />
      </Flex>

      <VStack width="full" spacing="4px" alignItems="flex-start">
        <DateTimeButtons
          showRepeat={false}
          buttonVariant="solid"
          includeTime={false}
          minDate={new Date()}
          handleDateTimeSelect={(dateTime) => {
            helpers.setValue(
              dateTime ? dateFormatter(dateTime, 'DD/MM/YYYY') : dateTime
            );
            handleSelectedDate && handleSelectedDate(dateTime);
          }}
        />
        {meta.touched && meta.error !== undefined && (
          <ErrorMessage>{meta.error}</ErrorMessage>
        )}
      </VStack>
    </HStack>
  );
};

export default StartDate;
