import { HStack, Icon, Text, VStack } from '@chakra-ui/react';
import React from 'react';
import { AddIcon, PenIcon } from '~/lib/components/CustomIcons';
import DetailHeader from '~/lib/components/UI/DetailHeader';

interface NewLocationProps {
  newLocation: string;
}
const NewLocation = (props: NewLocationProps) => {
  const { newLocation } = props;

  return (
    <VStack spacing="32px" alignItems="flex-start" width="full">
      <VStack spacing="16px" alignItems="flex-start" width="full">
        <DetailHeader variant="secondary" customStyles={{ fontWeight: 700 }}>
          New Location
        </DetailHeader>
        {newLocation && (
          <Text
            minH="131px"
            bgColor="neutral.100"
            color="black"
            px="16px"
            py="8px"
            rounded="8px"
            width="full"
          >
            {newLocation}
          </Text>
        )}
      </VStack>
      <HStack spacing="4px">
        <Icon
          as={newLocation ? PenIcon : AddIcon}
          boxSize={!newLocation ? '18px' : '16px'}
          color="blue.500"
        />
        <Text color="blue.500" mt="3px">
          {newLocation ? 'Edit' : 'Add'} Location
        </Text>
      </HStack>
    </VStack>
  );
};

export default NewLocation;
