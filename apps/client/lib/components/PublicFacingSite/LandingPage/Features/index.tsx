import { Box, Flex, Heading, Stack, Text, VStack } from '@chakra-ui/react';
import React, { useState } from 'react';
import SingleFeature from './SingleFeature';

const featureItems = [
  {
    tabIndex: 0,
    tabName: 'AI-Powered Asset Tracking',
    title: 'Automated tracking of your Physical Assets',
    description:
      'Know where your assets are and how they’re performing at all times. Gain real-time visibility into asset locations, usage, and status across multiple sites.',
    image: '/asset-tracking-illustration.png',
  },
  {
    tabIndex: 1,
    tabName: 'Compliance & Audit Readiness',
    title: 'Automated tracking of your Physical Assets',
    description:
      'Know where your assets are and how they’re performing at all times. Gain real-time visibility into asset locations, usage, and status across multiple sites.',
    image: '/feature-1.png',
  },
  {
    tabIndex: 2,
    tabName: 'Predictive Maintenance',
    title: 'Automated tracking of your Physical Assets',
    description:
      'Know where your assets are and how they’re performing at all times. Gain real-time visibility into asset locations, usage, and status across multiple sites.',
    image: '/feature-1.png',
  },
  {
    tabIndex: 3,
    tabName: 'Smart Workflow Automation',
    title: 'Automated tracking of your Physical Assets',
    description:
      'Know where your assets are and how they’re performing at all times. Gain real-time visibility into asset locations, usage, and status across multiple sites.',
    image: '/feature-1.png',
  },
  {
    tabIndex: 4,
    tabName: 'Seamless Third-Party Integrations',
    title: 'Automated tracking of your Physical Assets',
    description:
      'Know where your assets are and how they’re performing at all times. Gain real-time visibility into asset locations, usage, and status across multiple sites.',
    image: '/feature-1.png',
  },
  {
    tabIndex: 5,
    tabName: 'Data-Driven Insights',
    title: 'Automated tracking of your Physical Assets',
    description:
      'Know where your assets are and how they’re performing at all times. Gain real-time visibility into asset locations, usage, and status across multiple sites.',
    image: '/feature-1.png',
  },
];
const Features = () => {
  const [activeTab, setActiveTab] = useState(0);
  return (
    <Flex justifyContent="center" width="full" bgColor="primary.500">
      <Flex
        width="full"
        justifyContent="space-between"
        alignItems="flex-start"
        px={{ base: '16px', md: '40px', '2xl': '80px' }}
        pt={{ base: '56px', lg: '142px' }}
        pb={{ base: '109px', lg: '118.5px' }}
        maxW="1440px"
        position="relative"
        direction="column"
        gap={{ base: '64px', lg: '80px' }}
      >
        <VStack
          width="full"
          spacing={{ base: '24px', lg: '32px' }}
          alignItems="flex-start"
        >
          <Text
            color="primary.500"
            px="16px"
            py="12px"
            rounded="full"
            bgColor="neutral.250"
          >
            Product Features
          </Text>
          <Stack
            direction={{ base: 'column', lg: 'row' }}
            width="full"
            spacing={{ base: '32px', lg: '64px' }}
            alignItems="flex-start"
          >
            <Heading
              fontWeight={800}
              fontSize={{ base: '24px', md: '40px' }}
              lineHeight={{ base: '28.51px', md: '47.52px' }}
              color="white"
              maxW="862px"
              textAlign="left"
            >
              Powerful Features to Simplify your{' '}
              <Heading
                as="span"
                color="#B279A2"
                fontWeight={800}
                fontSize={{ base: '24px', md: '40px' }}
                lineHeight={{ base: '28.51px', md: '47.52px' }}
              >
                Facility Management
              </Heading>
            </Heading>
            <Text
              fontSize={{ base: '14px', md: '16px' }}
              lineHeight={{ base: '20px', md: '24px' }}
              color="#6E7D8E"
              fontWeight={400}
              maxW="538px"
              textAlign="left"
            >
              Designed for efficiency, built for reliability. InventPro offers
              AI-driven automation, real-time tracking, and seamless
              integrations to help businesses manage their assets smarter and
              faster
            </Text>
          </Stack>
        </VStack>
        <Stack
          width="full"
          bgColor="white"
          rounded="16px"
          pt={{ base: '32px', lg: '82px' }}
          px={{ base: '16px', lg: '48px' }}
          pb={{ lg: '36px' }}
          direction={{ base: 'column', lg: 'row' }}
          spacing={{ base: '32px', lg: '68px' }}
          alignItems="flex-start"
          justifyContent="flex-start"
          overflow="hidden"
        >
          <Stack
            direction={{ base: 'row', lg: 'column' }}
            spacing={{ base: '24px', lg: '54px' }}
            minW={{ base: 'full', lg: 'min-content' }}
            width={{ base: 'full', lg: 'min-content' }}
            overflow={{ base: 'scroll', lg: 'none' }}
          >
            {featureItems.map((item) => (
              <VStack
                alignItems="flex-start"
                spacing={0}
                cursor="pointer"
                onClick={() => setActiveTab(item.tabIndex)}
              >
                <Heading
                  key={item.tabIndex}
                  color={
                    activeTab === item.tabIndex ? 'primary.500' : 'neutral.300'
                  }
                  fontSize={{ base: '14px', lg: '20px' }}
                  lineHeight={{ base: '16px', lg: '24px' }}
                  fontWeight={800}
                  width="full"
                  minW="126px"
                  whiteSpace={{ lg: 'nowrap' }}
                  maxW={{ base: '126px', lg: 'full' }}
                >
                  {item.tabName}
                </Heading>
                {activeTab === item.tabIndex && (
                  <Box
                    bgColor="secondary.purple.500"
                    height="4px"
                    width={{ base: 'full', lg: '60%' }}
                  />
                )}
              </VStack>
            ))}
          </Stack>
          {featureItems.map(
            (item) =>
              item.tabIndex === activeTab && (
                <SingleFeature
                  key={item.tabIndex}
                  title={item.title}
                  description={item.description}
                  image={item.image}
                />
              )
          )}
        </Stack>
      </Flex>
    </Flex>
  );
};

export default Features;
