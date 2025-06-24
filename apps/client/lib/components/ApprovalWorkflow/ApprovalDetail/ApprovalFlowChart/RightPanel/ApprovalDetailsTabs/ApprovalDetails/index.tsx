import { StackDivider, VStack } from '@chakra-ui/react';
import SectionFour from './SectionFour';
import SectionTwo from './SectionTwo';
import ApprovalHeader from '../Header';

const ApprovalDetails = () => {
  return (
    <VStack
      alignItems="flex-start"
      divider={<StackDivider borderColor="neutral.600" />}
      spacing="20px"
    >
      <ApprovalHeader />
      <SectionTwo />
      <SectionFour />
    </VStack>
  );
};

export default ApprovalDetails;
