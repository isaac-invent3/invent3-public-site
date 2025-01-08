import { Divider, VStack } from '@chakra-ui/react';
import React from 'react';
import MyTeam from './MyTeam';
import TeamMembers from './TeamMembers';

const Teams = () => {
  return (
    <VStack
      spacing="24px"
      width="full"
      alignItems="flex-start"
      bgColor="white"
      p="24px"
      pt="32px"
      rounded="6px"
      minH="60vh"
      divider={<Divider borderColor="neutral.700" />}
    >
      <MyTeam />
      <TeamMembers />
    </VStack>
  );
};

export default Teams;
