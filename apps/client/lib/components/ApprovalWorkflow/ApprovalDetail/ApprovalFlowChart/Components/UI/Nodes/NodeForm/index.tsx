/* eslint-disable no-unused-vars */
import { useDisclosure } from '@chakra-ui/react';
import { getSession } from 'next-auth/react';
import {
  ApprovalWorkflowPartyInstance,
  CreateApprovalWorkflowPartyInstancePayload,
} from '~/lib/interfaces/approvalWorkflow.interfaces';
import {
  useCreateApprovalWorkflowPartyInstancesMutation,
  useUpdateApprovalWorkflowPartyInstancesMutation,
  useUpdateSubsequentPartyInstancesLevelNumbersMutation,
} from '~/lib/redux/services/approval-workflow/partyInstances.services';
import { useEffect, useState } from 'react';
import { User } from '~/lib/interfaces/user.interfaces';
import AddUserModal from '~/lib/components/RoleManagement/UserGroup/UserGroupForm/UserSelectModals/AddUserModal';
import ApprovalActionModal from '~/lib/components/AdminSettings/ApprovalWorkflow/Common/AddApproverModal/ApprovalActionModal';

interface NodeFormModalProps {
  isOpen: boolean;
  onClose: () => void;

  nodeId: string;
  selectedInstance: ApprovalWorkflowPartyInstance;
  type: 'add' | 'edit';
  position: 'right' | 'left' | 'same_level';
}

const NodeFormModal = (props: NodeFormModalProps) => {
  const { isOpen, onClose, selectedInstance, position, type } = props;
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
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

  const [
    createApprovalWorkflowPartyInstanceMutation,
    { isLoading: isCreatingApprovalWorkflowPartyInstance },
  ] = useCreateApprovalWorkflowPartyInstancesMutation();

  const [updateApprovalWorkflowPartyInstance, { isLoading: isUpdating }] =
    useUpdateApprovalWorkflowPartyInstancesMutation();

  const handleSubmit = async (actionId: number) => {
    const session = await getSession();

    const createPayload = {
      userId: selectedUser?.userId!,
      approvalRequirementTypeId: null,
      approvalActionId: actionId,
      parentId: selectedInstance.approvalWorkFlowPartyInstanceId,
      approvalWorkFlowInstanceId: selectedInstance.approvalWorkFlowInstanceId,
      approvalRequestId: selectedInstance.approvalRequestId,
      levelNumber:
        position === 'right'
          ? selectedInstance.levelNumber + 1
          : selectedInstance.levelNumber,
      createdBy: session?.user?.username!,
      overlap: position === 'same_level' ? true : false,
    };

    const updatePayload = {
      userId: selectedUser?.userId!,
      approvalRequirementTypeId: null!,
      approvalActionId: actionId,
      approvalWorkFlowPartyInstanceId:
        selectedInstance.approvalWorkFlowPartyInstanceId,
      approvalWorkFlowInstanceId: selectedInstance.approvalWorkFlowInstanceId,
      approvalRequestId: selectedInstance.approvalRequestId,
      levelNumber: selectedInstance.levelNumber,
      lastModifiedBy: session?.user?.username!,
    };

    let response;
    if (type === 'add') {
      response =
        await createApprovalWorkflowPartyInstanceMutation(createPayload);
    } else {
      response = await updateApprovalWorkflowPartyInstance({
        id: selectedInstance.approvalWorkFlowPartyInstanceId,
        overlap: false,
        data: updatePayload,
      });
    }

    if (response?.data) {
      onCloseApprovalAction();
      onClose();
    }
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
            handleSubmit(action.actionId);
          }}
          user={selectedUser!}
          handleBack={handleBack}
          isSubmitting={isCreatingApprovalWorkflowPartyInstance || isUpdating}
        />
      )}
    </>
  );
};

export default NodeFormModal;
