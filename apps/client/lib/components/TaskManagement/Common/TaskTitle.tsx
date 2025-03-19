import { FormInputWrapper, FormTextInput } from '@repo/ui/components';
import { Field } from 'formik';

interface TaskTitleProps {
  sectionMaxWidth: string;
  spacing: string;
}
const TaskTitle = (props: TaskTitleProps) => {
  const { sectionMaxWidth, spacing } = props;
  return (
    <FormInputWrapper
      sectionMaxWidth={sectionMaxWidth}
      customSpacing={spacing}
      title="Task Title"
      description="Enter a clear title for this task"
      isRequired
    >
      <Field
        as={FormTextInput}
        name="taskName"
        type="text"
        label="Task Title"
      />
    </FormInputWrapper>
  );
};

export default TaskTitle;
