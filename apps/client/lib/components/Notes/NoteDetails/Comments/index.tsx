import {
  Avatar,
  Box,
  HStack,
  StackDivider,
  Text,
  VStack,
} from '@chakra-ui/react';
import { TextInput } from '@repo/ui/components';
import { Comment, comments } from './dummyComments';

const renderComments = (comments: Comment[], depth = 0) => {
  return comments.map((comment) => (
    <VStack
      spacing="24px"
      key={comment.id}
      align="start"
      pl={`${depth * 48}px`}
      w="full"
    >
      <HStack align="start" spacing="8px">
        <Avatar width="28px" height="28px" />

        <VStack align="start" spacing="11.5px" mt="11.5px">
          <HStack spacing={2}>
            <Text color="neutral.800" fontWeight={700}>
              {comment.userName}
            </Text>

            <Text size="xs" color="neutral.600">
              3h ago
            </Text>
          </HStack>

          <Text size="xs" fontWeight={400} color="neutral.600">
            {comment.text}
          </Text>
        </VStack>
      </HStack>

      {comment.replies && renderComments(comment.replies, depth + 1)}
    </VStack>
  ));
};

const NoteComments = () => {
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
      <HStack gap="8px" w="full">
        <Avatar width="28px" height="28px" />

        <TextInput
          label="Comment"
          name="comment"
          type="text"
          placeholder="Start your comment"
        />
      </HStack>

      {renderComments(comments)}
    </VStack>
  );
};

export default NoteComments;
