import { Flex } from '@chakra-ui/react';

import MeanTime from './MeanTime';
import MaintenanceCostGraph from './MaintenanceCostGraph';
import AssetSummary from './AssetSummary';

const SectionTwo = () => {
  return (
    <Flex width="full" gap="16px">
      <Flex width="24%">
        <AssetSummary />
      </Flex>
      <Flex width="46%">
        <MaintenanceCostGraph />
      </Flex>
      <Flex width="30%">
        <MeanTime />
      </Flex>
    </Flex>
  );
};

export default SectionTwo;
