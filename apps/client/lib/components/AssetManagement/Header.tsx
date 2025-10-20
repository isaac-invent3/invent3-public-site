import { HStack, Stack, useDisclosure } from '@chakra-ui/react';
import useCustomSearchParams from '~/lib/hooks/useCustomSearchParams';
import usePermissionAccess from '~/lib/hooks/useRoleAccess';
import { ROLE_IDS_ENUM, ROUTES } from '~/lib/utils/constants';
import ActionButtonPopover from '../UI/ActionButtonsPopover';
import PageHeader from '../UI/PageHeader';
import AssetTemplateModal from './Modals/AssetTemplateModal';
import { Button } from '@repo/ui/components';
import { useSession } from 'next-auth/react';
import LifeCycleSimulation from './Drawers/LifeCycleSimulation';

const Header = () => {
  const canCreateAsset = usePermissionAccess('asset:create');
  const { isOpen, onClose, onOpen } = useDisclosure();
  const session = useSession();
  const { getSearchParam } = useCustomSearchParams();
  const {
    isOpen: isOpenSimulator,
    onOpen: onOpenSimulator,
    onClose: onCloseSimulator,
  } = useDisclosure();

  const assetClassName = getSearchParam('assetClass');

  const canSimulateUsers = session?.data?.user?.roleIds?.some((roleId) =>
    [
      ROLE_IDS_ENUM.CLIENT_ADMIN,
      ROLE_IDS_ENUM.OPERATION_MANAGER,
      ROLE_IDS_ENUM.SUPER_ADMIN,
      ROLE_IDS_ENUM.EXECUTIVE,
    ].includes(roleId)
  );

  return (
    <>
      <Stack
        width="full"
        justifyContent="space-between"
        direction={{ base: 'column', md: 'row' }}
        spacing="16px"
        px={{ base: '16px', md: 0 }}
      >
        <PageHeader>{assetClassName ?? 'Asset Management'}</PageHeader>
        <HStack spacing={2}>
          {canSimulateUsers && (
            <Button
              variant="outline"
              customStyles={{ width: '191px' }}
              handleClick={onOpenSimulator}
            >
              Simulate Lifecycle Wizard
            </Button>
          )}
          {canCreateAsset && (
            <ActionButtonPopover
              onOpenTemplateModal={onOpen}
              actions={[
                {
                  label: 'Create a New Asset',
                  route: `/${ROUTES.ASSETS}/add`,
                },
              ]}
              buttonLabel="Add New Asset"
              modalLabel="Create From Existing"
            >
              {isOpen && (
                <AssetTemplateModal isOpen={isOpen} onClose={onClose} />
              )}
            </ActionButtonPopover>
          )}
        </HStack>
      </Stack>
      <LifeCycleSimulation
        isOpen={isOpenSimulator}
        onClose={onCloseSimulator}
      />
    </>
  );
};

export default Header;
