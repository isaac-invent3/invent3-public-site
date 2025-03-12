import { FormInputWrapper, FormTextInput } from '@repo/ui/components';
import { Field } from 'formik';

const NoteTitle = () => {
  return (
    <FormInputWrapper
      sectionMaxWidth="157px"
      spacing="24px"
      description="Provide essential information about the asset being added."
      title="Title"
      isRequired
    >
      <Field as={FormTextInput} name="title" type="text" label="Title" />
    </FormInputWrapper>
  );
};

export default NoteTitle;
