import { Flex, VStack } from '@chakra-ui/react';
import React from 'react';
import SectionInfo from '../Common/SectionInfo';
import Image from 'next/image';
import TitleSubtitleCard from '../Common/TitleSubtitleCard';

const contents = [
  {
    title: 'Automated Workflows',
    subtitle:
      'Minimize manual effort with smart task delegation and rule-based triggers.',
  },
  {
    title: 'Predictive Maintenance',
    subtitle:
      'Detect potential failures before they happen, reducing downtime and costly repairs.',
  },
  {
    title: 'Anomaly Detection',
    subtitle: 'Spot irregularities in asset usage, performance, or compliance.',
  },
  {
    title: 'Smart Recommendations',
    subtitle: 'Get AI-powered insights on how to optimize resources and costs.',
  },
];
const AIAutomation = () => {
  return (
    <Flex justifyContent="center" width="full">
      <Flex
        width="full"
        justifyContent="space-between"
        alignItems="center"
        pt={{ base: '80px', lg: '120px' }}
        px={{ base: '16px', md: '40px', '2xl': '80px' }}
        maxW="1440px"
        position="relative"
        direction="column"
        gap={{ base: '60px', lg: '119px' }}
      >
        <SectionInfo
          badgeText="AI & Automation in Action"
          heading={['Harness the', ['Power of AI'], 'for Smarter Operations']}
          containerStyles={{
            spacing: '16px',
            alignItems: 'center',
          }}
          headingStyles={{ textAlign: 'center', maxW: '564px' }}
        />
        <Flex
          position="relative"
          width="full"
          height="522px"
          display={{ base: 'none', lg: 'flex' }}
        >
          <Image
            src="/intelligent-bots-desktop.svg"
            fill
            alt="intelligent bot"
          />
        </Flex>

        <VStack
          width="full"
          spacing="40px"
          display={{ base: 'flex', lg: 'none' }}
        >
          <VStack alignItems="flex-start" spacing="45px">
            {contents.map((item, index) => (
              <TitleSubtitleCard {...item} key={index} />
            ))}
          </VStack>
          <Flex
            position="relative"
            width="full"
            height="249px"
            display={{ base: 'flex', lg: 'none' }}
          >
            <Image
              src="/intelligent-bots-mobile.svg"
              fill
              alt="intelligent bot mobile"
            />
          </Flex>
        </VStack>
      </Flex>
    </Flex>
  );
};

export default AIAutomation;
