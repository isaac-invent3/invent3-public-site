import { FormInputWrapper, FormTextInput } from '@repo/ui/components';
import { Field } from 'formik';

interface PlanTitleProps {
  sectionMaxWidth: string;
  spacing: string;
}
const PlanTitle = (props: PlanTitleProps) => {
  const { sectionMaxWidth, spacing } = props;
  return (
    <FormInputWrapper
      sectionMaxWidth={sectionMaxWidth}
      spacing={spacing}
      title="Plan Title"
      description="Give a title for this maintenance plan"
      isRequired
    >
      <Field
        as={FormTextInput}
        name="planName"
        type="text"
        label="Plan Title"
      />
    </FormInputWrapper>
  );
};

export default PlanTitle;
