import { FormInputWrapper, FormTextAreaInput } from '@repo/ui/components';
import { Field } from 'formik';

interface TaskDescriptionProps {
  sectionMaxWidth: string;
  spacing: string;
}
const TaskDescription = (props: TaskDescriptionProps) => {
  const { sectionMaxWidth, spacing } = props;
  return (
    <FormInputWrapper
      sectionMaxWidth={sectionMaxWidth}
      spacing={spacing}
      title="Description"
      description="Provide details about the task objective"
      isRequired
    >
      <Field
        as={FormTextAreaInput}
        name="taskDescription"
        type="text"
        label="Description"
        placeholder="What’s the task about?"
        customStyle={{ height: '133px' }}
      />
    </FormInputWrapper>
  );
};

export default TaskDescription;
