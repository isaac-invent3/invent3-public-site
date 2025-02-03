import { SimpleGrid } from '@chakra-ui/react';
import React from 'react';
import AssetPerformance from './AssetPerformance';
import ComplianceRiskAssessment from './ComplianceRiskAssessment';

const SectionThree = () => {
  return (
    <SimpleGrid width="full" gap="16px" columns={2}>
      <AssetPerformance />
      <ComplianceRiskAssessment />
    </SimpleGrid>
  );
};

export default SectionThree;
