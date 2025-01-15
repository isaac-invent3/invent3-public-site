import { Divider, VStack } from '@chakra-ui/react';
import React from 'react';
import MyTeam from './MyTeam';
import TeamMembers from './TeamMembers';
import { useGetUserGroupsQuery } from '~/lib/redux/services/user.services';
import { useSession } from 'next-auth/react';

const Teams = () => {
  const session = useSession();
  const { data, isLoading } = useGetUserGroupsQuery(
    { pageSize: 25, userId: session?.data?.user?.userId! },
    { skip: !session?.data?.user?.userId }
  );
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
      <MyTeam data={data?.data?.items ?? []} isLoading={isLoading} />
      <TeamMembers data={data?.data?.items ?? []} isLoading={isLoading} />
    </VStack>
  );
};

export default Teams;
