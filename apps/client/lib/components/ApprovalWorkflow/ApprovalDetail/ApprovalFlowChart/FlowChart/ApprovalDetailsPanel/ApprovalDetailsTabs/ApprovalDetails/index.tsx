import { Box, StackDivider, VStack } from '@chakra-ui/react';
import SectionFour from './SectionFour';
import SectionOne from './SectionOne';
import SectionThree from './SectionThree';
import SectionTwo from './SectionTwo';

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
      <SectionOne />

      <SectionTwo />

      <SectionThree />

      <SectionFour />
    </VStack>
  );
};

export default ApprovalDetails;
