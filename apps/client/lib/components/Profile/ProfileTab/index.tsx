import { Divider, VStack } from '@chakra-ui/react';
import React from 'react';
import Photo from './Photo';
import PersonalInformation from './PersonalInformation';
import Location from './Location';
import { useGetUserProfileByUserIdQuery } from '~/lib/redux/services/user.services';
import { useSession } from 'next-auth/react';

const ProfileTab = () => {
  const data = useSession();
  const authenticatedUser = data?.data?.user;
  const { data: user, isLoading } = useGetUserProfileByUserIdQuery(
    { userId: authenticatedUser?.userId! },
    { skip: !authenticatedUser?.userId }
  );
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
      <PersonalInformation user={user?.data} isLoading={isLoading} />
      <Location user={user?.data} isLoading={isLoading} />
    </VStack>
  );
};

export default ProfileTab;
