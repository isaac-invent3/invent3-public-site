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
      <HStack align="start" spacing='8px'>
        <Avatar width="40px" height="40px" />

        <VStack align="start" spacing='11.5px' mt="11.5px" >
          <HStack spacing={2}>
            <Text color="neutral.800" size="md" fontWeight={700}>
              {comment.userName}
            </Text>

            <Text color="neutral.600">3h ago</Text>
          </HStack>

          <Text size="md" color="neutral.600">
            {comment.text}
          </Text>
        </VStack>
      </HStack>

      {comment.replies && renderComments(comment.replies, depth + 1)}
    </VStack>
  ));
};

const ApprovalComments = () => {
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
          <Box borderColor="#BBBBBB" width="full" borderWidth={0.5}></Box>
        </StackDivider>
      }
    >
      <HStack gap="8px" w="full">
        <Avatar width="40px" height="40px" />

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

export default ApprovalComments;
