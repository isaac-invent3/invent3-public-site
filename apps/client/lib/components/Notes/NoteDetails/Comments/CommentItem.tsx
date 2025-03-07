import {
  Avatar,
  Box,
  HStack,
  Spinner,
  Text,
  VStack,
} from '@chakra-ui/react';
import { keyframes } from '@emotion/react';
import { TextInput } from '@repo/ui/components';
import moment from 'moment';
import { getSession } from 'next-auth/react';
import { useState } from 'react';
import useCustomMutation from '~/lib/hooks/mutation.hook';
import useFormatUrl from '~/lib/hooks/useFormatUrl';
import useParseUrlData from '~/lib/hooks/useParseUrl';
import { Note } from '~/lib/interfaces/notes.interfaces';
import {
  useCreateCommentMutation,
  useGetNoteCommentsQuery,
} from '~/lib/redux/services/notes.services';
import { DEFAULT_PAGE_SIZE } from '~/lib/utils/constants';

interface CommentItemProps {
  comment: Note;
  isFetchingComments:boolean
  depth?: number;
}

const pulse = keyframes`
  0% { opacity: 1; }
  50% { opacity: 0.5; }
  100% {  opacity: 1; }
`;
const CommentItem = ({ comment, depth = 0, isFetchingComments}: CommentItemProps) => {
  const [showReplyInput, setShowReplyInput] = useState(false);
  const [showReplies, setShowReplies] = useState(false);
  const [replyContent, setReplyContent] = useState('');
  const { handleSubmit } = useCustomMutation();
  const [createComment, { isLoading: isCommenting }] =
    useCreateCommentMutation();
  const formattedUrl = useFormatUrl();
  const parsedUrl = useParseUrlData(formattedUrl);

  const {
    data: repliesData,
    isLoading: isGettingReplies,
    isFetching: isFetchingReplies,
  } = useGetNoteCommentsQuery(
    { noteId: comment.noteId, pageNumber: 1, pageSize: DEFAULT_PAGE_SIZE },
    { skip: !showReplies }
  );

  const handleReplySubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isCommenting) return;

    const session = await getSession();
    const payload = {
      createNoteDto: {
        systemContextTypeId: parsedUrl?.systemContextId!,
        authorId: Number(session?.user.id),
        createdBy: session?.user?.username!,
        title: '',
        content: replyContent,
        parentId: comment.noteId,
        notePriorityId: 0,
      },
      systemContextIds: [],
      tags: [],
    };

    const response = await handleSubmit(
      createComment,
      payload,
      'Comment Created Successfully!'
    );

    if (response?.data) {
      setReplyContent('');
      setShowReplyInput(false);
    }
  };

  return (
    <VStack
      align="start"
      spacing="4"
      pl={`${depth * 48}px`}
      w="full"
      animation={isFetchingComments ? `${pulse} 1.5s infinite ease-in-out` : ''}
    >
      <HStack spacing="8px" w="full">
        <Avatar size="sm" />
        <VStack align="start" spacing="1" w="full">
          <HStack spacing={2} w="full">
            <Text fontWeight="bold">{comment.authorFirstName}</Text>
            <Text fontSize="xs" color="gray.500">
              {moment(comment.dateCreated).fromNow()}
            </Text>
          </HStack>
          <Text>{comment.content}</Text>
          <HStack spacing="4" justifyContent="space-between" w="full">
            <Text
              size="xs"
              fontWeight={400}
              color="neutral.300"
              transition="all 300ms ease-in-out"
              cursor="pointer"
              _hover={{
                color: 'neutral.800',
              }}
              onClick={() => setShowReplyInput((prev) => !prev)}
            >
              Reply
            </Text>
            {comment.hasComment && (
              <Text
                size="xs"
                fontWeight={400}
                color="neutral.700"
                transition="all 300ms ease-in-out"
                textDecor="underline"
                cursor="pointer"
                onClick={() => setShowReplies((prev) => !prev)}
              >
                {showReplies ? 'Hide Replies' : 'View Replies'}
              </Text>
            )}
          </HStack>
        </VStack>
      </HStack>

      {showReplyInput && (
        <Box w="full">
          <form onSubmit={handleReplySubmit}>
            <TextInput
              label="Comment"
              name="comment"
              type="text"
              placeholder="Write a reply..."
              value={replyContent}
              onChange={(e) => setReplyContent(e.target.value)}
              isDisabled={isCommenting}
              customRightElement={isCommenting && <Spinner size="sm" />}
            />
          </form>
        </Box>
      )}

      {showReplies && (
        <Box w="full" pl="24px">
          {isGettingReplies || isFetchingReplies ? (
            <Spinner size="sm" />
          ) : (
            repliesData?.data.items.map((reply) => (
              <CommentItem
                key={reply.noteId}
                comment={reply}
                depth={depth + 1}
                isFetchingComments={isFetchingComments}
              />
            ))
          )}
        </Box>
      )}
    </VStack>
  );
};

export default CommentItem;
