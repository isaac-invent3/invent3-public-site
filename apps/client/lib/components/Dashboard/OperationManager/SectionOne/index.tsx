import { SimpleGrid } from '@chakra-ui/react';

import QuickLinks from './QuickLinks';
import AssetCountStats from './AssetCountStats';

const SectionOne = () => {
  return (
    <SimpleGrid
      width="full"
      columns={{ base: 1, xl: 2 }}
      gap="16px"
      px={{ base: '16px', md: 0 }}
    >
      <QuickLinks />
      <AssetCountStats />
    </SimpleGrid>
  );
};

export default SectionOne;
