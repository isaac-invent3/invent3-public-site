import { Icon } from '@chakra-ui/react';
import React from 'react';
import { ChevronDownIcon } from '../CustomIcons';
import { Button, GenericPopover } from '@repo/ui/components';

interface DrawerActionProps {
  children: React.ReactNode;
}
export const DrawerAction = ({ children }: DrawerActionProps) => {
  return (
    <GenericPopover
      width="137px"
      placement="bottom-start"
      popoverTriggerElement={
        <Button
          variant="secondary"
          customStyles={{
            width: '100px',
            height: '47px',
            bgColor: '#0366EF1A',
          }}
        >
          Actions
          <Icon
            as={ChevronDownIcon}
            color="neutral.800"
            boxSize="16px"
            ml="8px"
          />
        </Button>
      }
    >
      {children}
    </GenericPopover>
  );
};
