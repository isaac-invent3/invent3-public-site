import { Flex } from '@chakra-ui/react';

import General from './General';
import Acquisition from './Acquisition';

const SectionTwo = () => {
  return (
    <Flex
      width="full"
      gap={{ base: '32px', lg: '16px' }}
      direction={{ base: 'column', lg: 'row' }}
    >
      <Flex
        width={{ base: 'full', lg: '37.5%' }}
        bgColor="#F5F5F5"
        p="16px"
        rounded="16px"
      >
        <General />
      </Flex>
      <Flex
        width={{ base: 'full', lg: '62.5%' }}
        bgColor="#F5F5F5"
        p="16px"
        rounded="16px"
      >
        <Acquisition />
      </Flex>
    </Flex>
  );
};

export default SectionTwo;
