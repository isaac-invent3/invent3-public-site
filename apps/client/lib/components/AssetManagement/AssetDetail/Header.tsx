import { HStack, Icon } from '@chakra-ui/react';
import React from 'react';
import Button from '../../UI/Button';
import { CloseIcon } from '../../CustomIcons';
import { useAppSelector } from '~/lib/redux/hooks';

interface AssetHeaderProps {
  handleBack: () => void;
}
const AssetHeader = (props: AssetHeaderProps) => {
  const { handleBack } = props;
  const assetData = useAppSelector((state) => state.asset.asset);
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
          href={`/asset-management/${assetData.assetId}/edit`}
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
          href={`/asset-management/${assetData.assetId}/transfer`}
        >
          Transfer
        </Button>
      </HStack>
    </HStack>
  );
};

export default AssetHeader;
