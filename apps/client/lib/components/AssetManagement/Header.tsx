import { Stack, useDisclosure } from '@chakra-ui/react';
import useCustomSearchParams from '~/lib/hooks/useCustomSearchParams';
import usePermissionAccess from '~/lib/hooks/useRoleAccess';
import { ROUTES } from '~/lib/utils/constants';
import ActionButtonPopover from '../UI/ActionButtonsPopover';
import PageHeader from '../UI/PageHeader';
import AssetTemplateModal from './Modals/AssetTemplateModal';

const Header = () => {
  const canCreateAsset = usePermissionAccess('asset:create');
  const { isOpen, onClose, onOpen } = useDisclosure();

  const { getSearchParam } = useCustomSearchParams();

  const assetClassName = getSearchParam('assetClass');

  return (
    <Stack
      width="full"
      justifyContent="space-between"
      direction={{ base: 'column', sm: 'row' }}
      spacing="16px"
      px={{ base: '16px', md: 0 }}
    >
      <PageHeader>{assetClassName ?? 'Asset Management'}</PageHeader>

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
          <AssetTemplateModal isOpen={isOpen} onClose={onClose} />
        </ActionButtonPopover>
      )}
    </Stack>
  );
};

export default Header;
