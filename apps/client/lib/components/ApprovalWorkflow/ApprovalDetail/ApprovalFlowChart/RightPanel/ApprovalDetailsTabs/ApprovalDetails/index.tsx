import { Box, StackDivider, VStack } from '@chakra-ui/react';
import SectionFour from './SectionFour';
import SectionTwo from './SectionTwo';
import ApprovalHeader from '../Header';

const ApprovalDetails = () => {
  return (
    <VStack
      alignItems="flex-start"
      divider={
        <StackDivider
          height="20px"
          display="flex"
          alignItems="center"
          justifyContent="center"
          border="none"
        >
          <Box borderColor="#838383" width="full" borderWidth={0.5}></Box>
        </StackDivider>
      }
    >
      <ApprovalHeader />
      <SectionTwo />
      <SectionFour />
    </VStack>
  );
};

export default ApprovalDetails;
