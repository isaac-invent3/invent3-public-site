import { VStack } from '@chakra-ui/react';
import React from 'react';
import CardHeader from '../../../Common/CardHeader';
import HexMap from './hexMap';

const AssetDistribution = () => {
  return (
    <VStack
      width="full"
      height="full"
      p="20px"
      alignItems="flex-start"
      spacing="16px"
      bgColor="white"
      rounded="8px"
    >
      <CardHeader>Asset Distribution</CardHeader>
      <HexMap />
    </VStack>
  );
};

export default AssetDistribution;
