import { HStack, useDisclosure } from '@chakra-ui/react';
import PageHeader from '../UI/PageHeader';
import ActionButtonPopover from '../UI/ActionButtonsPopover';
import AssetTemplateModal from './Modals/AssetTemplateModal';

const Header = () => {
  const { isOpen, onClose, onOpen } = useDisclosure();
  return (
    <HStack width="full" justifyContent="space-between" pt="40px">
      <PageHeader>Asset Management</PageHeader>
      <ActionButtonPopover
        onOpenTemplateModal={onOpen}
        newRoute="/asset-management/add"
        buttonLabel="Add New Asset"
        linkLabel="Create a New Asset"
        modalLabel="Create From Existing"
      >
        <AssetTemplateModal isOpen={isOpen} onClose={onClose} />
      </ActionButtonPopover>
    </HStack>
  );
};

export default Header;
