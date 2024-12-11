import { Flex } from '@chakra-ui/react';

import General from './General';
import Acquisition from './Acquisition';

const SectionTwo = () => {
  return (
    <Flex width="full" gap="24px">
      <Flex width="36.8%">
        <General />
      </Flex>
      <Flex width="43.9%">
        <Acquisition />
      </Flex>
    </Flex>
  );
};

export default SectionTwo;
