import { Flex, Heading, Text, useMediaQuery, VStack } from '@chakra-ui/react';
import Image from 'next/image';
import React from 'react';

const WhyChooseUs = () => {
  const [isMobile] = useMediaQuery('(max-width: 992px)');
  return (
    <VStack
      width="full"
      bgColor="#E4FEFE66"
      spacing={{ base: '40px', lg: '60px' }}
      rounded={{ base: '8px', lg: '10px' }}
      py={{ base: '17px', md: '59px' }}
      px={{ base: '10px', md: '55px' }}
    >
      <VStack width="full" spacing={{ base: '13px', lg: '22px' }}>
        <Text
          bgColor="primary.500"
          color="white"
          size="md"
          py={{ base: '11.5px', md: '16.5px' }}
          px={{ base: '35.5px', md: '48px' }}
          rounded="full"
        >
          Why Invent3
        </Text>
        <VStack spacing={{ base: '13px', lg: '18px' }}>
          <Heading
            fontWeight={800}
            size={{ base: 'lg', lg: '2xl' }}
            color="black"
            textAlign="center"
            maxW="800px"
          >
            Why Choose Invent3 for Smarter Asset & Maintenance Management?
          </Heading>
          <Text
            fontWeight={400}
            size={{ base: 'md', lg: 'lg' }}
            lineHeight="20px"
            color="black"
            maxW="706px"
            textAlign="center"
          >
            Invent3 streamlines asset tracking, automates maintenance, optimizes
            costs, and ensures compliance—helping businesses maximize efficiency
            and minimize downtime effortlessly.
          </Text>
        </VStack>
      </VStack>
      <Flex
        position="relative"
        width="full"
        maxW="1176px"
        height={{ base: '253px', sm: '400px', xl: '600px' }}
      >
        <Image
          src={isMobile ? '/why-mobile.png' : '/why-desktop.png'}
          alt="why-choose-us"
          fill
        />
      </Flex>
    </VStack>
  );
};

export default WhyChooseUs;
