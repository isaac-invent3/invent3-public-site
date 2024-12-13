import { HStack, useDisclosure, VStack } from '@chakra-ui/react';
import PageHeader from '../UI/PageHeader';
import { GenericBreadCrumb } from '@repo/ui/components';
import ActionButtonPopover from '../UI/ActionButtonsPopover';
import AssetTemplateModal from './Modals/AssetTemplateModal';

const breadCrumbData = [
  {
    label: 'Dashboard',
    route: '/',
  },
  {
    label: 'Asset Management',
    route: '#',
  },
];
const Header = () => {
  const { isOpen, onClose, onOpen } = useDisclosure();
  return (
    <VStack spacing="58px" alignItems="flex-start" width="full" pt="12px">
      <GenericBreadCrumb routes={breadCrumbData} />
      <HStack width="full" justifyContent="space-between">
        <PageHeader>Asset Management</PageHeader>
        <ActionButtonPopover
          onOpenTemplateModal={onOpen}
          newRoute="/asset-management/add"
          buttonLabel="Create New Asset"
          linkLabel="Create a New Asset"
          modalLabel="Create From Existing"
        >
          <AssetTemplateModal isOpen={isOpen} onClose={onClose} />
        </ActionButtonPopover>
      </HStack>
    </VStack>
  );
};

export default Header;
