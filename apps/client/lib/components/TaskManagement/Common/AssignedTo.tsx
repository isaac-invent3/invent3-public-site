import { Flex, HStack, VStack } from '@chakra-ui/react';
import { useField, useFormikContext } from 'formik';
import SectionInfo from '~/lib/components/UI/Form/FormSectionInfo';
import UserDisplayAndAddButton from '../../Common/UserDisplayAndAddButton';
import ErrorMessage from '../../UI/ErrorMessage';

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
        <SectionInfo
          title="Assigned to"
          info="Add name that users can likely search with"
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
