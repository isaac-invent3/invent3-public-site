import { Flex, HStack, Icon, Text, VStack } from '@chakra-ui/react';
import Image from 'next/image';
import React from 'react';
import SectionInfo from '../Common/SectionInfo';
import {
  AIPoweredIcon,
  ScalableUIIcon,
  SeamlessIntegrationIcon,
  UnifiedPlatformIcon,
  UserInterfaceUIIcon,
} from '@/lib/components/CustomIcons';

const contents = [
  {
    icon: UnifiedPlatformIcon,
    title: 'Unified Platform',
    subtitle:
      'Manage assets, teams, and maintenance from one powerful dashboard',
  },
  {
    icon: AIPoweredIcon,
    title: 'AI-Powered Insights',
    subtitle: 'Make data-driven decisions with real-time analytics',
  },
  {
    icon: SeamlessIntegrationIcon,
    title: 'Seamless Integrations',
    subtitle: 'Connect effortlessly with your existing enterprise tools',
  },
  {
    icon: UserInterfaceUIIcon,
    title: 'User-Friendly Interface',
    subtitle: 'Designed for ease of use, no complex onboarding required.',
  },
  {
    icon: ScalableUIIcon,
    title: 'Scalable & Customizable',
    subtitle: 'Adapts to your business needs, no matter the size.',
  },
];

const TheInvent3Advantage = () => {
  return (
    <Flex justifyContent="center" width="full">
      <Flex
        width="full"
        direction={{ base: 'column', lg: 'row' }}
        alignItems="center"
        justifyContent="space-between"
        gap={{ base: '40px', lg: '72px' }}
        mt={{ base: '62px', lg: '120px' }}
        px={{ base: '16px', md: '40px', '2xl': '80px' }}
        maxW="1440px"
      >
        <Flex
          width={{ base: '100%', lg: '50%' }}
          height={{ base: '442px', lg: '758px' }}
          position="relative"
          order={{ base: 1, lg: 0 }}
        >
          <Image
            src="/solution-advantage.svg"
            alt="Invent3 advantage image"
            fill
          />
        </Flex>
        <VStack
          spacing={{ base: '32px', lg: '48px' }}
          alignItems="flex-start"
          width={{ base: '100%', lg: '50%' }}
        >
          <SectionInfo
            badgeText="The Invent3Pro Advantage"
            heading={['What Sets Us', ['Apart?']]}
            description="When it comes to asset and facility management, Invent3Pro is ahead of the curve. Here’s why businesses trust us over traditional solutions:"
            containerStyles={{
              spacing: '8px',
            }}
            headingStyles={{ mt: '8px' }}
            descriptionStyles={{ maxW: '547px' }}
          />
          <VStack
            width="full"
            spacing="48px"
            alignItems="flex-start"
            order={{ base: 0, lg: 1 }}
          >
            {contents.map((item, index) => (
              <HStack spacing="16px" key={index} width="full">
                <Flex
                  width="32px"
                  height="32px"
                  rounded="8px"
                  justifyContent="center"
                  alignItems="center"
                  bgColor="#EAEAEA"
                  flexShrink={0}
                >
                  <Icon as={item.icon} boxSize="24px" />
                </Flex>
                <VStack alignItems="flex-start" spacing="8px" width="full">
                  <Text
                    fontWeight={800}
                    fontSize="20px"
                    lineHeight="100%"
                    color="primary.500"
                  >
                    {item.title}
                  </Text>
                  <Text
                    color="primary.accent"
                    size="md"
                    fontWeight={400}
                    width="full"
                    maxW="410px"
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

export default TheInvent3Advantage;
