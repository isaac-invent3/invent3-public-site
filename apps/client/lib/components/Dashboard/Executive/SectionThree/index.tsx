import { SimpleGrid } from '@chakra-ui/react';
import AssetPerformance from './AssetPerformance';
import ComplianceRiskAssessment from './ComplianceRiskAssessment';

const SectionThree = () => {
  return (
    <SimpleGrid width="full" gap="16px" columns={{ base: 1, md: 2 }}>
      <AssetPerformance />
      <ComplianceRiskAssessment />
    </SimpleGrid>
  );
};

export default SectionThree;
