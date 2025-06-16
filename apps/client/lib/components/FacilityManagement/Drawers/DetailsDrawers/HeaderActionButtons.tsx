import { HStack } from '@chakra-ui/react';
import { BackButton, Button } from '@repo/ui/components';
import React from 'react';

interface HeaderActionButtonsProps {
  closeDrawer: () => void;
  suffix: string;
  handleButtonClick: () => void;
}
const HeaderActionButtons = ({
  closeDrawer,
  suffix,
  handleButtonClick,
}: HeaderActionButtonsProps) => {
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
      <Button
        customStyles={{ height: '32px', width: 'max-content' }}
        handleClick={handleButtonClick}
      >
        Create {suffix}
      </Button>
    </HStack>
  );
};

export default HeaderActionButtons;
