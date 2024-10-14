import { Flex, HStack } from '@chakra-ui/react';
import React from 'react';
import CustomDatePicker from '~/lib/components/UI/Form/FormDatePicker';
import SectionInfo from '~/lib/components/UI/Form/FormSectionInfo';

const Date = () => {
  return (
    <HStack width="full" alignItems="flex-start" spacing="41px">
      <Flex width="full" maxW="141px">
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
      />
    </HStack>
  );
};

export default Date;
