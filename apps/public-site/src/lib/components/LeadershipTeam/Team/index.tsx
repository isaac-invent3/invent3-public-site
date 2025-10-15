import { Heading, SimpleGrid, Text, VStack } from '@chakra-ui/react';
import React from 'react';
import { teamData } from './data';
import TeamCard from './TeamCard';

const Team = () => {
  return (
    <SimpleGrid
      columns={{ base: 1, sm: 2, lg: 3 }}
      width="full"
      gap={{ base: '50px', sm: '20px', lg: '46px' }}
    >
      {teamData.map((item, index) => (
        <TeamCard key={index} {...item} />
      ))}
    </SimpleGrid>
  );
};

export default Team;
