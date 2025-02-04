import { FormInputWrapper, FormTextInput } from '@repo/ui/components';
import { Field } from 'formik';

interface ScheduleTitleProps {
  sectionMaxWidth: string;
  spacing: string;
}
const ScheduleTitle = (props: ScheduleTitleProps) => {
  const { sectionMaxWidth, spacing } = props;
  return (
    <FormInputWrapper
      sectionMaxWidth={sectionMaxWidth}
      spacing={spacing}
      title="Schedule Title"
      description="Provide a title for this maintenance schedule."
      isRequired
    >
      <Field
        as={FormTextInput}
        name="name"
        type="text"
        label="Schedule Title"
      />
    </FormInputWrapper>
  );
};

export default ScheduleTitle;
