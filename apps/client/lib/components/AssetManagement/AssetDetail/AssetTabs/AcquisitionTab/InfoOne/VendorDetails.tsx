import { Heading, HStack, StackDivider, Text, VStack } from '@chakra-ui/react';
import React from 'react';
import DetailHeader from '../../../DetailHeader';

const VendorTexts = () => {
  return (
    <VStack
      width="full"
      alignItems="flex-start"
      bgColor="neutral.100"
      p="8px"
      rounded="8px"
      spacing="16px"
    >
      <DetailHeader>Vendor's Details</DetailHeader>
      <HStack
        spacing="24px"
        alignItems="flex-start"
        divider={<StackDivider borderColor="#BBBBBB80" />}
      >
        <VStack spacing="4px" alignItems="flex-start">
          <Heading
            as="h5"
            fontSize="16px"
            lineHeight="19.01px"
            color="black"
            fontWeight={700}
          >
            Tech Solutions Inc.
          </Heading>
          <Text size="md" color="neutral.600">
            123 Technology Drive, Suite 200, NY
          </Text>
          <Text size="md" color="neutral.600">
            www.techsolutions.com
          </Text>
        </VStack>
        <VStack spacing="4px" alignItems="flex-start">
          <Text size="md" color="black">
            Contact Person
          </Text>
          <Text size="md" color="neutral.600">
            John Doe
          </Text>
          <Text size="md" color="neutral.600">
            +1 555-123-4567
          </Text>
          <Text size="md" color="neutral.600">
            johndoe@techsolutions.com
          </Text>
        </VStack>
      </HStack>
    </VStack>
  );
};

export default VendorTexts;
