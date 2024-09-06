import { Flex, HStack } from '@chakra-ui/react';
import React from 'react';
import SectionInfo from '../SectionInfo';

const AssetCategory = () => {
  return (
    <HStack width="full" alignItems="flex-start" spacing="104px">
      <Flex width="full" maxW="118px">
        <SectionInfo
          title="Category"
          info="Choose the category and the sub-category"
          isRequired
        />
      </Flex>
    </HStack>
  );
};

export default AssetCategory;
