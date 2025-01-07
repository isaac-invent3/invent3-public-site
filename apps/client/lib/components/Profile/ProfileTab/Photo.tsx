import { Avatar, HStack, Text, VStack } from '@chakra-ui/react';
import React from 'react';
import EditButton from '../Common/EditButton';

const Photo = () => {
  return (
    <VStack width="full" spacing="16px" alignItems="flex-start">
      <Text size="xl" color="primary.500" fontWeight={700}>
        Photo
      </Text>
      <HStack width="full" justifyContent="space-between">
        <Avatar width="67px" height="67px" />
        <EditButton />
      </HStack>
    </VStack>
  );
};

export default Photo;
