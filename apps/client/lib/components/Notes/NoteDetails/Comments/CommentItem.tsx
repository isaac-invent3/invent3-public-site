import { Avatar, Box, HStack, Spinner, Text, VStack } from '@chakra-ui/react';
import { keyframes } from '@emotion/react';
import { TextInput } from '@repo/ui/components';
import moment from 'moment';
import { getSession, useSession } from 'next-auth/react';
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
  isFetchingComments: boolean;
  depth?: number;
}

const pulse = keyframes`
  0% { opacity: 1; }
  50% { opacity: 0.5; }
  100% {  opacity: 1; }
`;
const CommentItem = ({
  comment,
  depth = 0,
  isFetchingComments,
}: CommentItemProps) => {
  const [showReplyInput, setShowReplyInput] = useState(false);
  const [showReplies, setShowReplies] = useState(false);
  const [replyContent, setReplyContent] = useState('');
  const { handleSubmit } = useCustomMutation();
  const [createComment, { isLoading: isCommenting }] =
    useCreateCommentMutation();
  const formattedUrl = useFormatUrl();
  const parsedUrl = useParseUrlData(formattedUrl);
  const { data } = useSession();

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
      pl={`${depth * 16}px`}
      w="full"
      animation={isFetchingComments ? `${pulse} 1.5s infinite ease-in-out` : ''}
    >
      <HStack spacing="8px" w="full" align="start">
        <Avatar width="28px" height="28px" name={comment.authorFirstName} />
        <VStack align="start" spacing={2} mt="5px" w="full">
          <HStack spacing={2} w="full">
            <Text color="neutral.800" fontWeight={700}>
              {comment.authorFirstName}
            </Text>
            <Text size="xs" color="neutral.600">
              {moment(comment.dateCreated).utc().fromNow()}
            </Text>
          </HStack>
          <Text size="xs" fontWeight={400} color="neutral.600">
            {comment.content}
          </Text>
          <HStack spacing="4" justifyContent="space-between" w="full">
            {depth <= 0 && (
              <>
                <Text
                  size="xs"
                  fontWeight={500}
                  color="#0366EF"
                  transition="all 300ms ease-in-out"
                  cursor="pointer"
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
              </>
            )}
          </HStack>
        </VStack>
      </HStack>

      {showReplyInput && (
        <form onSubmit={handleReplySubmit} style={{ width: '100%' }}>
          <HStack gap="8px" w="full">
            <Avatar width="28px" height="28px" name={data?.user?.username} />

            <TextInput
              label="reply"
              name="comment"
              type="text"
              placeholder="Write a reply..."
              value={replyContent}
              onChange={(e) => setReplyContent(e.target.value)}
              isDisabled={isCommenting}
              customStyle={{ w: 'full' }}
              customRightElement={isCommenting && <Spinner size="sm" />}
            />
          </HStack>
        </form>
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
