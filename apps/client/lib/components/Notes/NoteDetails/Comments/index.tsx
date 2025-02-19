import {
  Avatar,
  Box,
  HStack,
  Skeleton,
  StackDivider,
  Text,
  VStack,
} from '@chakra-ui/react';
import { TextInput } from '@repo/ui/components';
import { getSession } from 'next-auth/react';
import { FormEventHandler, useState } from 'react';
import useCustomMutation from '~/lib/hooks/mutation.hook';
import useFormatUrl from '~/lib/hooks/useFormatUrl';
import useParseUrlData from '~/lib/hooks/useParseUrl';
import {
  useCreateNoteMutation,
  useGetNoteCommentsQuery,
} from '~/lib/redux/services/notes.services';
import { DEFAULT_PAGE_SIZE } from '~/lib/utils/constants';
import { Comment } from './dummyComments';
import { Note } from '~/lib/interfaces/notes.interfaces';

const renderComments = (comments: Note[], depth = 0) => {
  return comments.map((comment) => (
    <VStack
      spacing="24px"
      key={comment.noteId}
      align="start"
      pl={`${depth * 48}px`}
      w="full"
    >
      <HStack align="start" spacing="8px">
        <Avatar width="28px" height="28px" />

        <VStack align="start" spacing="11.5px" mt="11.5px">
          <HStack spacing={2}>
            <Text color="neutral.800" fontWeight={700}>
              {comment.authorFirstName}
            </Text>

            <Text size="xs" color="neutral.600">
              3h ago
            </Text>
          </HStack>

          <Text size="xs" fontWeight={400} color="neutral.600">
            {comment.content}
          </Text>
        </VStack>
      </HStack>

      {/* {comment.replies && renderComments(comment.replies, depth + 1)} */}
    </VStack>
  ));
};

const NoteComments = ({ noteId }: { noteId: number }) => {
  const formattedUrl = useFormatUrl();
  const parsedUrl = useParseUrlData(formattedUrl);
  const { data: comments, isLoading: isGettingNotes } = useGetNoteCommentsQuery(
    {
      noteId,
      pageNumber: 1,
      pageSize: DEFAULT_PAGE_SIZE,
    }
  );

  const [comment, setComment] = useState('');
  const { handleSubmit } = useCustomMutation();
  const [createComment, { isLoading: isCommenting }] = useCreateNoteMutation();

  const handleAddComment: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    const session = await getSession();

    const payload = {
      createNoteDto: {
        systemContextTypeId: parsedUrl?.systemContextId!,
        authorId: Number(session?.user.id),
        createdBy: session?.user?.username!,
        title: '',
        content: comment,
        parentId: noteId,
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
          <Box borderColor="neutral.600" width="full" borderWidth={0.5}></Box>
        </StackDivider>
      }
    >
      <form style={{ width: '100%' }} onSubmit={handleAddComment}>
        <HStack gap="8px" w="full">
          <Avatar width="28px" height="28px" />

          <TextInput
            label="Comment"
            name="comment"
            type="text"
            placeholder="Start your comment"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            isDisabled={isCommenting}
          />
        </HStack>
      </form>

      <Skeleton isLoaded={!isGettingNotes}>
        {renderComments(comments?.data.items ?? [])}
      </Skeleton>
    </VStack>
  );
};

export default NoteComments;
