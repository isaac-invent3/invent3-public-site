import { Flex, Heading, Text, VStack } from '@chakra-ui/react';
import React from 'react';

const FAQ = () => {
  return (
    <Flex justifyContent="center" width="full">
      <Flex
        width="full"
        justifyContent="space-between"
        alignItems="flex-start"
        pt={{ base: '40px', lg: '120px' }}
        px={{ base: '16px', md: '40px', '2xl': '80px' }}
        maxW="1440px"
        position="relative"
        direction={{ base: 'column', md: 'row' }}
        gap="24px"
      >
        <VStack
          alignItems="flex-start"
          maxW="516px"
          width={{ base: 'full', lg: '43%' }}
        >
          <Heading
            fontWeight={800}
            fontSize={{ base: '24px', md: '40px' }}
            lineHeight={{ base: '28.51px', md: '47.52px' }}
            color="primary.500"
          >
            Frequently Asked Questions
          </Heading>
          <Text
            fontSize={{ base: '14px', md: '16px' }}
            lineHeight={{ base: '20px', md: '24px' }}
            color="neutral.600"
            fontWeight={400}
          >
            Find answers to common questions about Invent3, including asset
            management, maintenance scheduling, cost optimization, compliance
            tracking, and reporting features.
          </Text>
        </VStack>
      </Flex>
    </Flex>
  );
};

export default FAQ;
