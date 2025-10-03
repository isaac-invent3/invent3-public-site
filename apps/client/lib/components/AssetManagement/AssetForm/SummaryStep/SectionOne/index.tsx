import { Flex } from '@chakra-ui/react';

import Images from './Images';
import { useAppSelector } from '~/lib/redux/hooks';

const SectionOne = () => {
  return (
    <Flex
      width="full"
      gap={{ base: '32px', lg: '24px' }}
      direction={{ base: 'column', lg: 'row' }}
    >
      <Flex width={{ base: 'full', lg: '36.8%' }}>
        <Images />
      </Flex>
    </Flex>
  );
};

export default SectionOne;
