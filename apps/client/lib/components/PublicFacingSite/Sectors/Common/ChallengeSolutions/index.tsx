import { Flex, SimpleGrid } from '@chakra-ui/react';
import React, { useState } from 'react';
import SectionInfo from '../../../Common/SectionInfo';
import SolutionCard from './SolutionCard';

interface ChallengeSolutionsProps {
  items: { title: string; subtitle: string }[];
  sectionDescription: string;
}
const ChallengeSolutions = (props: ChallengeSolutionsProps) => {
  const { items, sectionDescription } = props;
  const [activeSolution, setActiveSolution] = useState(0);
  return (
    <Flex
      justifyContent="center"
      width="full"
      mt={{ base: '80px', lg: '154px' }}
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
          badgeText="How Invent3"
          heading={['How', ['Invent3Pro'], ' Solves These Challenges']}
          headingStyles={{
            width: 'full',
            maxW: { lg: '555px' },
            textAlign: { base: 'left', lg: 'center' },
          }}
          description={sectionDescription}
          descriptionStyles={{
            textAlign: { base: 'left', lg: 'center' },
            mt: { lg: '16px' },
          }}
          containerStyles={{
            alignItems: { base: 'flex-start', lg: 'center' },
            spacing: '16px',
          }}
        />

        <SimpleGrid
          columns={{ base: 1, sm: 2, lg: 4 }}
          gap="46px"
          alignItems="flex-end"
        >
          {items.map((item, index) => (
            <SolutionCard
              {...item}
              key={index}
              index={index}
              activeSolution={activeSolution}
              setActiveSolution={setActiveSolution}
            />
          ))}
        </SimpleGrid>
      </Flex>
    </Flex>
  );
};

export default ChallengeSolutions;
