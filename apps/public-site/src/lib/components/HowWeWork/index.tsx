'use client';
import React from 'react';
import { Flex, Heading, SimpleGrid, VStack } from '@chakra-ui/react';
import HeroHeader from '../Common/HeroHeader';
import Features from './Features';
import SectionInfo from '../Common/SectionInfo';
import Image from 'next/image';
import ContinuousImprovement from './ContinuousImprovement';

const HowWeWork = () => {
  return (
    <Flex direction="column">
      <HeroHeader
        title="Our Approach to Innovation"
        subtitle="At Invent3.ai, we redefine how businesses manage assets, operations, and infrastructure. Our intelligent, AI-powered platform adapts to your organization’s unique needs, enabling strategic decision-making, cost reduction, and operational efficiency."
        customHeading={{ maxW: '823px' }}
        containerStyle={{ spacing: { base: '16px', lg: '24px' } }}
        subTitleStyle={{ maxW: { lg: '705px' } }}
        bgDesktop="/how-we-work-hero-desktop.png"
        bgMobile="/how-we-work-hero-mobile.png"
      />
      <Flex justifyContent="center" width="full">
        <Flex
          width="full"
          justifyContent="space-between"
          alignItems="flex-start"
          px={{ base: '16px', md: '40px', '2xl': '80px' }}
          py={{ base: '80px', lg: '120px' }}
          maxW="1440px"
          direction="column"
          gap={{ base: '80px', lg: '120px' }}
        >
          <SimpleGrid columns={{ base: 1, lg: 2 }} width="full" spacing="40px">
            <VStack alignItems="flex-start" spacing={0}>
              <Heading
                fontWeight={800}
                fontSize={{ base: '24px', md: '40px' }}
                lineHeight={{ base: '28.51px', md: '47.52px' }}
              >
                Our Process -
              </Heading>
              <SectionInfo
                heading={['A Proven', ['Framework'], 'for Success']}
                description="We follow a structured yet flexible process that ensures measurable impact"
                containerStyles={{
                  spacing: '24px',
                  maxW: '477px',
                }}
              />
            </VStack>
            <Flex
              position="relative"
              width="full"
              height="full"
              minH={{ base: '400px', lg: '536px' }}
            >
              <Image src="/how-we-work-step.svg" alt="how-we-work-step" fill />
            </Flex>
          </SimpleGrid>
          <Features />
        </Flex>
      </Flex>
      <ContinuousImprovement />
    </Flex>
  );
};

export default HowWeWork;
