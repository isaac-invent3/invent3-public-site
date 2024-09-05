import { Heading, HStack, StackDivider, Text, VStack } from '@chakra-ui/react';
import React from 'react';
import DetailHeader from '../../../DetailHeader';

interface DetailProps {
  children: React.ReactNode;
  customStyles?: { [key: string]: unknown };
}
const Detail = (props: DetailProps) => {
  const { children, customStyles } = props;

  return (
    <Text
      fontSize="14px"
      lineHeight="16.63px"
      color="neutral.600"
      fontWeight={500}
      {...customStyles}
    >
      {children}
    </Text>
  );
};

const VendorDetails = () => {
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
          <Detail>123 Technology Drive, Suite 200, NY</Detail>
          <Detail>www.techsolutions.com</Detail>
        </VStack>
        <VStack spacing="4px" alignItems="flex-start">
          <Detail customStyles={{ color: 'black' }}>Contact Person</Detail>
          <Detail>John Doe</Detail>
          <Detail>+1 555-123-4567</Detail>
          <Detail>johndoe@techsolutions.com</Detail>
        </VStack>
      </HStack>
    </VStack>
  );
};

export default VendorDetails;
