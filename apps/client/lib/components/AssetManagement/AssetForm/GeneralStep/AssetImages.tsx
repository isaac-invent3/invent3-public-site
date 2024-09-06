import { Flex, HStack } from '@chakra-ui/react';
import React from 'react';
import SectionInfo from '../SectionInfo';

const AssetImages = () => {
  return (
    <HStack width="full" alignItems="flex-start" spacing="104px">
      <Flex width="full" maxW="118px">
        <SectionInfo
          title="Asset Images"
          info="Size max: 10MB each Format: JPG, PNG"
          isRequired
        />
      </Flex>
    </HStack>
  );
};

export default AssetImages;
