/* eslint-disable no-unused-vars */
import { Text, useDisclosure, VStack } from '@chakra-ui/react';
import { GenericPopover } from '@repo/ui/components';
import usePermissionAccess from '~/lib/hooks/useRoleAccess';
import { Asset } from '~/lib/interfaces/asset/general.interface';
import { ROUTES } from '~/lib/utils/constants';
import CreateTicketDrawer from '../../TicketManagement/Drawers/CreateTicketDrawer';
import { DrawerAction } from '../../UI/DrawerAction';

interface MobilePopoverProps {
  data: Asset;
}
const MobilePopover = (props: MobilePopoverProps) => {
  const { data } = props;
  const { isOpen, onOpen, onClose } = useDisclosure();
  const canEditAsset = usePermissionAccess('asset:edit');
  const canRaiseTicket = usePermissionAccess('asset:raise_ticket');
  const canTransferAsset = usePermissionAccess('asset:transfer');
  const canDisposeAsset = usePermissionAccess('asset:dispose');

  return (
    <>
      <DrawerAction>
        <VStack width="full" alignItems="flex-start" spacing="16px">
          <VStack width="full" alignItems="flex-start" spacing="16px">
            {canEditAsset && (
              <Text
                cursor="pointer"
                as="a"
                href={`/${ROUTES.ASSETS}/${data?.assetId}/dispose`}
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
                href={`/${ROUTES.ASSETS}/${data?.assetId}/dispose`}
              >
                Transfer
              </Text>
            )}
            {canDisposeAsset && (
              <Text
                cursor="pointer"
                as="a"
                href={`/${ROUTES.ASSETS}/${data?.assetId}/dispose`}
              >
                Dispose
              </Text>
            )}
          </VStack>
        </VStack>
      </DrawerAction>
      {isOpen && (
        <CreateTicketDrawer
          asset={data ?? undefined}
          isOpen={isOpen}
          onClose={onClose}
        />
      )}
    </>
  );
};

export default MobilePopover;
