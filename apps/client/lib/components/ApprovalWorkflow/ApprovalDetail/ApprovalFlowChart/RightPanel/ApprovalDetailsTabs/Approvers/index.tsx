import { CheckIcon } from '@chakra-ui/icons';
import {
  Avatar,
  Box,
  Button,
  Flex,
  HStack,
  Icon,
  Skeleton,
  SkeletonCircle,
  StackDivider,
  Text,
  VStack,
} from '@chakra-ui/react';
import ApprovalHeader from '../Header';
import { useParams } from 'next/navigation';
import {
  useGetAllApprovalWorkflowPartyInstancesQuery,
  useUpdateApprovalRequestPartyInstanceStatusMutation,
} from '~/lib/redux/services/approval-workflow/partyInstances.services';
import { APPROVAL_WORKFLOW_STATUSES } from '~/lib/utils/constants';
import { getSession, useSession } from 'next-auth/react';
import GenericStatusBox from '~/lib/components/UI/GenericStatusBox';
import useCustomMutation from '~/lib/hooks/mutation.hook';
import { useState } from 'react';
import { CloseIcon } from '~/lib/components/CustomIcons';

const Approvers = () => {
  const params = useParams();
  const session = useSession();
  const approvalRequestId = Number(params?.id);
  const [shouldApprove, setShouldApprove] = useState(false);
  const { data, isLoading, isFetching } =
    useGetAllApprovalWorkflowPartyInstancesQuery(
      {
        pageNumber: 1,
        pageSize: 100,
        approvalRequestId,
      },
      { skip: !approvalRequestId }
    );
  const [updateInstance, { isLoading: isUpdatingInstance }] =
    useUpdateApprovalRequestPartyInstanceStatusMutation();

  const { handleSubmit } = useCustomMutation();

  const takeAction = async (
    shouldApprove: boolean,
    approvalWorkFlowPartyInstanceId: number
  ) => {
    const session = await getSession();
    await handleSubmit(
      updateInstance,
      {
        partyInstanceId: approvalWorkFlowPartyInstanceId,
        approvalRequestId,
        newStatus: shouldApprove,
        lastModifiedBy: session?.user?.username!,
      },
      ''
    );
  };

  return (
    <VStack
      alignItems="flex-start"
      divider={<StackDivider borderColor="neutral.600" />}
      spacing="16px"
    >
      <ApprovalHeader />
      <VStack alignItems="flex-start" gap="1.2em" w="full">
        {isLoading &&
          Array(5)
            .fill('')
            .map((item, index) => (
              <HStack
                alignItems="center"
                justifyContent="space-between"
                w="full"
                key={index}
                spacing="8px"
              >
                <SkeletonCircle size="30px" flexShrink={0} />
                <Skeleton width="full" height="20px" />
              </HStack>
            ))}
        {!isLoading &&
          data?.data?.items.map((item, index) => (
            <HStack
              alignItems="center"
              justifyContent="space-between"
              w="full"
              key={index}
            >
              <HStack spacing="8px">
                <Avatar width="24px" height="24px" />

                <Box>
                  <Text as="span" color="neutral.600" size="md">
                    {item.firstName} {item.lastName}
                  </Text>

                  <Text
                    as="span"
                    color="neutral.800"
                    size="md"
                    textTransform="lowercase"
                  >
                    {' '}
                    {item.requiredAction}
                  </Text>
                </Box>
              </HStack>

              {item.currentStatusId === APPROVAL_WORKFLOW_STATUSES.APPROVED && (
                <Flex
                  alignItems="center"
                  justifyContent="center"
                  w="24px"
                  h="24px"
                  rounded="full"
                  background="#07CC3B26"
                >
                  <Icon as={CheckIcon} color="#018A1E" boxSize="14px" />
                </Flex>
              )}

              {item.currentStatusId === APPROVAL_WORKFLOW_STATUSES.REJECTED && (
                <Flex
                  alignItems="center"
                  justifyContent="center"
                  w="24px"
                  h="24px"
                  rounded="full"
                  background="#F500001A"
                >
                  <Icon as={CloseIcon} color="#F50000" boxSize="20px" />
                </Flex>
              )}
              {item.currentStatusId ===
                APPROVAL_WORKFLOW_STATUSES.IN_PROGRESS &&
                Number(session?.data?.user?.userId) !== item.userId && (
                  <GenericStatusBox
                    text={item.currentStatusName}
                    colorCode={item.displayColorCode}
                  />
                )}
              {item.currentStatusId ===
                APPROVAL_WORKFLOW_STATUSES.IN_PROGRESS &&
                Number(session?.data?.user?.userId) === item.userId && (
                  <Flex alignItems="center" gap="8px">
                    <Button
                      background="transparent"
                      border="1px solid #D30000"
                      height="35px"
                      cursor="pointer"
                      loadingText="..."
                      isLoading={isUpdatingInstance && !shouldApprove}
                      onClick={() => {
                        setShouldApprove(false);
                        takeAction(false, item.approvalWorkFlowPartyInstanceId);
                      }}
                      color="#D30000"
                      fontSize="12px"
                    >
                      Reject
                    </Button>

                    <Button
                      background="#008321"
                      height="35px"
                      _hover={{ background: '#008321F0' }}
                      cursor="pointer"
                      isLoading={isUpdatingInstance && shouldApprove}
                      loadingText="..."
                      onClick={() => {
                        setShouldApprove(true);
                        takeAction(true, item.approvalWorkFlowPartyInstanceId);
                      }}
                      color="#D2FEFD"
                      fontSize="12px"
                    >
                      Approve
                    </Button>
                  </Flex>
                )}
            </HStack>
          ))}
      </VStack>
    </VStack>
  );
};

export default Approvers;
