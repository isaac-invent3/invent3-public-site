import { Flex, HStack, VStack } from '@chakra-ui/react';
import { useField } from 'formik';
import React from 'react';
import DateTimeButtons from '~/lib/components/UI/DateTimeComponents/DateTimeButtons';
import ErrorMessage from '~/lib/components/UI/ErrorMessage';
import SectionInfo from '~/lib/components/UI/Form/FormSectionInfo';
import InfoCard from '~/lib/components/UI/InfoCard';

interface DateProps {
  sectionMaxWidth: string;
  spacing: string;
  minScheduleDate: Date;
  maxScheduleDate: Date | undefined;
  buttonVariant: 'solid' | 'outline';
}
const Date = (props: DateProps) => {
  // eslint-disable-next-line no-unused-vars
  const [field, meta, helpers] = useField('scheduledDate');
  const {
    sectionMaxWidth,
    spacing,
    minScheduleDate,
    maxScheduleDate,
    buttonVariant,
  } = props;
  return (
    <HStack width="full" alignItems="flex-start" spacing={spacing}>
      <Flex width="full" maxW={sectionMaxWidth}>
        <SectionInfo
          title="Start Date and Time"
          info="Add name that users can likely search with"
          isRequired
        />
      </Flex>
      <VStack width="full" spacing="12px" alignItems="flex-start">
        <DateTimeButtons
          showRepeat={true}
          buttonVariant={buttonVariant}
          includeTime={true}
          minDate={minScheduleDate}
          maxDate={maxScheduleDate}
          handleDateTimeSelect={(dateTime) => helpers.setValue(dateTime)}
        />
        <InfoCard
          infoText="Start Date has to be within specified Plan Info Date"
          customStyle={{ width: 'full' }}
        />
        {meta.touched && meta.error !== undefined && (
          <ErrorMessage>{meta.error}</ErrorMessage>
        )}
      </VStack>
    </HStack>
  );
};

export default Date;
