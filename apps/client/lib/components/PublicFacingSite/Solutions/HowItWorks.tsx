import {
  Flex,
  Grid,
  GridItem,
  SimpleGrid,
  Text,
  VStack,
} from '@chakra-ui/react';
import React from 'react';
import SectionInfo from '../Common/SectionInfo';
import TitleSubtitleCard from '../Common/TitleSubtitleCard';

const contents = [
  {
    title: 'Set Up & Configure',
    subtitle: 'Easily onboard your team, define roles, and customize settings.',
  },
  {
    title: 'Add & Track Assets',
    subtitle: 'Digitize asset management with real-time monitoring',
  },
  {
    title: 'Automate Maintenance & Tasks',
    subtitle: 'Schedule, assign, and track maintenance effortlessly.',
  },
  {
    title: 'Gain Actionable Insights',
    subtitle: 'Use AI-driven analytics to optimize operations.',
  },
  {
    title: 'Scale & Adapt',
    subtitle: 'Grow your business with a flexible and scalable solution.',
  },
];

const HowItWorks = () => {
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
        gap={{ base: '40px', lg: '88px' }}
      >
        <SectionInfo
          badgeText="How it works"
          heading={['Streamline Your', ['Operations'], 'in a Few Simple Steps']}
          description="Invent3Pro is designed for simplicity and efficiency. From onboarding to real-time asset tracking, our intuitive workflow ensures seamless management at every stage."
          containerStyles={{
            spacing: '24px',
            alignItems: 'center',
          }}
          headingStyles={{ textAlign: 'center', maxW: '623px' }}
          descriptionStyles={{ textAlign: 'center', maxW: '623px' }}
        />
        <SimpleGrid
          columns={{ base: 1, md: 2, lg: 3 }}
          rowGap={{ base: '16px', lg: '40px' }}
          columnGap={{ base: '16px', lg: '27px' }}
          width="full"
        >
          {contents.map((item, index) => (
            <VStack
              alignItems="flex-start"
              spacing="12px"
              p="16px"
              pb="45px"
              rounded="10px"
              bgColor="#F3F3F3"
              key={index}
            >
              <Flex position="relative" width="full">
                <Text
                  fontSize="111.5px"
                  lineHeight="100%"
                  fontWeight={800}
                  color="#E3E3E3"
                >
                  {index < 9 ? '0' : ''}
                  {index + 1}
                </Text>
                <Text
                  color="primary.500"
                  fontSize={{ base: '16px', lg: '20px' }}
                  lineHeight="24px"
                  fontWeight={700}
                  position="absolute"
                  bottom={8}
                  bgColor="#F3F3F3"
                >
                  {item.title}
                </Text>
              </Flex>

              <Text
                color="#6E7D8E"
                size={{ base: 'md', lg: 'lg' }}
                fontWeight={400}
                maxW="202px"
              >
                {item.subtitle}
              </Text>
            </VStack>
          ))}
        </SimpleGrid>
      </Flex>
    </Flex>
  );
};

export default HowItWorks;
