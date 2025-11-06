import { SimpleGrid } from '@chakra-ui/react';
import React from 'react';
import Anomalies from './Anomalies';
import AssetRiskDistribution from './AssetRiskDistribution';

const AnomaliesAndAssetRisk = () => {
  return (
    <SimpleGrid width="full" spacing="14px" columns={{ base: 1, lg: 2 }}>
      <Anomalies />
      <AssetRiskDistribution />
    </SimpleGrid>
  );
};

export default AnomaliesAndAssetRisk;
