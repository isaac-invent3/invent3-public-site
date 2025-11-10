import { Flex, SimpleGrid, VStack } from '@chakra-ui/react';
import React from 'react';
import AnomalyTimeline from './AnomalyTimeline';
import TopAnomalousAssets from './TopAnomalousAssets';
import AnomalyDistribution from './AnomalyDistribution';

const Anomalies = () => {
  return (
    <VStack width="full" pb="34px">
      <SimpleGrid
        width="full"
        columns={{ base: 1, lg: 2 }}
        gap={{ base: '48px', lg: '16px' }}
        px="28px"
        pt="16px"
        justifyContent="center"
      >
        <TopAnomalousAssets />
        <AnomalyDistribution />
      </SimpleGrid>
      <Flex
        borderTop="1px solid #F2F1F1"
        mt="58px"
        width="full"
        pt="34px"
        px="13px"
      >
        <AnomalyTimeline />
      </Flex>
    </VStack>
  );
};

export default Anomalies;
