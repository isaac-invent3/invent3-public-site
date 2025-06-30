import { Flex, HStack, Icon, useDisclosure } from '@chakra-ui/react';
import { Button } from '@repo/ui/components';
import { CloseIcon } from '../../CustomIcons';
import { useAppSelector } from '~/lib/redux/hooks';
import CreateTicketDrawer from '../../TicketManagement/Drawers/CreateTicketDrawer';
import { ROUTES } from '~/lib/utils/constants';
import usePermissionAccess from '~/lib/hooks/useRoleAccess';
import MobilePopover from './MobilePopover';

interface AssetHeaderProps {
  handleBack: () => void;
  type: 'template' | 'main';
  showHeaderButtons: boolean;
}
const AssetHeader = (props: AssetHeaderProps) => {
  const { handleBack, type, showHeaderButtons } = props;
  const assetData = useAppSelector((state) => state.asset.asset);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const canTransferAsset = usePermissionAccess('asset:transfer');
  const canDisposeAsset = usePermissionAccess('asset:dispose');
  const canRaiseTicket = usePermissionAccess('asset:raise_ticket');
  const canEditAsset = usePermissionAccess('asset:edit');

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
      {showHeaderButtons &&
        (type === 'main' ? (
          <>
            {assetData && (
              <Flex display={{ lg: 'none' }}>
                <MobilePopover data={assetData} />
              </Flex>
            )}
            <HStack
              width="min-content"
              spacing="8px"
              display={{ base: 'none', lg: 'flex' }}
            >
              {canEditAsset && (
                <Button
                  customStyles={{ height: '35px', width: '106px', px: '16px' }}
                  variant="primary"
                  href={`/${ROUTES.ASSETS}/${assetData?.assetId}/edit`}
                >
                  Edit Asset
                </Button>
              )}
              {canRaiseTicket && (
                <Button
                  handleClick={onOpen}
                  customStyles={{ height: '35px', px: '12px', width: '106px' }}
                  variant="outline"
                >
                  Raise Ticket
                </Button>
              )}
              {canTransferAsset && (
                <Button
                  customStyles={{
                    height: '35px',
                    width: '106px',
                    px: '8px',
                    fontSize: '14px',
                    lineHeight: '16.63px',
                  }}
                  variant="secondary"
                  href={`/${ROUTES.ASSETS}/${assetData?.assetId}/transfer`}
                >
                  Transfer
                </Button>
              )}
              {canDisposeAsset && (
                <Button
                  customStyles={{
                    height: '35px',
                    width: '106px',
                    px: '8px',
                    fontSize: '14px',
                    lineHeight: '16.63px',
                  }}
                  variant="secondary"
                  href={`/${ROUTES.ASSETS}/${assetData?.assetId}/dispose`}
                >
                  Dispose
                </Button>
              )}
            </HStack>
          </>
        ) : (
          <Button
            customStyles={{ height: '35px', width: 'min-content', px: '16px' }}
            variant="primary"
            href={`/${ROUTES.ASSETS}/add?assetId=${assetData?.assetId}`}
          >
            Use As Template
          </Button>
        ))}

      {isOpen && (
        <CreateTicketDrawer
          asset={assetData ?? undefined}
          isOpen={isOpen}
          onClose={onClose}
        />
      )}
    </HStack>
  );
};

export default AssetHeader;
