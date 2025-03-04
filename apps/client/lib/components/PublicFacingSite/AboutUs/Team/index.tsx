import { Heading, SimpleGrid, Text, VStack } from '@chakra-ui/react';
import React from 'react';
import { teamData } from './data';
import TeamCard from './TeamCard';

const Team = () => {
  return (
    <VStack width="full" spacing="40px">
      <VStack width="full">
        <Heading
          fontWeight={800}
          size={{ base: 'lg', lg: '2xl' }}
          color="primary.500"
        >
          Meet The Team
        </Heading>
        <Text
          fontSize={{ base: '14px', md: '16px' }}
          lineHeight={{ base: '20px', md: '24px' }}
          color="neutral.600"
          fontWeight={400}
          maxW="972px"
          textAlign="center"
        >
          Our dedicated team of experts is committed to revolutionizing asset
          management with innovation, automation, and smart solutions that help
          businesses optimize efficiency, reduce costs, and stay compliant
          effortlessly.
        </Text>
      </VStack>
      <SimpleGrid
        columns={{ base: 1, sm: 2, lg: 3 }}
        width="full"
        gap={{ base: '50px', sm: '20px', lg: '46px' }}
      >
        {teamData.map((item, index) => (
          <TeamCard key={index} {...item} />
        ))}
      </SimpleGrid>
    </VStack>
  );
};

export default Team;
