import { Flex, HStack, SimpleGrid } from '@chakra-ui/react';
import React from 'react';
import CustomDatePicker from '~/lib/components/UI/Form/FormDatePicker';
import SectionInfo from '~/lib/components/UI/Form/FormSectionInfo';

const Date = () => {
  return (
    <SimpleGrid columns={2} alignItems="flex-start" width="full" spacing="40px">
      <HStack width="full" alignItems="flex-start" spacing="81px">
        <Flex width="full" maxW="130px">
          <SectionInfo
            title="Schedule Date"
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

      <HStack width="full" alignItems="flex-start" spacing="56px">
        <Flex width="full" maxW="130px">
          <SectionInfo
            title="Completion Date"
            info="Add name that users can likely search with"
            isRequired
          />
        </Flex>
        <CustomDatePicker
          name="completionDate"
          label="Completion Date"
          type="datetime"
        />
      </HStack>
    </SimpleGrid>
  );
};

export default Date;
