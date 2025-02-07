import { Flex } from '@chakra-ui/react';

import CTA from './CTA';
import RecentAsset from './RecentAsset';

const SectionFour = () => {
  return (
    <Flex width="full" gap="16px" flexDir={{ base: 'column', md: 'row' }}>
      <Flex
        width="full"
        overflow='scroll'
        maxW={{ md: 'calc(100% - 358px)' }}
        flexDir={{ base: 'column', md: 'row' }}
      >
        <RecentAsset />
      </Flex>
      <Flex
        width={{ base: 'full', md: '29%' }}
        flexDir={{ base: 'column', md: 'row' }}
      >
        <CTA />
      </Flex>
    </Flex>
  );
};

export default SectionFour;
