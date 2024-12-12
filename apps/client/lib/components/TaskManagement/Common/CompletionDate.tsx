import { Flex, HStack } from '@chakra-ui/react';

import CustomDatePicker from '~/lib/components/UI/Form/FormDatePicker';
import SectionInfo from '~/lib/components/UI/Form/FormSectionInfo';

interface CompletionDateProps {
  sectionMaxWidth: string;
  spacing: string;
}
const CompletionDate = (props: CompletionDateProps) => {
  const { sectionMaxWidth, spacing } = props;
  return (
    <HStack width="full" alignItems="flex-start" spacing={spacing}>
      <Flex width="full" maxW={sectionMaxWidth}>
        <SectionInfo
          title="Completion Date"
          info="Add name that users can likely search with"
          isRequired
        />
      </Flex>

      <CustomDatePicker
        name="dateCompleted"
        label="Completion Date"
        type="date"
      />
    </HStack>
  );
};

export default CompletionDate;
