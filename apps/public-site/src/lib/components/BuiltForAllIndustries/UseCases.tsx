import React from 'react';
import CheckIconKeyPoints from '../Common/CheckIconKeyPoints';
import { Flex, SimpleGrid } from '@chakra-ui/react';
import SectionInfo from '../Common/SectionInfo';

const contents = [
  {
    title: 'Optimize supply chains and logistics',
  },
  {
    title: 'Reduce maintenance costs in manufacturing',
  },
  {
    title: 'Improve asset tracking in corporate offices',
  },
  {
    title: 'Ensure compliance in healthcare facilities',
  },
];

const UseCases = () => {
  return (
    <Flex justifyContent="center" width="full">
      <SimpleGrid
        width="full"
        px={{ base: '16px', md: '40px', '2xl': '80px' }}
        py={{ base: '80px', lg: '120px' }}
        maxW="1440px"
        columns={{ base: 1, lg: 2 }}
        spacing="24px"
      >
        <SectionInfo
          badgeText="Use Cases"
          heading={['Real-World Success', ['Industry'], 'Use Cases']}
          description="Companies worldwide rely on Invent3Pro to"
          containerStyles={{ spacing: '16px' }}
          headingStyles={{ maxW: '623px' }}
          descriptionStyles={{ maxW: '623px', color: 'primary.accent' }}
        />
        <CheckIconKeyPoints
          items={contents}
          containerStyle={{ spacing: '42px' }}
          itemStyle={{ spacing: '40px' }}
        />
      </SimpleGrid>
    </Flex>
  );
};

export default UseCases;
