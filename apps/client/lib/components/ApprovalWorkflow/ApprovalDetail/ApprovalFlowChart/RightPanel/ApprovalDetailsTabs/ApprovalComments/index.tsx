import {
  Avatar,
  HStack,
  SkeletonCircle,
  SkeletonText,
  StackDivider,
  Text,
  VStack,
} from '@chakra-ui/react';
import { TextInput } from '@repo/ui/components';
import moment from 'moment';
import { getSession } from 'next-auth/react';
import { useState } from 'react';
import useCustomMutation from '~/lib/hooks/mutation.hook';
import { ApprovalWorkflowComment } from '~/lib/interfaces/approvalWorkflow.interfaces';
import { useAppSelector } from '~/lib/redux/hooks';
import {
  useGetAllCommentsByApprovalRequestIdQuery,
  usePostCommentMutation,
} from '~/lib/redux/services/approval-workflow/requestComments.services';
import { DEFAULT_PAGE_SIZE } from '~/lib/utils/constants';

const getRelativeTimeShort = (date: string) => {
  const localDate = moment.utc(date).local(); // Parse as UTC, convert to local
  const now = moment();
  const duration = moment.duration(now.diff(localDate));

  const hours = Math.floor(duration.asHours());
  const minutes = Math.floor(duration.asMinutes());
  const seconds = Math.floor(duration.asSeconds());

  if (hours >= 1) return `${hours}h ago`;
  if (minutes >= 1) return `${minutes}m ago`;
  return `${seconds}s ago`;
};

const renderComments = (comments: ApprovalWorkflowComment[], depth = 0) => {
  return comments.map((comment) => (
    <VStack
      spacing="32px"
      key={comment.commentId}
      align="start"
      pl={`${depth * 48}px`}
      w="full"
    >
      <HStack align="start" spacing="8px">
        <Avatar width="40px" height="40px" />

        <VStack align="start" spacing="11.5px" mt="11.5px">
          <HStack spacing={2}>
            <Text color="neutral.800" size="md" fontWeight={700}>
              {comment.author}
            </Text>

            <Text color="neutral.600">
              {comment.dateCreated
                ? getRelativeTimeShort(comment.dateCreated)
                : ''}
            </Text>
          </HStack>

          <Text size="md" color="neutral.600">
            {comment.comment}
          </Text>
        </VStack>
      </HStack>

      {/* {comment.replies && renderComments(comment.replies, depth + 1)} */}
    </VStack>
  ));
};

const ApprovalComments = () => {
  const approvalRequest = useAppSelector(
    (state) => state.approval.approvalRequest
  );
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(DEFAULT_PAGE_SIZE);
  const { data, isLoading, isFetching } =
    useGetAllCommentsByApprovalRequestIdQuery(
      {
        approvalRequestId: approvalRequest?.approvalRequestId!,
        pageSize,
        pageNumber: currentPage,
      },
      { skip: !approvalRequest?.approvalRequestId }
    );
  const [commentValue, setCommentValue] = useState('');

  const [postComment, { isLoading: isSubmitting }] = usePostCommentMutation();
  const { handleSubmit } = useCustomMutation();

  const handlePostComment = async () => {
    const session = await getSession();
    const response = await handleSubmit(
      postComment,
      {
        authorId: session?.user?.userId!,
        comment: commentValue,
        approvalRequestId: approvalRequest?.approvalRequestId!,
        createdBy: session?.user.username!,
      },
      ''
    );
    if (response?.data) {
      setCommentValue('');
    }
  };

  return (
    <VStack
      spacing="12px"
      alignItems="flex-start"
      w="full"
      divider={<StackDivider borderColor="neutral.600" />}
    >
      <HStack gap="8px" w="full">
        <Avatar width="40px" height="40px" />

        <TextInput
          label="Comment"
          name="comment"
          type="text"
          placeholder="Start your comment"
          value={commentValue}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setCommentValue(e.target.value)
          }
          customStyle={{
            opacity: isSubmitting ? 0.5 : 1,
            pointerEvents: isSubmitting ? 'none' : 'initial',
            onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handlePostComment();
              }
            },
          }}
        />
      </HStack>
      <VStack
        width="full"
        spacing="16px"
        opacity={isLoading || isFetching ? 0.5 : 1}
      >
        {isLoading &&
          Array(5)
            .fill('')
            .map((_, index) => (
              <HStack
                alignItems="center"
                justifyContent="space-between"
                w="full"
                key={index}
                spacing="8px"
                mb="16px"
              >
                <SkeletonCircle size="30px" flexShrink={0} />
                <SkeletonText noOfLines={3} width="full" height="10px" />
              </HStack>
            ))}

        {!isLoading && data?.data?.items.length === 0 && (
          <Text width="full" textAlign="center" my="20%" color="neutral.600">
            No comments at the moment
          </Text>
        )}
        {!isLoading &&
          data?.data?.items &&
          renderComments(data?.data?.items ?? [])}
      </VStack>
    </VStack>
  );
};

export default ApprovalComments;
