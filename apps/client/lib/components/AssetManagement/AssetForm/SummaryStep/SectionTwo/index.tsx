import { Flex } from '@chakra-ui/react';

import General from './General';
import Acquisition from './Acquisition';

const SectionTwo = () => {
  return (
    <Flex
      width="full"
      gap={{ base: '32px', lg: '24px' }}
      direction={{ base: 'column', lg: 'row' }}
    >
      <Flex width={{ base: 'full', lg: '36.8%' }}>
        <General />
      </Flex>
      <Flex width={{ base: 'full', lg: '43.9%' }}>
        <Acquisition />
      </Flex>
    </Flex>
  );
};

export default SectionTwo;
