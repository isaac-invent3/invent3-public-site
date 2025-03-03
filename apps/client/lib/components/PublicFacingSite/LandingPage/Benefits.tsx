import { Flex, Heading, HStack, Icon, Text, VStack } from '@chakra-ui/react';
import Image from 'next/image';
import React from 'react';
import { CheckIcon } from '../../CustomIcons/layout';

const benefitItems = [
  {
    title: 'Smart Asset Optimization',
    subtitle:
      'Maximize asset lifespan, reduce downtime, and enhance efficiency with AI-driven insights and predictive maintenance.',
  },
  {
    title: 'Streamlined Workflow Automation',
    subtitle:
      'Automate tasks, approvals, and compliance tracking to improve productivity and eliminate manual inefficiencies effortlessly.',
  },
  {
    title: 'Real-Time Data Access',
    subtitle:
      'Make informed decisions with instant, cloud-based access to asset data, reports, and performance analytics anywhere.',
  },
  {
    title: 'Ensure Compliance & Security',
    subtitle:
      'Generate real-time reports on asset performance, maintenance costs, and compliance trends for data-driven decisions.',
  },
];

const Benefits = () => {
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
        <Flex
          width={{ base: 'full', md: '50%' }}
          order={{ base: 1, md: 0 }}
          justifyContent="center"
        >
          <Flex
            position="relative"
            flex={1}
            width={{ base: 'full', md: '50%' }}
            maxW={{ base: '355px', lg: 'initial' }}
            height="auto"
            minH={{ base: '337px', md: '641px' }}
          >
            <Image src="/benefit-image.png" alt="lady-with-asset-card" fill />
          </Flex>
        </Flex>
        <VStack
          width={{ base: 'full', md: '50%' }}
          order={{ base: 0, md: 1 }}
          spacing={{ base: '40px', md: '60px' }}
        >
          <VStack alignItems="flex-start">
            <Heading
              fontWeight={800}
              fontSize={{ base: '24px', md: '40px' }}
              lineHeight={{ base: '28.51px', md: '47.52px' }}
              color="primary.500"
            >
              Key Benefits of our System for your Business Efficiency
            </Heading>
            <Text
              fontSize={{ base: '14px', md: '16px' }}
              lineHeight={{ base: '20px', md: '24px' }}
              color="neutral.600"
              fontWeight={400}
            >
              Our software boosts productivity,cut costs and drive longevity
            </Text>
          </VStack>
          <VStack spacing={{ base: '16px', md: '24px' }}>
            {benefitItems.map((item, index) => (
              <HStack
                spacing={{ base: '8px', md: '10.89px' }}
                alignItems="flex-start"
                key={index}
              >
                <Icon as={CheckIcon} boxSize="24px" />
                <VStack spacing="16px" alignItems="flex-start">
                  <Text
                    size="lg"
                    lineHeight="24px"
                    color="primary.500"
                    fontWeight={700}
                  >
                    {item.title}
                  </Text>
                  <Text
                    size="lg"
                    lineHeight="24px"
                    color="neutral.600"
                    fontWeight={400}
                  >
                    {item.subtitle}
                  </Text>
                </VStack>
              </HStack>
            ))}
          </VStack>
        </VStack>
      </Flex>
    </Flex>
  );
};

export default Benefits;
