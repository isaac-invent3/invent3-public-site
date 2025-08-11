import { useDisclosure } from '@chakra-ui/react';
import React, { useEffect } from 'react';
import ApprovalWorkflowRequiredClientModal from '../Modals/ApprovalWorkflowRequiredClientModal';
import ApprovalWorkflowRequiredUserModal from '../Modals/ApprovalWorkflowRequiredUserModal';
import { useSession } from 'next-auth/react';
import { ROLE_IDS_ENUM } from '~/lib/utils/constants';

interface ApprovalWorkflowWarningProps {
  type: 'transfer' | 'disposal';
  isBulk?: boolean;
  hasWorkflow: boolean;
}
const ApprovalWorkflowWarning = (props: ApprovalWorkflowWarningProps) => {
  const session = useSession();
  const { type, isBulk, hasWorkflow } = props;
  const {
    isOpen: isOpenUserNoWorkflowWarning,
    onOpen: onOpenUserNoWorkflowWarning,
    onClose: onCloseUserNoWorkflowWarning,
  } = useDisclosure();
  const {
    isOpen: isOpenClientNoWorkflowWarning,
    onOpen: onOpenClientNoWorkflowWarning,
    onClose: onCloseClientNoWorkflowWarning,
  } = useDisclosure();

  useEffect(() => {
    if (!hasWorkflow && session) {
      if (session?.data?.user?.roleIds.includes(ROLE_IDS_ENUM.CLIENT_ADMIN)) {
        onOpenClientNoWorkflowWarning();
      } else {
        onOpenUserNoWorkflowWarning();
      }
    }
  }, [hasWorkflow]);

  return (
    <>
      <ApprovalWorkflowRequiredClientModal
        isOpen={isOpenClientNoWorkflowWarning}
        onClose={onCloseClientNoWorkflowWarning}
        type={type}
        isBulk={isBulk}
      />
      <ApprovalWorkflowRequiredUserModal
        isOpen={isOpenUserNoWorkflowWarning}
        onClose={onCloseUserNoWorkflowWarning}
        type={type}
        isBulk={isBulk}
      />
    </>
  );
};

export default ApprovalWorkflowWarning;
