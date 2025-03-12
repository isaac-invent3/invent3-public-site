import { FormInputWrapper, FormTextAreaInput } from '@repo/ui/components';
import { Field } from 'formik';

const Comment = () => {
  return (
    <FormInputWrapper
      sectionMaxWidth="130px"
      customSpacing="56px"
      title="Comment"
      description="Add a comment"
      isRequired
    >
      <Field
        as={FormTextAreaInput}
        name="comment"
        label="Comment"
        placeholder="Comment"
        customStyle={{ height: '133px' }}
      />
    </FormInputWrapper>
  );
};

export default Comment;
