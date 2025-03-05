import { Flex, Heading, SimpleGrid, Text, VStack } from '@chakra-ui/react';
import React from 'react';
import FeatureCard from './FeatureCard';

const featureItems = [
  {
    title:
      'Real-Time Tracking for Complete Visibility and Control of Your Assets.',
    subtitle:
      'Monitor assets instantly, reduce downtime, enhance efficiency, and make data-driven decisions with real-time tracking and automated insights.',
    image: '/feature-1.png',
  },
  {
    title:
      'Maximize Efficiency and Reduce Unnecessary Asset Management Expenses',
    subtitle:
      'Gain insights into asset costs, optimize resource allocation, and minimize maintenance expenses for better financial efficiency.',
    image: '/feature-2.png',
  },
  {
    title:
      'Effortless Maintenance Scheduling for Maximum Uptime and Efficiency',
    subtitle:
      'Automate maintenance tasks, reduce downtime, and extend asset life with smart, proactive scheduling and real-time tracking.',
    image: '/feature-3.png',
  },
  {
    title:
      'Seamless Mobile Accessibility for Managing Assets Anytime, Anywhere',
    subtitle:
      'Access, track, and manage assets effortlessly from any device, ensuring real-time updates and seamless workflow on the go.',
    image: '/feature-4.png',
  },
];
const Features = () => {
  return (
    <Flex justifyContent="center" width="full">
      <Flex
        width="full"
        justifyContent="space-between"
        alignItems="flex-start"
        px={{ base: '16px', md: '40px', '2xl': '80px' }}
        pt={{ base: '40px', lg: '120px' }}
        maxW="1440px"
        position="relative"
        direction="column"
        gap={{ base: '40px', lg: '60px' }}
      >
        <VStack width="full" spacing="24px">
          <Text
            color="primary.500"
            px={{ base: '41px', md: '52px' }}
            py={{ base: '7px', md: '12.5px' }}
            rounded="full"
            border="1px solid #0E2642"
          >
            Features
          </Text>
          <VStack width="full" spacing="16px">
            <Heading
              fontWeight={800}
              fontSize={{ base: '24px', md: '40px' }}
              lineHeight={{ base: '28.51px', md: '47.52px' }}
              color="black"
              maxW="862px"
              textAlign="center"
            >
              Latest{' '}
              <Heading
                as="span"
                color="#B279A2"
                fontWeight={800}
                fontSize={{ base: '24px', md: '40px' }}
                lineHeight={{ base: '28.51px', md: '47.52px' }}
              >
                Advanced Technologies
              </Heading>{' '}
              to Streamline your Asset Management Effortlessly
            </Heading>
            <Text
              fontSize={{ base: '14px', md: '16px' }}
              lineHeight={{ base: '20px', md: '24px' }}
              color="neutral.600"
              fontWeight={400}
              maxW="518px"
              textAlign="center"
            >
              Unlock efficiency with smart tools designed to simplify, automate,
              and optimize your asset management process.
            </Text>
          </VStack>
        </VStack>
        <SimpleGrid columns={{ base: 1, md: 2 }} gap="24px">
          {featureItems.map((item, index) => (
            <FeatureCard key={index} {...item} />
          ))}
        </SimpleGrid>
      </Flex>
    </Flex>
  );
};

export default Features;
