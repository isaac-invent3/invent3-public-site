import { SimpleGrid } from '@chakra-ui/react';

import AssetCountStats from './AssetCountStats';
import QuickLinks from './QuickLinks';

const SectionOne = () => {
  return (
    <SimpleGrid
      width="full"
      columns={{ base: 1, md: 2 }}
      gap="16px"
      px={{ base: '16px', md: 0 }}
    >
      <QuickLinks />
      <AssetCountStats />
    </SimpleGrid>
  );
};

export default SectionOne;
