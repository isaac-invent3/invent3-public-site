import { Flex, HStack, VStack } from '@chakra-ui/react';
import { useField, useFormikContext } from 'formik';
import UserDisplayAndAddButton from '../../Common/UserDisplayAndAddButton';
import { ErrorMessage, FormSectionInfo } from '@repo/ui/components';

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
    <HStack width="full" alignItems="flex-start" spacing={spacing}>
      <Flex width="full" maxW={sectionMaxWidth}>
        <FormSectionInfo
          title="Assigned to"
          info="Select the person responsible for this task"
          isRequired
        />
      </Flex>
      <VStack width="full" spacing="4px" alignItems="flex-start">
        <UserDisplayAndAddButton
          selectedUser={values?.assignedToEmployeeName}
          handleSelectUser={(user) => {
            helpers.setValue(user?.value ?? null);
            setFieldValue('assignedToEmployeeName', user?.label ?? null);
          }}
        />
        {submitCount > 0 && meta.touched && meta.error !== undefined && (
          <ErrorMessage>{meta.error}</ErrorMessage>
        )}
      </VStack>
    </HStack>
  );
};

export default TaskAssignedTo;
