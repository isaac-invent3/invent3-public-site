import { SimpleGrid } from '@chakra-ui/react';

import AssetCountStats from './AssetCountStats';
import AssetSummary from './AssetSummary';

const SectionOne = () => {
  return (
    <SimpleGrid
      width="full"
      columns={{ base: 1, lg: 2 }}
      gap="16px"
      px={{ base: '16px', md: 0 }}
    >
      <AssetSummary />
      <AssetCountStats />
    </SimpleGrid>
  );
};

export default SectionOne;
