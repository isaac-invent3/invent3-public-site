import { Flex, HStack } from '@chakra-ui/react';
import { useFormikContext } from 'formik';
import EmployeeSelect from '~/lib/components/Common/EmployeeSelect';
import SectionInfo from '~/lib/components/UI/Form/FormSectionInfo';

const TaskAssignedTo = () => {
  const { setFieldValue } = useFormikContext<any>();
  return (
    <HStack width="full" alignItems="flex-start" spacing="73px">
      <Flex width="full" maxW="118px">
        <SectionInfo
          title="Assigned to"
          info="Add name that users can likely search with"
          isRequired
        />
      </Flex>
      <EmployeeSelect
        selectName="assignedTo"
        selectTitle="Assigned to"
        handleSelect={(option) => setFieldValue('assignedToName', option.label)}
      />
    </HStack>
  );
};

export default TaskAssignedTo;
