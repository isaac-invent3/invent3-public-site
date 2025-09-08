import { HStack, Icon, useDisclosure } from '@chakra-ui/react';
import { GenericDeleteModal } from '@repo/ui/components';
import { DeleteIcon, PenIcon } from '~/lib/components/CustomIcons';
import { AdminFormDetails } from '~/lib/interfaces/company.interfaces';
import { useAppDispatch, useAppSelector } from '~/lib/redux/hooks';
import { updateCompanyForm } from '~/lib/redux/slices/CompanySlice';

interface ActionPopoverProps {
  type: 'create' | 'edit' | 'list';
  info: AdminFormDetails;
  handleEditAdmin: (data: AdminFormDetails) => void;
}
const ActionPopover = (props: ActionPopoverProps) => {
  const { type, info, handleEditAdmin } = props;
  const { admins, deletedAdminIDs } = useAppSelector(
    (state) => state.company.companyForm
  );
  const dispatch = useAppDispatch();
  const { isOpen, onClose, onOpen } = useDisclosure();

  const handleDeleteAdmin = async () => {
    const newAdmins = admins.filter((item) => item.localId !== info.localId);
    dispatch(updateCompanyForm({ admins: newAdmins }));
    // Mark as deleted
    if (info.contactId) {
      dispatch(
        updateCompanyForm({
          deletedAdminIDs: [...deletedAdminIDs, info.contactId],
        })
      );
    }
  };

  return (
    <>
      <HStack spacing="16px">
        {type === 'create' && (
          <Icon
            as={PenIcon}
            color="#212121"
            boxSize="20px"
            cursor="pointer"
            onClick={() => handleEditAdmin(info)}
          />
        )}
        <Icon
          as={DeleteIcon}
          color="#F50000"
          boxSize="20px"
          cursor="pointer"
          onClick={onOpen}
        />
      </HStack>
      {isOpen && (
        <GenericDeleteModal
          isOpen={isOpen}
          onClose={onClose}
          handleDelete={handleDeleteAdmin}
        />
      )}
    </>
  );
};

export default ActionPopover;
