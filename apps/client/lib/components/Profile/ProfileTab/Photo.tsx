import { Avatar, HStack, Text, VStack } from '@chakra-ui/react';
import React from 'react';
// import EditButton from '../Common/EditButton';
import { useSession } from 'next-auth/react';

const Photo = () => {
  const data = useSession();
  const user = data?.data?.user;
  return (
    <VStack width="full" spacing="16px" alignItems="flex-start">
      <Text size="xl" color="primary.500" fontWeight={700}>
        Photo
      </Text>
      <HStack width="full" justifyContent="space-between">
        <Avatar
          width="67px"
          height="67px"
          name={user ? `${user?.firstName} ${user?.lastName}` : undefined}
        />
        {/* <EditButton /> */}
      </HStack>
    </VStack>
  );
};

export default Photo;
