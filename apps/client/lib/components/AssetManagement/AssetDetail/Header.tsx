import { HStack, Icon, useDisclosure } from '@chakra-ui/react';
import { Button } from '@repo/ui/components';
import { CloseIcon } from '../../CustomIcons';
import { useAppSelector } from '~/lib/redux/hooks';
import CreateTicketDrawer from '../../TicketManagement/Drawers/CreateTicketDrawer';

interface AssetHeaderProps {
  handleBack: () => void;
}
const AssetHeader = (props: AssetHeaderProps) => {
  const { handleBack } = props;
  const assetData = useAppSelector((state) => state.asset.asset);
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <HStack width="full" justifyContent="space-between">
      <HStack spacing="16px">
        <Button
          customStyles={{ height: '32px', px: '12px' }}
          variant="secondary"
          handleClick={handleBack}
        >
          <Icon as={CloseIcon} boxSize="16px" color="primary.500" mr="8px" />
          Back
        </Button>
      </HStack>
      <HStack width="min-content" spacing="8px">
        <Button
          customStyles={{ height: '35px', width: '106px', px: '16px' }}
          variant="primary"
          href={`/asset-management/${assetData.assetId}/edit`}
        >
          Edit Asset
        </Button>
        <Button
          handleClick={onOpen}
          customStyles={{ height: '35px', px: '12px', width: '106px' }}
          variant="outline"
        >
          Raise Ticket
        </Button>
        <Button
          customStyles={{
            height: '35px',
            width: '106px',
            px: '8px',
            fontSize: '14px',
            lineHeight: '16.63px',
          }}
          variant="secondary"
          href={`/asset-management/${assetData.assetId}/transfer`}
        >
          Transfer
        </Button>
        <Button
          customStyles={{
            height: '35px',
            width: '106px',
            px: '8px',
            fontSize: '14px',
            lineHeight: '16.63px',
          }}
          variant="secondary"
          href={`/asset-management/${assetData.assetId}/dispose`}
        >
          Dispose
        </Button>
      </HStack>

      {isOpen && (
        <CreateTicketDrawer
          asset={assetData}
          isOpen={isOpen}
          onClose={onClose}
        />
      )}
    </HStack>
  );
};

export default AssetHeader;
