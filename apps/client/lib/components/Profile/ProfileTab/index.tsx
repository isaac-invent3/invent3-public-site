import { Divider, VStack } from '@chakra-ui/react';
import React from 'react';
import Photo from './Photo';
import PersonalInformation from './PersonalInformation';
import Location from './Location';

const ProfileTab = () => {
  return (
    <VStack
      spacing="24px"
      width="full"
      alignItems="flex-start"
      bgColor="white"
      p="24px"
      rounded="6px"
      minH="60vh"
      divider={<Divider borderColor="neutral.700" />}
    >
      <Photo />
      <PersonalInformation />
      <Location />
    </VStack>
  );
};

export default ProfileTab;
