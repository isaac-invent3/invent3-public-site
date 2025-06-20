import { CheckIcon } from '@chakra-ui/icons';
import {
  Avatar,
  Box,
  Button,
  Flex,
  HStack,
  Icon,
  StackDivider,
  Text,
  VStack,
} from '@chakra-ui/react';
import ApprovalHeader from '../Header';

const Approvers = () => {
  return (
    <VStack
      alignItems="flex-start"
      divider={<StackDivider borderColor="neutral.600" />}
      spacing="16px"
    >
      <ApprovalHeader />
      <VStack alignItems="flex-start" gap="1.2em" w="full">
        <HStack alignItems="center" justifyContent="space-between" w="full">
          <HStack spacing="8px">
            <Avatar width="24px" height="24px" />

            <Box>
              <Text as="span" color="neutral.600" size="md">
                Jerome Bell
              </Text>

              <Text as="span" color="neutral.800" size="md">
                {' '}
                requested
              </Text>
            </Box>
          </HStack>

          <Flex
            alignItems="center"
            justifyContent="center"
            w="24px"
            h="24px"
            rounded="full"
            background="#07CC3B26"
          >
            <Icon as={CheckIcon} color="#018A1E" boxSize="14px" />
          </Flex>
        </HStack>

        <HStack alignItems="center" justifyContent="space-between" w="full">
          <HStack spacing="8px">
            <Avatar width="24px" height="24px" />

            <Box>
              <Text as="span" color="neutral.600" size="md">
                George Washington
              </Text>

              <Text as="span" color="neutral.800" size="md">
                {' '}
                has to approve
              </Text>
            </Box>
          </HStack>

          <Flex alignItems="center" gap="8px">
            <Button
              background="transparent"
              border="1px solid #D30000"
              height="35px"
            >
              <Text color="#D30000">Reject</Text>
            </Button>

            <Button
              background="#008321"
              height="35px"
              _hover={{ background: '#008321F0' }}
            >
              <Text color="#D2FEFD">Approve</Text>
            </Button>
          </Flex>
        </HStack>

        <HStack alignItems="center" justifyContent="space-between" w="full">
          <HStack spacing="8px">
            <Avatar width="24px" height="24px" />

            <Box>
              <Text as="span" color="neutral.600" size="md">
                Jerome Bell
              </Text>

              <Text as="span" color="neutral.800" size="md">
                {' '}
                has to be informed
              </Text>
            </Box>
          </HStack>
        </HStack>

        <HStack alignItems="center" justifyContent="space-between" w="full">
          <HStack spacing="8px">
            <Avatar width="24px" height="24px" />

            <Box>
              <Text as="span" color="neutral.600" size="md">
                Tasha Bell
              </Text>

              <Text as="span" color="neutral.800" size="md">
                {' '}
                has to approve
              </Text>
            </Box>
          </HStack>
        </HStack>
      </VStack>
    </VStack>
  );
};

export default Approvers;
