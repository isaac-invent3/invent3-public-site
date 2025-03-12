import { Flex } from '@chakra-ui/react';

import CurrentOwner from './CurrentOwner';
import DisposalDetails from './DisposalDetails';
import SupportingDocuments from './SupportingDocuments';

const SectionTwo = () => {
  return (
    <Flex
      gap={{ base: '16px', md: '40px' }}
      width="full"
      direction={{ base: 'column', lg: 'row' }}
    >
      <Flex width={{ base: 'full', lg: '32.5%' }}>
        <CurrentOwner />
      </Flex>
      <Flex width={{ base: 'full', lg: '35%' }}>
        <DisposalDetails />
      </Flex>
      <Flex width={{ base: 'full', lg: '32.5%' }}>
        <SupportingDocuments />
      </Flex>
    </Flex>
  );
};

export default SectionTwo;
