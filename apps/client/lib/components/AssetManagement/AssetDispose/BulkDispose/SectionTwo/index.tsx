import { Flex } from '@chakra-ui/react';
import DisposalDetails from '../../SectionTwo/DisposalDetails';
import SupportingDocuments from '../../SectionTwo/SupportingDocuments';

const SectionTwo = () => {
  return (
    <Flex
      gap={{ base: '16px', lg: '40px' }}
      width="full"
      direction={{ base: 'column', lg: 'row' }}
    >
      <Flex width={{ base: 'full', lg: '38%' }}>
        <DisposalDetails />
      </Flex>
      <Flex width={{ base: 'full', lg: '62%' }}>
        <SupportingDocuments />
      </Flex>
    </Flex>
  );
};

export default SectionTwo;
