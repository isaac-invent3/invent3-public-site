/* eslint-disable no-unused-vars */
import { Text, VStack } from '@chakra-ui/react';
import { GenericPopover } from '@repo/ui/components';
import Link from 'next/link';
import { ApprovalWorkflowRequest } from '~/lib/interfaces/approvalWorkflow.interfaces';
import { ROUTES } from '~/lib/utils/constants';

interface PopoverActionProps {
  data: ApprovalWorkflowRequest;
}

const PopoverAction = ({ data }: PopoverActionProps) => {
  return (
    <>
      <GenericPopover width="137px" placement="bottom-start">
        <VStack width="full" alignItems="flex-start" spacing="16px">
          <Link href={`/${ROUTES.APPROVAL}/${data.approvalRequestId}/detail`}>
            <Text cursor="pointer">View Workflow</Text>
          </Link>
        </VStack>
      </GenericPopover>
    </>
  );
};

export default PopoverAction;
