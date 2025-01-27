/* eslint-disable no-unused-vars */
import {
  Button,
  HStack,
  Icon,
  ModalBody,
  ModalHeader,
  Text,
  VStack,
} from '@chakra-ui/react';

import { GenericModal } from '@repo/ui/components';
import { CloseIcon } from '~/lib/components/CustomIcons';
import useNodeActions from '../../Logic/useNodeActions';

interface SubCategoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  nodeId: string;
}
const AddApprovalActionModal = (props: SubCategoryModalProps) => {
  const { isOpen, onClose, nodeId } = props;

  const actionGroups = [
    { actionId: 1, actionName: 'Require to Approve' },
    { actionId: 2, actionName: 'Parallel Approve' },
    { actionId: 3, actionName: 'Inform when Approve' },
    { actionId: 4, actionName: 'Acknowledge Approval' },
    { actionId: 5, actionName: 'Escalate to (if no action)' },
  ];

  const { onUpdateNode } = useNodeActions();

  return (
    <GenericModal
      isOpen={isOpen}
      onClose={onClose}
      contentStyle={{ width: { sm: '450px' } }}
    >
      <ModalHeader m={0} p={0} my="24px" px="24px">
        <HStack w="full" justifyContent="space-between">
          <Text
            fontSize="24px"
            lineHeight="28.51px"
            color="primary.500"
            fontWeight={700}
          >
            Select Approval Action
          </Text>

          <HStack color="#F50000" onClick={onClose}>
            <Text>Close</Text>
            <Icon as={CloseIcon} />
          </HStack>
        </HStack>
      </ModalHeader>

      <ModalBody p="24px" m={0} width="full">
        <VStack w="full" gap="8px">
          {actionGroups.map((actionGroup) => (
            <Button
              key={actionGroup.actionId}
              w="full"
              bgColor="#F7F7F7"
              color="primary.500"
              py="16px"
              px="8px"
              justifyContent="start"
              onClick={() => {
                onUpdateNode(nodeId, {
                  actionId: actionGroup.actionId,
                  actionName: actionGroup.actionName,
                });
                onClose();
              }}
            >
              <Text size="md" fontWeight={700}>
                {actionGroup.actionName}
              </Text>
            </Button>
          ))}
        </VStack>
      </ModalBody>
    </GenericModal>
  );
};

export default AddApprovalActionModal;
