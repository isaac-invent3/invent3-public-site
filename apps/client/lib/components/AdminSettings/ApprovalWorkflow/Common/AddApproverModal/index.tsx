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
  isEscalator?: boolean;
}
const AddApproverModal = (props: AddApproverModalProps) => {
  const { isOpen, onClose, levelNumber, isEscalator } = props;
  const [user, setSelectedUser] = useState<User | null>(null);
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
            if (isEscalator) {
              // If it's an escalator, set the user directly without opening action modal
              const currentApprovers =
                values.levels[levelNumber - 1]?.approvers || [];
              // Check if the user is already an approver
              const isAlreadyApprover = user
                ? currentApprovers.some((a) => a.userId === user.userId)
                : false;

              if (!isAlreadyApprover && user) {
                setFieldValue(`levels.${levelNumber - 1}.escalatorApprover`, {
                  userId: user.userId,
                  userFullName: `${user.firstName} ${user.lastName}`,
                });
              }
              onCloseAddUser();
              onClose();
              return;
            }
            onCloseAddUser();
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
            const isAlreadyApprover = user
              ? currentApprovers.some((a) => a.userId === user.userId)
              : false;

            if (!isAlreadyApprover && user) {
              setFieldValue(`levels.${levelNumber - 1}.approvers`, [
                ...currentApprovers,
                {
                  userId: user.userId,
                  userFullName: `${user.firstName} ${user.lastName}`,
                  approvalActionId: action.actionId,
                  approvalActionName: action.actionName,
                  // isEscalator: false,
                  partyId: null,
                },
              ]);
            }
            onCloseApprovalAction();
            onClose();
          }}
          user={user!}
          handleBack={handleBack}
        />
      )}
    </>
  );
};

export default AddApproverModal;
