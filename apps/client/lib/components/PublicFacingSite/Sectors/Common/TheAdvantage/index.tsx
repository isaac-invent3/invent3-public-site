import { Flex, SimpleGrid, Stack } from '@chakra-ui/react';
import React from 'react';
import SectionInfo from '../../../Common/SectionInfo';
import AdvantageCard from './AdvantageCard';

interface TheAdvantageProps {
  items: { title: string; description: string; image: string }[];
  sectionDescription: string;
}
const TheAdvantage = (props: TheAdvantageProps) => {
  const { items, sectionDescription } = props;
  return (
    <Flex
      justifyContent="center"
      width="full"
      mt={{ base: '80px', lg: '165px' }}
    >
      <Flex
        width="full"
        alignItems="flex-start"
        py={{ base: '27px', lg: '34px' }}
        px={{ base: '16px', md: '40px', '2xl': '80px' }}
        maxW="1440px"
        position="relative"
        direction="column"
        gap={{ base: '24px', lg: '100px' }}
      >
        <SectionInfo
          badgeText="Advantage"
          heading={['The', ['Invent3Pro'], 'Advantage']}
          headingStyles={{
            width: 'full',
            maxW: { lg: '527px' },
            mt: { lg: '8px' },
          }}
          description={sectionDescription}
          containerStyles={{
            spacing: '16px',
          }}
        />

        <Flex
          width="full"
          justifyContent="center"
          alignItems="center"
          minH="600px"
        >
          <Stack
            direction={{ base: 'column', lg: 'row' }}
            gap="24px"
            justifyContent="center"
            alignItems="center"
            display={{ base: 'none', lg: 'flex' }}
            transition="all 200ms ease-in-out"
          >
            {items.map((item, index) => (
              <AdvantageCard {...item} key={index} />
            ))}
          </Stack>
          <SimpleGrid
            columns={{ base: 1, md: 2 }}
            gap="24px"
            width="full"
            display={{ base: 'grid', lg: 'none' }}
          >
            {items.map((item, index) => (
              <AdvantageCard {...item} key={index} />
            ))}
          </SimpleGrid>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default TheAdvantage;
