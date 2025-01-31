import { HStack, useDisclosure } from '@chakra-ui/react';
import PageHeader from '../UI/PageHeader';
import ActionButtonPopover from '../UI/ActionButtonsPopover';
import AssetTemplateModal from './Modals/AssetTemplateModal';
import { ROUTES } from '~/lib/utils/constants';
import usePermissionAccess from '~/lib/hooks/useRoleAccess';

const Header = () => {
  const canCreateAsset = usePermissionAccess('asset:create');
  const { isOpen, onClose, onOpen } = useDisclosure();
  return (
    <HStack width="full" justifyContent="space-between">
      <PageHeader>Asset Management</PageHeader>
      {canCreateAsset && (
        <ActionButtonPopover
          onOpenTemplateModal={onOpen}
          newRoute={`/${ROUTES.ASSETS}/add`}
          buttonLabel="Add New Asset"
          linkLabel="Create a New Asset"
          modalLabel="Create From Existing"
        >
          <AssetTemplateModal isOpen={isOpen} onClose={onClose} />
        </ActionButtonPopover>
      )}
    </HStack>
  );
};

export default Header;
