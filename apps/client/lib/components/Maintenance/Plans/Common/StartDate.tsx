import { Flex, HStack } from '@chakra-ui/react';
import React from 'react';
import CustomDatePicker from '~/lib/components/UI/Form/FormDatePicker';
import SectionInfo from '~/lib/components/UI/Form/FormSectionInfo';

interface StartDateProps {
  sectionMaxWidth: string;
  spacing: string;
  // eslint-disable-next-line no-unused-vars
  handleSelectedDate?: (date: string) => void;
}
const StartDate = (props: StartDateProps) => {
  const { sectionMaxWidth, spacing, handleSelectedDate } = props;
  return (
    <HStack width="full" alignItems="flex-start" spacing={spacing}>
      <Flex width="full" maxW={sectionMaxWidth}>
        <SectionInfo
          title="Start Date"
          info="Add name that users can likely search with"
          isRequired
        />
      </Flex>

      <CustomDatePicker
        name="startDate"
        label="Start Date"
        type="date"
        minDate={new Date()}
        handleSelectedDate={handleSelectedDate}
      />
    </HStack>
  );
};

export default StartDate;
