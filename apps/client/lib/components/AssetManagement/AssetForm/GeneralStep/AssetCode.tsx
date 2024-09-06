import { Flex, HStack } from '@chakra-ui/react';
import React from 'react';
import SectionInfo from '../SectionInfo';

const AssetCode = () => {
  return (
    <HStack width="full" alignItems="flex-start" spacing="104px">
      <Flex width="full" maxW="118px">
        <SectionInfo
          title="Asset Code"
          info="Add name that users can likely search with"
          isRequired
        />
      </Flex>
    </HStack>
  );
};

export default AssetCode;
