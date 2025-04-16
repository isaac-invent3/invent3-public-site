import { Heading, VStack } from '@chakra-ui/react';
import React from 'react';
import Header from './Header';
import Locations from './Locations';
import SummaryDetail from './SummaryDetail';

const BMSDashboard = () => {
  return (
    <VStack
      width="full"
      spacing={{ base: '16px', lg: '32px' }}
      px={{ base: '16px', lg: 0 }}
    >
      <Header />
      <VStack
        py="16px"
        px={{ base: '12px', lg: '16px' }}
        alignItems="flex-start"
        bgColor="white"
        spacing={{ base: '22px', lg: '19px' }}
        rounded="8px"
        minH="40vh"
        width="full"
      >
        <Heading
          color="primary.500"
          fontWeight={700}
          fontSize={{ base: '14px', lg: '24px' }}
          lineHeight="16px"
        >
          Locations/Facilities
        </Heading>
        <VStack width="full" spacing="24px">
          <Locations type="preview" />
          <SummaryDetail />
        </VStack>
      </VStack>
    </VStack>
  );
};

export default BMSDashboard;
