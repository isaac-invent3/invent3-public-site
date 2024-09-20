import { Flex } from '@chakra-ui/react';
import React from 'react';
import Images from './Images';
import Description from './Description';
import Documents from './Documents';

const SectionOne = () => {
  return (
    <Flex width="full" gap="24px">
      <Flex width="36.8%">
        <Images />
      </Flex>
      <Flex width="43.9%">
        <Description />
      </Flex>
      <Flex width="19.2%">
        <Documents />
      </Flex>
    </Flex>
  );
};

export default SectionOne;
