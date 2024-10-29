import { Flex, HStack } from '@chakra-ui/react';
import React from 'react';
import CustomDatePicker from '~/lib/components/UI/Form/FormDatePicker';
import SectionInfo from '~/lib/components/UI/Form/FormSectionInfo';

const ResolutionDate = () => {
  return (
    <HStack width="full" alignItems="flex-start" spacing="24px">
      <Flex width="full" maxW="141px">
        <SectionInfo
          title="Resolution Date"
          info="Add name that users can likely search with"
          isRequired
        />
      </Flex>

      <CustomDatePicker
        name="resolutionDate"
        label="Resolution Date"
        type="date"
        minDate={new Date()}
      />
    </HStack>
  );
};

export default ResolutionDate;
