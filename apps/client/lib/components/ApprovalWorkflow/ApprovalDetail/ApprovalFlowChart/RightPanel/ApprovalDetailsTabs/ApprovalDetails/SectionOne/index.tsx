import { Box, HStack, Text, VStack } from '@chakra-ui/react';

const SectionOne = () => {
  return (
    <VStack alignItems="flex-start">
      <Box
        padding="6px"
        color="#A07905"
        borderWidth="1px"
        borderColor="#EABC3080"
        background="#EABC300D"
        width="max-content"
        rounded="6px"
        minWidth="90px"
      >
        <Text color="#A07905">In Progress</Text>
      </Box>

      <HStack gap="2.5em" mt="1.5em">
        <Text color="neutral.600" size="md" width='90px'>
          Workflow
        </Text>

        <Text color="primary.500" fontWeight={700} fontSize="18px">
          #WRK00098 - Bulk Asset Transfer
        </Text>
      </HStack>
    </VStack>
  );
};

export default SectionOne;
