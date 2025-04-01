'use client';

import {
  Divider,
  DrawerBody,
  DrawerHeader,
  Flex,
  VStack,
} from '@chakra-ui/react';
import React from 'react';
import Photo from './Photo';
import Location from './Location';
import {
  useGetUserByIdQuery,
  useGetUserProfileByGuidQuery,
} from '~/lib/redux/services/user.services';
import { useSession } from 'next-auth/react';
import PageHeader from '../UI/PageHeader';
import PersonalInformation from './PersonalInformation';
import { BackButton, GenericDrawer } from '@repo/ui/components';

interface ProfileProps {
  isOpen: boolean;
  onClose: () => void;
}
const Profile = (props: ProfileProps) => {
  const { isOpen, onClose } = props;
  const data = useSession();
  const authenticatedUser = data?.data?.user;
  const { data: info, isLoading: loadingUser } = useGetUserByIdQuery(
    { userId: authenticatedUser?.userId! },
    { skip: !authenticatedUser?.userId }
  );
  const { data: user, isLoading } = useGetUserProfileByGuidQuery(
    { guid: info?.data.guid! },
    { skip: !authenticatedUser?.userId }
  );
  return (
    <GenericDrawer isOpen={isOpen} onClose={onClose} maxWidth="690px">
      <DrawerHeader
        p={0}
        m={0}
        px={{ base: '16px', md: '18px' }}
        pb="16px"
        bgColor="#EAEAEA"
      >
        <BackButton
          handleClick={onClose}
          customStyles={{ mt: '21px', mb: '8px' }}
        />
      </DrawerHeader>

      <DrawerBody
        p={0}
        m={0}
        position="relative"
        bgColor="#EAEAEA"
        px={{ base: '16px', md: '18px' }}
      >
        <Flex mt={{ base: '24px', md: '52px' }}>
          <PageHeader>User Profile</PageHeader>
        </Flex>

        <VStack
          spacing="24px"
          width="full"
          alignItems="flex-start"
          bgColor="white"
          p={{ base: '16px', md: '24px' }}
          pt="32px"
          mt="24px"
          rounded={{ md: '6px' }}
          minH={{ base: '60vh' }}
          divider={<Divider borderColor="neutral.700" />}
        >
          <Photo />
          <PersonalInformation
            user={user?.data}
            isLoading={isLoading || loadingUser}
          />
          <Location user={user?.data} isLoading={isLoading || loadingUser} />
        </VStack>
      </DrawerBody>
    </GenericDrawer>
  );
};

export default Profile;
