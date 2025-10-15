import { Flex, SimpleGrid } from '@chakra-ui/react';
import React from 'react';
import SectionInfo from '../Common/SectionInfo';
import TitleSubtitleCard from '../Common/TitleSubtitleCard';
import Image from 'next/image';

const contents = [
  {
    title: 'Banking & Finance',
    subtitle: 'Ensure compliance and security in asset management.',
  },
  {
    title: 'Healthcare & Medical',
    subtitle: 'Track critical equipment and maintenance schedules',
  },
  {
    title: 'Logistics & Fleet',
    subtitle: 'Monitor vehicles and streamline fleet management.',
  },
  {
    title: 'Retail & Warehousing',
    subtitle: 'Optimize inventory tracking and storage efficiency.',
  },
  {
    title: 'Manufacturing & Industrial',
    subtitle: 'Reduce downtime with predictive maintenance.',
  },
];

const Industries = () => {
  return (
    <Flex justifyContent="center" width="full">
      <Flex
        width="full"
        justifyContent="space-between"
        alignItems="flex-start"
        pt={{ base: '80px', lg: '120px' }}
        px={{ base: '16px', md: '40px', '2xl': '80px' }}
        maxW="1440px"
        position="relative"
        direction="column"
        gap="56px"
      >
        <SectionInfo
          badgeText="Built for Every Industry"
          heading={['A Solution Tailored to Your', ['Industry'], 'Needs']}
          description="Invent3Pro adapts to different sectors, helping businesses across industries optimize their operations:"
          containerStyles={{
            maxW: { base: '100%', lg: '50%' },
            alignItems: 'flex-start',
          }}
        />

        <SimpleGrid
          width="full"
          columns={{ base: 1, md: 2 }}
          gap={{ base: '56px', lg: '24px' }}
          alignItems="flex-start"
        >
          <SimpleGrid
            width="full"
            columns={2}
            gap={{ base: '24px', lg: '40px' }}
          >
            {contents.map((item, index) => (
              <TitleSubtitleCard
                {...item}
                key={index}
                titleStyles={{ fontSize: { base: '16px', lg: '20px' } }}
                subtitleStyles={{
                  maxW: '248px',
                  fontSize: { base: '12px', lg: '16px' },
                  lineHeight: '100%',
                }}
              />
            ))}
          </SimpleGrid>
          <Flex
            width="full"
            height={{ base: '256px', lg: '358px' }}
            position="relative"
          >
            <Image
              src="/solution-industries.svg"
              alt="solution-industries"
              fill
            />
          </Flex>
        </SimpleGrid>
      </Flex>
    </Flex>
  );
};

export default Industries;
