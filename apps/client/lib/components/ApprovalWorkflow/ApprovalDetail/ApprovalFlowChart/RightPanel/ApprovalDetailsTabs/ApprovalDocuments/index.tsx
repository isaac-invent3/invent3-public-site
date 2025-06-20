import {
  Box,
  Flex,
  HStack,
  Icon,
  StackDivider,
  Text,
  VStack,
} from '@chakra-ui/react';
import { CloseIcon, PDFIcon } from '~/lib/components/CustomIcons';
import ApprovalHeader from '../Header';

const ApprovalDocuments = () => {
  return (
    <VStack
      alignItems="flex-start"
      pb="1.5em"
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

      <VStack
        w="full"
        mt="1rem"
        divider={
          <StackDivider
            height="10px"
            display="flex"
            alignItems="center"
            justifyContent="center"
            border="none"
          >
            <Box borderColor="#BBBBBB" width="full" borderWidth={0.5}></Box>
          </StackDivider>
        }
      >
        <HStack justifyContent="space-between" w="full">
          <HStack gap="12px">
            <Icon as={PDFIcon} boxSize="28px" />

            <Text color="neutral.800" size="md">
              Purchase Receipt
            </Text>

            <Box background="#F6F6F6" padding="7px 12px" rounded="8px">
              <Text color="neutral.800">PDF</Text>
            </Box>
          </HStack>

          <Flex
            justifyContent="center"
            padding="1px"
            rounded="full"
            border="2px solid #FF3B30"
          >
            <Icon as={CloseIcon} boxSize="14px" color="#FF3B30" />
          </Flex>
        </HStack>

        <HStack justifyContent="space-between" w="full">
          <HStack gap="12px">
            <Icon as={PDFIcon} boxSize="28px" />

            <Text color="neutral.800" size="md">
              Purchase Receipt
            </Text>

            <Box background="#F6F6F6" padding="7px 12px" rounded="8px">
              <Text color="neutral.800">PDF</Text>
            </Box>
          </HStack>

          <Flex
            justifyContent="center"
            padding="1px"
            rounded="full"
            border="2px solid #FF3B30"
          >
            <Icon as={CloseIcon} boxSize="14px" color="#FF3B30" />
          </Flex>
        </HStack>
      </VStack>
    </VStack>
  );
};

export default ApprovalDocuments;
