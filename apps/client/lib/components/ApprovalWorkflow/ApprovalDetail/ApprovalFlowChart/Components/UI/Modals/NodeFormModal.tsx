/* eslint-disable no-unused-vars */
import {
    Box,
  Button as ChakraButton,
  Grid,
  HStack,
  Icon,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Text,
  VStack,
} from '@chakra-ui/react';

import { Button, FormInputWrapper, GenericModal } from '@repo/ui/components';
import { CloseIcon } from '~/lib/components/CustomIcons';
import useNodeActions from '../../Logic/useNodeActions';

interface SubCategoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  nodeId: string;
  type: 'add' | 'edit';
}
const NodeFormModal = (props: SubCategoryModalProps) => {
  const { isOpen, onClose, nodeId, type } = props;

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
      contentStyle={{ width: { md: '605px' } }}
    >
      <ModalHeader m={0} p={0} my="24px" px="24px">
        <HStack w="full" justifyContent="space-between">
          <Text
            fontSize="24px"
            lineHeight="28.51px"
            color="primary.500"
            fontWeight={700}
          >
            {type === 'add' ? 'Create' : 'Edit'} Approval Workflow Node
          </Text>

          <HStack color="#F50000" onClick={onClose}>
            <Text>Close</Text>
            <Icon as={CloseIcon} />
          </HStack>
        </HStack>
      </ModalHeader>

      <ModalBody p="24px" m={0} width="full">
        <VStack w="full" gap="8px">
          <FormInputWrapper
            sectionMaxWidth="141px"
            spacing="24px"
            description="Choose the category and the sub-category"
            title="Approval Action"
            isRequired
          >
            <Grid
              templateColumns={{
                base: '1fr',
                md: 'repeat(2, 1fr)',
              }}
              gap="16px"
              height="100%"
              w="full"
            >
              {actionGroups.map((actionGroup) => (
                <ChakraButton
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
                </ChakraButton>
              ))}
            </Grid>
          </FormInputWrapper>
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

          <Button customStyles={{ width: '138px', height: '50px' }}>
            Create Node
          </Button>
        </HStack>
      </ModalFooter>
    </GenericModal>
  );
};

export default NodeFormModal;
