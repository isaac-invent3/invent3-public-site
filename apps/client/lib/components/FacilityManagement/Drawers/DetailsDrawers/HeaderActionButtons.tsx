import { HStack, Icon, Text, VStack } from '@chakra-ui/react';
import { BackButton, Button, GenericPopover } from '@repo/ui/components';
import React from 'react';
import { ChevronDownIcon } from '~/lib/components/CustomIcons';

interface HeaderActionButtonsProps {
  closeDrawer: () => void;
}
const HeaderActionButtons = ({ closeDrawer }: HeaderActionButtonsProps) => {
  return (
    <HStack
      pt="16px"
      pb="29px"
      pl="32px"
      pr="28px"
      width="full"
      justifyContent="space-between"
    >
      <BackButton handleClick={closeDrawer} />
      <GenericPopover
        width="180px"
        placement="auto"
        popoverTriggerElement={
          <Button
            variant="secondary"
            customStyles={{ width: '102px', height: '35px' }}
          >
            Edit
            <Icon
              as={ChevronDownIcon}
              color="neutral.800"
              boxSize="16px"
              ml="8px"
            />
          </Button>
        }
      >
        <VStack width="full" alignItems="flex-start" spacing="16px">
          <Text cursor="pointer">Edit Building</Text>
          <Text cursor="pointer">Edit Floor</Text>
          <Text cursor="pointer">Edit Department</Text>
          <Text cursor="pointer">Edit Room</Text>
          <Text cursor="pointer">Edit Aisle</Text>
          <Text cursor="pointer">Edit Shelf</Text>
        </VStack>
      </GenericPopover>
    </HStack>
  );
};

export default HeaderActionButtons;
