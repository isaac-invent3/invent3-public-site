import { Flex, Heading, HStack, Icon, Text, VStack } from '@chakra-ui/react';
import React from 'react';
import { ChevronLeftIcon } from '../CustomIcons';
import Image from 'next/image';

const CompanyPageHeader = () => {
  return (
    <VStack
      width="full"
      alignItems="flex-start"
      spacing="16px"
      mb={{ base: '16px', md: '28px' }}
    >
      <HStack
        width="full"
        py="12px"
        px="18px"
        bgColor="white"
        rounded="8px"
        spacing={{ base: '16px', lg: '37px' }}
      >
        <Flex
          width="57px"
          height="57px"
          rounded="8px"
          bgColor="#BBBBBB"
          position="relative"
          shrink={0}
        >
          <Image src="" fill alt="logo" />
        </Flex>
        <Heading color="black" fontWeight={700} size="lg">
          SoftLayer, an IBM Company
        </Heading>
        <Text py="8px" px="16px" rounded="full" bgColor="neutral.300">
          Automotive
        </Text>
      </HStack>
      <HStack
        as="button"
        p={{ base: '17px' }}
        spacing="8px"
        rounded="8px"
        bgColor="#F6F6F666"
        alignItems="center"
      >
        <Icon as={ChevronLeftIcon} boxSize="16px" mb="4px" />
        <Text color="primary.500">Back to company Detail Page</Text>
      </HStack>
    </VStack>
  );
};

export default CompanyPageHeader;
