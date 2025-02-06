import { VStack } from '@chakra-ui/react';
import { ErrorMessage, FormInputWrapper } from '@repo/ui/components';
import { useField, useFormikContext } from 'formik';
import UserDisplayAndAddButton from '../../Common/UserDisplayAndAddButton';

interface TaskAssignedToProps {
  sectionMaxWidth: string;
  spacing: string;
}
const TaskAssignedTo = (props: TaskAssignedToProps) => {
  const { sectionMaxWidth, spacing } = props;
  const { setFieldValue, values, submitCount } = useFormikContext<any>();
  // eslint-disable-next-line no-unused-vars
  const [field, meta, helpers] = useField('assignedTo');

  return (
    <FormInputWrapper
      sectionMaxWidth={sectionMaxWidth}
      customSpacing={spacing}
      title="Assigned to"
      description="Select the person responsible for this task"
      isRequired
    >
      <VStack width="full" spacing="4px" alignItems="flex-start">
        <UserDisplayAndAddButton
          selectedUser={values?.assignedToEmployeeName}
          handleSelectUser={(user) => {
            setFieldValue('assignedToEmployeeName', user?.label ?? null);
            helpers.setValue(user?.value ?? null);
          }}
        />
        {submitCount > 0 && meta.touched && meta.error !== undefined && (
          <ErrorMessage>{meta.error}</ErrorMessage>
        )}
      </VStack>
    </FormInputWrapper>
  );
};

export default TaskAssignedTo;
