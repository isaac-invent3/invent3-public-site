import { FormInputWrapper, FormTextAreaInput } from '@repo/ui/components';
import { Field } from 'formik';

interface DescriptionProps {
  sectionMaxWidth: string;
  spacing: string;
  descriptionHeight?: string;
}
const Description = (props: DescriptionProps) => {
  const { sectionMaxWidth, spacing, descriptionHeight } = props;
  return (
    <FormInputWrapper
      sectionMaxWidth={sectionMaxWidth}
      customSpacing={spacing}
      title="Description"
      description="Add details about the maintenance schedule."
      isRequired
    >
      <Field
        as={FormTextAreaInput}
        name="description"
        label="Description"
        placeholder="Description"
        customStyle={{ height: descriptionHeight ?? '133px' }}
      />
    </FormInputWrapper>
  );
};

export default Description;
