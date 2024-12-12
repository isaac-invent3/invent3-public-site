import { Flex, HStack } from '@chakra-ui/react';
import { Field } from 'formik';

import SectionInfo from '~/lib/components/UI/Form/FormSectionInfo';
import TextareaInput from '~/lib/components/UI/TextArea';

const Comment = () => {
  return (
    <HStack width="full" alignItems="flex-start" spacing="56px">
      <Flex width="full" maxW="130px">
        <SectionInfo
          title="Comment"
          info="Add name that users can likely search with"
          isRequired
        />
      </Flex>
      <Field
        as={TextareaInput}
        name="comment"
        label="Comment"
        placeholder="Comment"
        customStyle={{ height: '133px' }}
      />
    </HStack>
  );
};

export default Comment;
