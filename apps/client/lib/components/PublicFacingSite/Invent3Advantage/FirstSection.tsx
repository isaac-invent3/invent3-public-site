import { Box, Grid, GridItem, VStack } from '@chakra-ui/react';
import React from 'react';
import SectionInfo from '../Common/SectionInfo';

const contents = [
  {
    title: [
      ['AI-Driven'],
      'Data-Powered,  Smarter Decisions. Better Outcomes.',
    ],
    description:
      'Our platform goes beyond digitisation, using AI to turn data into predictive insights that reduce risks, cut downtime, and guide smarter decisions.',
  },
  {
    title: [
      'Designed for Seamless Adoption. Easy',
      ['Integration'],
      ', Fast ROI.',
    ],
    description:
      'Invent3Pro is designed for fast rollout, seamless integration, and immediate impact, cutting costs, streamlining assets, and boosting service delivery.',
  },
];

export const FirstSection = () => {
  return (
    <Grid templateColumns="repeat(3, 1fr)" gap="16px" width="full">
      <GridItem colSpan={{ base: 3, lg: 2 }} height="full" width="full">
        <VStack
          width="full"
          rounded="12px"
          height="628px"
          justifyContent="flex-end"
          bgImage="./advantage-first-section.png"
          bgSize="cover"
          padding={{ base: '16px', lg: '36px' }}
        >
          <SectionInfo
            heading={[
              'More Than Just',
              ['Software'],
              '- A True Business Partner',
            ]}
            description="We don’t just sell technology—we empower businesses. Our hands-on approach ensures that our solutions align with your objectives, providing real-world value beyond just automation and analytics."
            containerStyles={{
              spacing: '32px',
            }}
            headingPrimaryColor="white"
            headingStyles={{ maxW: '520px' }}
            descriptionStyles={{ color: '#EBEBEB', maxW: '520px' }}
          />
        </VStack>
      </GridItem>
      <GridItem colSpan={{ base: 3, lg: 1 }} height="full">
        <Grid
          templateColumns="repeat(2, 1fr)"
          templateRows="repeat(2, 1fr)"
          gap="16px"
          height="full"
        >
          {contents.map((item, index) => (
            <GridItem
              rowSpan={1}
              key={index}
              bgColor="#EBEBEB"
              rounded="16px"
              padding="24px"
              minH={{ base: '250px', md: '306px' }}
              colSpan={{ base: 2, md: 1, lg: 2 }}
            >
              <SectionInfo
                heading={item.title}
                description={item.description}
                containerStyles={{
                  spacing: '32px',
                  justifyContent: 'space-between',
                  height: 'full',
                }}
                headingStyles={{ fontSize: '24px', lineHeight: '100%' }}
                descriptionStyles={{ color: '#6E7D8E' }}
              />
            </GridItem>
          ))}
        </Grid>
      </GridItem>
    </Grid>
  );
};
