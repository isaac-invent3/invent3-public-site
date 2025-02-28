'use client';

import { Divider, Flex, VStack } from '@chakra-ui/react';
import React from 'react';
import Photo from './Photo';
import Location from './Location';
import { useGetUserProfileByUserIdQuery } from '~/lib/redux/services/user.services';
import { useSession } from 'next-auth/react';
import PageHeader from '../UI/PageHeader';
import PersonalInformation from './PersonalInformation';

const Profile = () => {
  const data = useSession();
  const authenticatedUser = data?.data?.user;
  const { data: user, isLoading } = useGetUserProfileByUserIdQuery(
    { userId: authenticatedUser?.userId! },
    { skip: !authenticatedUser?.userId }
  );
  return (
    <Flex width="full" direction="column" pb="40px" gap="40px">
      <Flex px={{ base: '16px', md: 0 }}>
        <PageHeader>User Profile</PageHeader>
      </Flex>
      <VStack
        spacing="24px"
        width="full"
        alignItems="flex-start"
        bgColor="white"
        p={{ base: '16px', md: '24px' }}
        pt="32px"
        rounded={{ md: '6px' }}
        minH={{ base: '60vh' }}
        divider={<Divider borderColor="neutral.700" />}
      >
        <Photo />
        <PersonalInformation user={user?.data} isLoading={isLoading} />
        <Location user={user?.data} isLoading={isLoading} />
      </VStack>
    </Flex>
  );
};

export default Profile;
