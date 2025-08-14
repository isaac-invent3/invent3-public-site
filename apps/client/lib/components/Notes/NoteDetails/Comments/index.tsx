import {
  Avatar,
  Box,
  HStack,
  Icon,
  Spinner,
  StackDivider,
  Text,
  VStack,
} from '@chakra-ui/react';
import { TextInput } from '@repo/ui/components';
import { getSession, useSession } from 'next-auth/react';
import { FormEventHandler, useState } from 'react';
import { EmptyNotesIcon } from '~/lib/components/CustomIcons';
import useCustomMutation from '~/lib/hooks/mutation.hook';
import useFormatUrl from '~/lib/hooks/useFormatUrl';
import useParseUrlData from '~/lib/hooks/useParseUrl';
import { Note } from '~/lib/interfaces/notes.interfaces';
import {
  useCreateCommentMutation,
  useGetNoteCommentsQuery,
} from '~/lib/redux/services/notes.services';
import { DEFAULT_PAGE_SIZE } from '~/lib/utils/constants';
import CommentItem from './CommentItem';
import SkeletonComment from './SkeletonComment';

const NoteComments = ({ note }: { note: Note }) => {
  const formattedUrl = useFormatUrl();
  const parsedUrl = useParseUrlData(formattedUrl);
  const {
    data: comments,
    isLoading: isGettingComments,
    isFetching: isFetchingComments,
  } = useGetNoteCommentsQuery({
    noteId: note.noteId,
    pageNumber: 1,
    pageSize: DEFAULT_PAGE_SIZE,
  });

  const [comment, setComment] = useState('');
  const { handleSubmit } = useCustomMutation();
  const [createComment, { isLoading: isCommenting }] =
    useCreateCommentMutation();
  const { data } = useSession();

  const handleAddComment: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    if (isCommenting) return;

    const session = await getSession();

    // Problem with the flow here

    const payload = {
      createNoteDto: {
        systemContextTypeId: note?.systemContextTypeId,
        systemContextId: note?.systemContextId,
        authorId: Number(session?.user.id),
        createdBy: session?.user?.username!,
        title: '',
        content: comment,
        parentId: note.noteId,
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
      setComment('');
    }
  };

  return (
    <VStack
      spacing="12px"
      alignItems="flex-start"
      w="full"
      divider={
        <StackDivider
          height="15px"
          display="flex"
          alignItems="center"
          justifyContent="center"
          border="none"
        >
          <Box
            borderColor="neutral.600"
            opacity="40%"
            width="full"
            borderWidth={0.5}
          ></Box>
        </StackDivider>
      }
    >
      <form style={{ width: '100%' }} onSubmit={handleAddComment}>
        <HStack gap="8px" w="full">
          <Avatar
            width="28px"
            height="28px"
            name={data?.user?.firstName ?? ''}
          />

          <TextInput
            label="Comment"
            name="comment"
            type="text"
            placeholder="Start your comment"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            isDisabled={isCommenting}
            customRightElement={
              isCommenting && <Spinner color="primary.500" size="sm" />
            }
          />
        </HStack>
      </form>

      {comments?.data.items.map((comment) => (
        <CommentItem
          key={comment.noteId}
          comment={comment}
          isFetchingComments={isFetchingComments}
        />
      ))}

      {isGettingComments && <SkeletonComment count={5} />}

      {(comments?.data?.items?.length ?? 0) <= 0 && (
        <VStack justifyContent="center" h="200px" w="full">
          <Icon as={EmptyNotesIcon} w="130px" h="130px" mb="8px" />
          <Text size="md" color="#2C2C2C" fontWeight={700}>
            No comments
          </Text>
        </VStack>
      )}
    </VStack>
  );
};

export default NoteComments;
