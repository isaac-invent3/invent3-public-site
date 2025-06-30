import { Skeleton, Text, useDisclosure, VStack } from '@chakra-ui/react';
import { Button, EmptyState, SlideTransition } from '@repo/ui/components';
import React from 'react';
import { useGetAllApprovalWorkflowQuery } from '~/lib/redux/services/approval-workflow/settings.services';
import { DEFAULT_PAGE_SIZE } from '~/lib/utils/constants';
import ExistingApprovalWorkflow from './ExistingApprovalWorkflow';
import CreateApprovalWorkflow from './CreateApprovalWorkflow';

const ApprovalWorkflow = () => {
  const { isOpen, onClose, onOpen } = useDisclosure();
  const { data, isLoading } = useGetAllApprovalWorkflowQuery({
    pageNumber: 1,
    pageSize: DEFAULT_PAGE_SIZE,
  });
  return (
    <VStack
      spacing="24px"
      width="full"
      alignItems="flex-end"
      bgColor="white"
      p={{ base: '16px', md: '24px' }}
      rounded={{ md: '6px' }}
      minH={{ base: '60vh' }}
    >
      <Button handleClick={onOpen} customStyles={{ width: 'max-content' }}>
        Create Approval Flow
      </Button>
      <VStack width="full" alignItems="flex-start" spacing="24px">
        <VStack width="full" alignItems="flex-start" spacing="16px">
          {isLoading &&
            Array(5)
              .fill(0)
              .map((_, index) => (
                <Skeleton
                  key={index}
                  width="full"
                  height="56px"
                  rounded="8px"
                />
              ))}
          {!isLoading &&
            data?.data &&
            data?.data?.items.length > 0 &&
            data?.data?.items.map((item) => (
              <ExistingApprovalWorkflow data={item} key={item.approvalTypeId} />
            ))}
          {!isLoading && data?.data && data?.data?.items.length === 0 && (
            <VStack width="full" alignItems="center" spacing="16px" my="10vh">
              <Text color="neutral.600" size="md">
                No Approval Workflows Found
              </Text>
              <Button
                handleClick={onOpen}
                customStyles={{ width: 'max-content' }}
              >
                Create Approval Flow
              </Button>
            </VStack>
          )}
        </VStack>
        <SlideTransition trigger={isOpen}>
          <CreateApprovalWorkflow
            onClose={onClose}
            existingApprovalWorkflowId={
              data?.data
                ? data?.data?.items?.map((item) => item.approvalTypeId)
                : []
            }
          />
        </SlideTransition>
      </VStack>
    </VStack>
  );
};

export default ApprovalWorkflow;
