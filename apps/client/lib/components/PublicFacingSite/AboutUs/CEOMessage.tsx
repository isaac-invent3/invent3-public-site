import { Avatar, Heading, Text, VStack } from '@chakra-ui/react';
import React from 'react';

const CEOMessage = () => {
  return (
    <VStack width="full" spacing={{ base: '24px', lg: '32px' }}>
      <Heading color="primary.500" size={{ base: 'xl', lg: '2xl' }}>
        Word From the CEO
      </Heading>
      <Text
        size={{ base: 'md', md: 'lg' }}
        maxW="800px"
        textAlign="center"
        color="black"
      >
        "At Invent3, we believe asset management should be seamless,
        intelligent, and cost-effective. Our vision is to empower businesses
        with automation, real-time insights, and compliance-driven
        solutions—ensuring assets are optimized, maintenance is proactive, and
        operations run efficiently at all times.”
      </Text>
      <VStack spacing="8px">
        <Avatar width="60px" height="60px" />
        <Text size="lg" lineHeight="24px" color="primary.500">
          Syl Omope
        </Text>
        <Text size="md" lineHeight="20px" letterSpacing="0.04em" color="black">
          Co-Founder & CEO
        </Text>
      </VStack>
    </VStack>
  );
};

export default CEOMessage;
