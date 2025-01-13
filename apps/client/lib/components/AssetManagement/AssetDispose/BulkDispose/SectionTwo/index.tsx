import { Flex } from '@chakra-ui/react';
import DisposalDetails from '../../SectionTwo/DisposalDetails';
import SupportingDocuments from '../../SectionTwo/SupportingDocuments';

const SectionTwo = () => {
  return (
    <Flex gap="40px" width="full">
      <Flex width="38%">
        <DisposalDetails />
      </Flex>
      <Flex width="62%">
        <SupportingDocuments />
      </Flex>
    </Flex>
  );
};

export default SectionTwo;
