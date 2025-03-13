/* eslint-disable no-unused-vars */
import {
  HStack,
  ModalBody,
  ModalFooter,
  ModalHeader,
  VStack,
} from '@chakra-ui/react';

import { Button, GenericModal } from '@repo/ui/components';
import { FormikProvider, useFormik } from 'formik';
import { getSession } from 'next-auth/react';
import {
  ApprovalWorkflowPartyInstance,
  CreateApprovalWorkflowPartyInstancePayload,
} from '~/lib/interfaces/approvalWorkflow.interfaces';
import {
  useCreateApprovalWorkflowPartyInstancesMutation,
  useUpdateSubsequentPartyInstancesLevelNumbersMutation,
} from '~/lib/redux/services/approval-workflow/partyInstances.services';
import ApprovalAction from './ApprovalAction';
import ApprovalAssignee from './ApprovalAssignee';
import ApprovalRequirementType from './ApprovalRequirementType';
import Header from './Header';

interface SubCategoryModalProps {
  isOpen: boolean;
  onClose: () => void;

  nodeId: string;
  selectedInstance: ApprovalWorkflowPartyInstance;
  type: 'add' | 'edit';
  position: 'right' | 'left' | 'same_level';
}

const NodeFormModal = (props: SubCategoryModalProps) => {
  const { isOpen, onClose, selectedInstance, position, type } = props;

  const [
    createApprovalWorkflowPartyInstanceMutation,
    { isLoading: isCreatingApprovalWorkflowPartyInstance },
  ] = useCreateApprovalWorkflowPartyInstancesMutation();

  const [
    updateSubsequentPartyInstancesLevelNumbersMutation,
    { isLoading: isUpdatingSubsequentPartyInstancesLevelNumbersMutation },
  ] = useUpdateSubsequentPartyInstancesLevelNumbersMutation();

  const formik = useFormik({
    initialValues: {
      userId: null,
      approvalRequirementTypeId: null,
      approvalActionId: null,
    },
    enableReinitialize: false,
    onSubmit: async (data, { resetForm }) => {
      const session = await getSession();

      const payload: CreateApprovalWorkflowPartyInstancePayload = {
        ...data,
        parentId: selectedInstance.approvalWorkFlowPartyInstanceId,
        approvalWorkFlowInstanceId: selectedInstance.approvalWorkFlowInstanceId,
        approvalRequestId: selectedInstance.approvalRequestId,
        levelNumber:
          position === 'right'
            ? selectedInstance.levelNumber + 1
            : selectedInstance.levelNumber,
        createdBy: session?.user?.username!,
      };

      const response =
        await createApprovalWorkflowPartyInstanceMutation(payload);

      if (!response.data) return;

      resetForm();
      onClose();
    },
  });

  return (
    <GenericModal
      isOpen={isOpen}
      onClose={onClose}
      contentStyle={{ width: { md: '605px' } }}
    >
      <ModalHeader m={0} p={0} my="24px" px="24px">
        <Header onClose={onClose} type={type} />
      </ModalHeader>

      <FormikProvider value={formik}>
        <form style={{ width: '100%' }} onSubmit={formik.handleSubmit}>
          <ModalBody p="24px" m={0} width="full" h="full">
            <VStack w="full" gap="32px">
              <ApprovalRequirementType />
              <ApprovalAction />
              <ApprovalAssignee />
            </VStack>
          </ModalBody>

          <ModalFooter p={0} m={0}>
            <HStack
              spacing="8px"
              justifyContent="flex-end"
              mt="8px"
              px="24px"
              pb="32px"
            >
              <Button
                customStyles={{ width: '138px', height: '50px' }}
                variant="secondary"
                handleClick={onClose}
              >
                Cancel
              </Button>

              <Button
                type="submit"
                isLoading={
                  isCreatingApprovalWorkflowPartyInstance ||
                  isUpdatingSubsequentPartyInstancesLevelNumbersMutation
                }
                customStyles={{ width: '138px', height: '50px' }}
              >
                Create Node
              </Button>
            </HStack>
          </ModalFooter>
        </form>
      </FormikProvider>
    </GenericModal>
  );
};

export default NodeFormModal;
