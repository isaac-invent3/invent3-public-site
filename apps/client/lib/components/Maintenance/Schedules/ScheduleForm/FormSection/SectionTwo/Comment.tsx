import { Flex, HStack } from '@chakra-ui/react';
import { FormSectionInfo, FormTextAreaInput } from '@repo/ui/components';
import { Field } from 'formik';

const Comment = () => {
  return (
    <HStack width="full" alignItems="flex-start" spacing="56px">
      <Flex width="full" maxW="130px">
        <FormSectionInfo
          title="Comment"
          info="Add name that users can likely search with"
          isRequired
        />
      </Flex>
      <Field
        as={FormTextAreaInput}
        name="comment"
        label="Comment"
        placeholder="Comment"
        customStyle={{ height: '133px' }}
      />
    </HStack>
  );
};

export default Comment;
