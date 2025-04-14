import { Flex, Grid, GridItem } from '@chakra-ui/react';
import React from 'react';
import SectionInfo from '../Common/SectionInfo';
import TitleSubtitleCard from '../Common/TitleSubtitleCard';

const content1 = [
  {
    title: 'Set Up & Configure',
    subtitle: 'Easily onboard your team, define roles, and customize settings.',
  },
  {
    title: 'AI Optimization',
    subtitle:
      'Enhance asset performance with intelligent algorithms that automate processes, reduce downtime, and improve operational efficiency.',
  },
];

const content2 = [
  {
    title: 'AI Optimization',
    subtitle:
      'Enhance asset performance with intelligent algorithms that automate processes, reduce downtime, and improve operational efficiency.',
  },
  {
    title: 'AI Optimization',
    subtitle:
      'Enhance asset performance with intelligent algorithms that automate processes, reduce downtime, and improve operational efficiency.',
  },
  {
    title: 'AI Optimization',
    subtitle:
      'Enhance asset performance with intelligent algorithms that automate processes, reduce downtime, and improve operational efficiency.',
  },
  {
    title: 'AI Optimization',
    subtitle:
      'Enhance asset performance with intelligent algorithms that automate processes, reduce downtime, and improve operational efficiency.',
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
        gap={{ base: '16px', lg: '40px' }}
      >
        <Grid
          width="full"
          templateColumns={{ base: 'repeat(1, 1fr)', lg: 'repeat(4, 1fr)' }}
          gap={{ base: '16px', lg: '30px' }}
        >
          <GridItem colSpan={{ base: 1, lg: 2 }}>
            <SectionInfo
              badgeText="How it works"
              heading={['Streamline', ['Operations'], 'in a Few Simple Steps']}
              description="Invent3Pro is designed for simplicity and efficiency. From onboarding to real-time asset tracking, our intuitive workflow ensures seamless management at every stage."
              containerStyles={{ spacing: '24px' }}
            />
          </GridItem>
          {content1.map((item, index) => (
            <GridItem colSpan={{ base: 1 }}>
              <TitleSubtitleCard
                {...item}
                key={index}
                titleStyles={{
                  color: 'black',
                  fontSize: { base: '16px', lg: '20px' },
                  lineHeight: { base: '24px', lg: '100%' },
                }}
                subtitleStyles={{
                  color: 'primary.accent',
                  fontSize: { base: '14px', lg: '16px' },
                  lineHeight: { base: '100%' },
                }}
                containerStyles={{
                  spacing: { base: '24px' },
                  rounded: '10px',
                  bgColor: '#F3F3F3',
                  p: '16px',
                  height: 'full',
                }}
              />
            </GridItem>
          ))}
        </Grid>
        <Grid
          width="full"
          templateColumns={{ base: 'repeat(1, 1fr)', lg: 'repeat(4, 1fr)' }}
          gap={{ base: '16px', lg: '30px' }}
        >
          {content2.map((item, index) => (
            <GridItem colSpan={{ base: 1 }}>
              <TitleSubtitleCard
                {...item}
                key={index}
                titleStyles={{
                  color: 'black',
                  fontSize: { base: '16px', lg: '20px' },
                  lineHeight: '100%',
                }}
                subtitleStyles={{
                  color: 'primary.accent',
                  fontSize: { base: '14px', lg: '16px' },
                  lineHeight: { base: '100%' },
                }}
                containerStyles={{
                  spacing: { base: '24px' },
                  rounded: '10px',
                  bgColor: '#F3F3F3',
                  p: '16px',
                  height: 'full',
                  minHeight: '202px',
                }}
              />
            </GridItem>
          ))}
        </Grid>
      </Flex>
    </Flex>
  );
};

export default HowItWorks;
