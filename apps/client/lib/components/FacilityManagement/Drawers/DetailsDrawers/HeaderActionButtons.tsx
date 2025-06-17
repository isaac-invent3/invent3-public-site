import { HStack, Icon } from '@chakra-ui/react';
import { BackButton, Button } from '@repo/ui/components';
import React from 'react';
import { DoubleRightChevronIcon } from '~/lib/components/CustomIcons';
import { closeAllDrawers } from './utils';

interface HeaderActionButtonsProps {
  closeDrawer: () => void;
  suffix: string;
  handleButtonClick: () => void;
  children?: React.ReactNode;
  showCloseAll?: boolean;
}
const HeaderActionButtons = ({
  closeDrawer,
  suffix,
  handleButtonClick,
  children,
  showCloseAll = true,
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
      <HStack spacing="16px">
        {showCloseAll && (
          <Button
            customStyles={{ height: '32px', width: '44px' }}
            handleClick={closeAllDrawers}
            variant="secondary"
          >
            <Icon as={DoubleRightChevronIcon} boxSize="20px" />
          </Button>
        )}
        <BackButton handleClick={closeDrawer} />
      </HStack>
      <HStack spacing="16px">
        <Button
          customStyles={{ height: '32px', width: 'max-content' }}
          handleClick={handleButtonClick}
        >
          Create {suffix}
        </Button>
        {children}
      </HStack>
    </HStack>
  );
};

export default HeaderActionButtons;
