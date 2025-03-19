import { Flex } from '@chakra-ui/react';

import CTA from './CTA';
import RecentAsset from './RecentAsset';

const SectionFour = () => {
  return (
    <Flex
      width="full"
      gap="16px"
      direction={{ base: 'column', md: 'row' }}
      px={{ base: '16px', md: 0 }}
    >
      <Flex width="full" maxW={{ md: 'calc(100% - 358px)' }}>
        <RecentAsset />
      </Flex>
      <Flex width={{ base: 'full' }}>
        <CTA />
      </Flex>
    </Flex>
  );
};

export default SectionFour;
