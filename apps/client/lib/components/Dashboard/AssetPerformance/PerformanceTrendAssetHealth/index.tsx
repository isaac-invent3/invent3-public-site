import { SimpleGrid } from '@chakra-ui/react';
import React from 'react';
import PerformanceTrends from './PerformanceTrends';
import AssetHealthDistribution from './AssetHealthDistribution';

const PerformanceTrendAssetHealth = () => {
  return (
    <SimpleGrid width="full" spacing="14px" columns={{ base: 1, lg: 2 }}>
      <PerformanceTrends />
      <AssetHealthDistribution />
    </SimpleGrid>
  );
};

export default PerformanceTrendAssetHealth;
