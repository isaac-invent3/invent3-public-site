import { FormInputWrapper, FormTextAreaInput } from '@repo/ui/components';
import { Field } from 'formik';

const NoteContent = () => {
  return (
    <FormInputWrapper
      sectionMaxWidth="157px"
      spacing="24px"
      description="Provide essential information about the asset being added."
      title="Content"
      isRequired
    >
      <Field
        as={FormTextAreaInput}
        name="content"
        type="text"
        label="Note"
        customStyle={{ height: '300px' }}
      />
    </FormInputWrapper>
  );
};

export default NoteContent;
