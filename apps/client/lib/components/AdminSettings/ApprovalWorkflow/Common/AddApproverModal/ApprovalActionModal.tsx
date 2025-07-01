import {
  Heading,
  HStack,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Skeleton,
  VStack,
} from '@chakra-ui/react';
import { Button, GenericModal } from '@repo/ui/components';
import React from 'react';
import UserInfo from '~/lib/components/Common/UserInfo';
import { User } from '~/lib/interfaces/user.interfaces';
import { useGetAllApprovalActionsQuery } from '~/lib/redux/services/approval-workflow/actions.services';

interface ApprovalActionModalProps {
  isOpen: boolean;
  onClose: () => void;
  handleAddAction?: (action: { actionId: number; actionName: string }) => void;
  user: User;
  handleBack?: () => void;
  isSubmitting?: boolean;
}
const ApprovalActionModal = (props: ApprovalActionModalProps) => {
  const { isOpen, onClose, handleAddAction, user, handleBack, isSubmitting } =
    props;
  const { data, isLoading } = useGetAllApprovalActionsQuery();
  const [selectedAction, setSelectedAction] = React.useState<{
    actionId: number;
    actionName: string;
  } | null>(null);
  return (
    <GenericModal
      isOpen={isOpen}
      onClose={onClose}
      contentStyle={{
        width: '445px',
        height: '575px',
        p: { base: '16px', lg: '24px' },
      }}
    >
      <ModalHeader p={0} m={0}>
        <VStack spacing="24px" width="full" alignItems="flex-start">
          <Heading size={{ lg: 'md' }}>Select Approval Action</Heading>

          <UserInfo name={`${user.firstName} ${user.lastName}`} />
        </VStack>
      </ModalHeader>
      <ModalBody p={0} m={0} mt="24px">
        <VStack width="full" spacing="24px" alignItems="flex-start">
          <VStack width="full" spacing="16px" alignItems="flex-start">
            {isLoading &&
              Array(5)
                .fill('')
                .map((_, index) => (
                  <Skeleton
                    width="full"
                    height="50px"
                    rounded="6px"
                    key={index}
                  />
                ))}
            {!isLoading && data?.data?.items.length === 0 && (
              <Heading size="sm" color="neutral.600">
                No actions available
              </Heading>
            )}
            {!isLoading &&
              data?.data?.items.map((action) => (
                <Button
                  key={action.approvalActionId}
                  variant="secondary"
                  customStyles={{
                    width: 'full',
                    height: '49px',
                    justifyContent: 'flex-start',
                    textAlign: 'left',
                    borderRadius: '8px',
                    backgroundColor:
                      selectedAction?.actionId === action.approvalActionId
                        ? 'primary.100'
                        : 'neutral.100',
                  }}
                  handleClick={() =>
                    setSelectedAction({
                      actionId: action.approvalActionId,
                      actionName: action.actionName,
                    })
                  }
                >
                  {action.actionName}
                </Button>
              ))}
          </VStack>
        </VStack>
      </ModalBody>
      <ModalFooter
        p={0}
        m={0}
        mt="24px"
        justifyContent="space-between"
        width="full"
      >
        <HStack spacing="16px" width="full" justifyContent="flex-end">
          {handleBack && (
            <Button
              variant="secondary"
              handleClick={handleBack}
              customStyles={{ width: 'max-content', height: '41px' }}
            >
              Back
            </Button>
          )}
          <Button
            customStyles={{ width: 'max-content', height: '41px' }}
            handleClick={() => {
              handleAddAction &&
                selectedAction &&
                handleAddAction(selectedAction);
            }}
            isDisabled={!selectedAction}
            isLoading={isSubmitting}
          >
            Continue
          </Button>
        </HStack>
      </ModalFooter>
    </GenericModal>
  );
};

export default ApprovalActionModal;
