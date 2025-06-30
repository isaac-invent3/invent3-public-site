import { useDisclosure } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import AddUserModal from '~/lib/components/RoleManagement/UserGroup/UserGroupForm/UserSelectModals/AddUserModal';
import { User } from '~/lib/interfaces/user.interfaces';
import ApprovalActionModal from './ApprovalActionModal';
import { useFormikContext } from 'formik';
import { CreateApprovalWorkflowFormikValues } from '~/lib/interfaces/approvalWorkflow.interfaces';

interface AddApproverModalProps {
  isOpen: boolean;
  onClose: () => void;
  levelNumber: number;
}
const AddApproverModal = (props: AddApproverModalProps) => {
  const { isOpen, onClose, levelNumber } = props;
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const { setFieldValue, values } =
    useFormikContext<CreateApprovalWorkflowFormikValues>();
  const {
    isOpen: isOpenAddUser,
    onClose: onCloseAddUser,
    onOpen: onOpenAddUser,
  } = useDisclosure();
  const {
    isOpen: isOpenApprovalAction,
    onClose: onCloseApprovalAction,
    onOpen: onOpenApprovalAction,
  } = useDisclosure();

  useEffect(() => {
    if (isOpen) {
      onOpenAddUser();
    } else {
      onCloseAddUser();
    }
  }, [isOpen]);

  const handleBack = () => {
    onCloseApprovalAction();
    onOpenAddUser();
  };

  return (
    <>
      {isOpenAddUser && (
        <AddUserModal
          isOpen={isOpenAddUser}
          onClose={() => {
            onCloseAddUser();
            onClose();
          }}
          handleCustomAddUser={(user) => {
            setSelectedUser(user);
            onOpenApprovalAction();
          }}
        />
      )}
      {isOpenApprovalAction && (
        <ApprovalActionModal
          isOpen={isOpenApprovalAction}
          onClose={() => {
            onCloseApprovalAction();
            onClose();
          }}
          handleAddAction={(action) => {
            const currentApprovers =
              values.levels[levelNumber - 1]?.approvers || [];
            // Check if the user is already an approver
            const isAlreadyApprover = selectedUser
              ? currentApprovers.some((a) => a.userId === selectedUser.userId)
              : false;

            if (!isAlreadyApprover && selectedUser) {
              setFieldValue(`levels.${levelNumber - 1}.approvers`, [
                ...currentApprovers,
                {
                  userId: selectedUser.userId,
                  userFullName: `${selectedUser.firstName} ${selectedUser.lastName}`,
                  approvalActionId: action.actionId,
                  approvalActionName: action.actionName,
                  partyId: null,
                },
              ]);
            }
            onCloseApprovalAction();
          }}
          user={selectedUser!}
          handleBack={handleBack}
        />
      )}
    </>
  );
};

export default AddApproverModal;
