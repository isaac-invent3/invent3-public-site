import { Flex, HStack } from '@chakra-ui/react';
import { useFormikContext } from 'formik';
import EmployeeSelect from '~/lib/components/Common/EmployeeSelect';
import SectionInfo from '~/lib/components/UI/Form/FormSectionInfo';

interface TaskAssignedToProps {
  sectionMaxWidth: string;
  spacing: string;
}
const TaskAssignedTo = (props: TaskAssignedToProps) => {
  const { sectionMaxWidth, spacing } = props;
  const { setFieldValue, values } = useFormikContext<any>();
  return (
    <HStack width="full" alignItems="flex-start" spacing={spacing}>
      <Flex width="full" maxW={sectionMaxWidth}>
        <SectionInfo
          title="Assigned to"
          info="Add name that users can likely search with"
          isRequired
        />
      </Flex>
      <EmployeeSelect
        selectName="assignedTo"
        selectTitle="Assigned to"
        handleSelect={(option) =>
          setFieldValue('assignedToEmployeeName', option.label)
        }
        defaultName={values?.assignedToName}
      />
    </HStack>
  );
};

export default TaskAssignedTo;
