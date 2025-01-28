import { Flex, VStack } from '@chakra-ui/react';
import React from 'react';
import CardHeader from '../../Common/CardHeader';
import { Map } from 'pigeon-maps';

const CompanyDistribution = () => {
  return (
    <VStack
      height="full"
      // p="20px"
      alignItems="flex-start"
      spacing="16px"
      bgColor="white"
      rounded="8px"
      position="relative"
      overflow="hidden"
    >
      <Flex width="full" position="absolute" zIndex={99} py="15px" px="10px">
        <CardHeader>Company Distribution</CardHeader>
      </Flex>
      <Map
        height={382}
        defaultCenter={[9.082, 8.6753]}
        defaultZoom={6}
        attribution={false}
      />
    </VStack>
  );
};

export default CompanyDistribution;
