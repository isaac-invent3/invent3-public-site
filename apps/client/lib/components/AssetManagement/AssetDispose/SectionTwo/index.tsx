import { Flex } from '@chakra-ui/react';
import React from 'react';
import CurrentOwner from './CurrentOwner';
import DisposalDetails from './DisposalDetails';
import SupportingDocuments from './SupportingDocuments';

const SectionTwo = () => {
  return (
    <Flex gap="40px" width="full">
      <Flex width="32.5%">
        <CurrentOwner />
      </Flex>
      <Flex width="35%">
        <DisposalDetails />
      </Flex>
      <Flex width="32.5%">
        <SupportingDocuments />
      </Flex>
    </Flex>
  );
};

export default SectionTwo;
