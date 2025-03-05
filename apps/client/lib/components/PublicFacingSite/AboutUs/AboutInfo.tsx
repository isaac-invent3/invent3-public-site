import { Heading, SimpleGrid, Text, VStack } from '@chakra-ui/react';
import React from 'react';

const AboutInfo = () => {
  return (
    <VStack
      width="full"
      py={{ base: '13px', md: '24px', lg: '85px' }}
      px={{ base: '10px', md: '24px', lg: '72px' }}
      spacing={{ base: '16px', lg: '24px' }}
      alignItems="flex-start"
      bgColor="#E4FEFE"
      rounded="10px"
    >
      <Text
        fontSize={{ base: '16px', lg: '24px' }}
        lineHeight="32px"
        color="#B279A2"
      >
        ABOUT US
      </Text>
      <SimpleGrid
        width="full"
        columns={{ base: 1, md: 2 }}
        gap={{ base: '24px', lg: '40px' }}
      >
        <Heading size={{ base: 'lg', lg: '2xl' }} color="primary.500">
          Empowering Businesses with Smarter Asset Management and Maintenance
          Solutions
        </Heading>
        <Text
          color="black"
          fontSize={{ base: '14px', lg: '16px' }}
          lineHeight={{ base: '20px', lg: '24px' }}
        >
          Invent3’s mission is to simplify asset management through automation,
          real-time insights, and proactive maintenance—helping businesses
          reduce costs, improve efficiency, and ensure compliance with seamless,
          data-driven solutions.
        </Text>
      </SimpleGrid>
    </VStack>
  );
};

export default AboutInfo;
