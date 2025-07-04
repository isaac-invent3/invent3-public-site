import {
  Flex,
  HStack,
  Icon,
  Text,
  useDisclosure,
  VStack,
} from '@chakra-ui/react';
import { Button } from '@repo/ui/components';
import { CloseIcon } from '../../CustomIcons';
import { useAppSelector } from '~/lib/redux/hooks';
import CreateTicketDrawer from '../../TicketManagement/Drawers/CreateTicketDrawer';
import { ROUTES } from '~/lib/utils/constants';
import usePermissionAccess from '~/lib/hooks/useRoleAccess';
import { DrawerAction } from '../../UI/DrawerAction';

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
      {showHeaderButtons && (
        <DrawerAction>
          <VStack width="full" alignItems="flex-start" spacing="16px">
            {type === 'main' ? (
              <VStack width="full" alignItems="flex-start" spacing="16px">
                {canEditAsset && (
                  <Text
                    cursor="pointer"
                    as="a"
                    href={`/${ROUTES.ASSETS}/${assetData?.assetId}/dispose`}
                  >
                    Edit Asset
                  </Text>
                )}
                {canRaiseTicket && (
                  <Text cursor="pointer" onClick={onOpen}>
                    Raise Ticket
                  </Text>
                )}
                {canTransferAsset && (
                  <Text
                    cursor="pointer"
                    as="a"
                    href={`/${ROUTES.ASSETS}/${assetData?.assetId}/dispose`}
                  >
                    Transfer
                  </Text>
                )}
                {canDisposeAsset && (
                  <Text
                    cursor="pointer"
                    as="a"
                    href={`/${ROUTES.ASSETS}/${assetData?.assetId}/dispose`}
                  >
                    Dispose
                  </Text>
                )}
              </VStack>
            ) : (
              <Text
                cursor="pointer"
                as="a"
                href={`/${ROUTES.ASSETS}/add?assetId=${assetData?.assetId}`}
              >
                Use As Template
              </Text>
            )}
          </VStack>
        </DrawerAction>
      )}

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
