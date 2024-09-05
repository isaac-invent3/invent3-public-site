import { HStack, Icon } from '@chakra-ui/react';
import React from 'react';
import Button from '../../UI/Button';
import { CloseIcon } from '../../CustomIcons';

interface AssetHeaderProps {
  handleBack: () => void;
}
const AssetHeader = (props: AssetHeaderProps) => {
  const { handleBack } = props;
  return (
    <HStack width="full" justifyContent="space-between">
      <HStack spacing="16px">
        <Button
          customStyles={{ minH: '28px', px: '12px' }}
          variant="secondary"
          handleClick={handleBack}
        >
          <Icon as={CloseIcon} boxSize="16px" color="primary.500" mr="8px" />
          Back to Grid
        </Button>

        <Button customStyles={{ minH: '28px', px: '12px' }} variant="secondary">
          Asset Open Ticket
        </Button>
      </HStack>
      <HStack>
        <Button
          customStyles={{ minH: '34px', minW: '60px', px: '16px' }}
          variant="secondary"
        >
          Edit
        </Button>
        <Button
          customStyles={{
            minH: '34px',
            minW: '94px',
            px: '8px',
            fontSize: '14px',
            lineHeight: '16.63px',
          }}
          variant="outline"
        >
          Dispose
        </Button>
        <Button
          customStyles={{
            minH: '34px',
            minW: '94px',
            px: '8px',
            fontSize: '14px',
            lineHeight: '16.63px',
          }}
          variant="primary"
        >
          Transfer
        </Button>
      </HStack>
    </HStack>
  );
};

export default AssetHeader;
