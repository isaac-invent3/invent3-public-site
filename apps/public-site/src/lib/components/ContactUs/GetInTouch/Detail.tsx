import { Flex, Heading, Text, VStack } from '@chakra-ui/react';
import Image from 'next/image';
import React from 'react';

const Detail = () => {
  return (
    <VStack alignItems="flex-start" width="full" spacing="32px">
      <VStack alignItems="flex-start" width="full" spacing="16px">
        <Heading
          fontWeight={700}
          size={{ base: 'lg', md: 'xl' }}
          color="primary.500"
        >
          Get in touch
        </Heading>
        <Text
          fontSize={{ base: '14px', md: '16px' }}
          lineHeight={{ base: '20px', md: '24px' }}
          color="neutral.600"
          fontWeight={400}
          width="full"
        >
          Have questions or need support? Get in touch with Invent3’s team for
          expert assistance, business inquiries, or partnership opportunities.
          We're here to help you streamline asset management effortlessly!
        </Text>
      </VStack>
      <Flex
        position="relative"
        width={{ base: '217px', lg: '413px' }}
        height={{ base: '128px', lg: '245px' }}
      >
        <Image src="/contact-email.png" alt="contact-email" fill />
      </Flex>
    </VStack>
  );
};

export default Detail;
