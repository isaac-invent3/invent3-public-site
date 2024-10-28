import { Flex, HStack } from '@chakra-ui/react';
import React from 'react';
import CustomDatePicker from '~/lib/components/UI/Form/FormDatePicker';
import SectionInfo from '~/lib/components/UI/Form/FormSectionInfo';

interface DateProps {
  sectionMaxWidth: string;
  spacing: string;
  minScheduleDate: Date;
  maxScheduleDate: Date | undefined;
}
const Date = (props: DateProps) => {
  const { sectionMaxWidth, spacing, minScheduleDate, maxScheduleDate } = props;
  return (
    <HStack width="full" alignItems="flex-start" spacing={spacing}>
      <Flex width="full" maxW={sectionMaxWidth}>
        <SectionInfo
          title="Start Date and Time"
          info="Add name that users can likely search with"
          isRequired
        />
      </Flex>
      <CustomDatePicker
        name="scheduledDate"
        label="Schedule Date"
        type="datetime"
        minDate={minScheduleDate}
        maxDate={maxScheduleDate}
      />
    </HStack>
  );
};

export default Date;
