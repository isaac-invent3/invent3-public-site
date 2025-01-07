import { Flex, HStack } from '@chakra-ui/react';
import { FormDatePicker, FormSectionInfo } from '@repo/ui/components';

interface CompletionDateProps {
  sectionMaxWidth: string;
  spacing: string;
}
const CompletionDate = (props: CompletionDateProps) => {
  const { sectionMaxWidth, spacing } = props;
  return (
    <HStack width="full" alignItems="flex-start" spacing={spacing}>
      <Flex width="full" maxW={sectionMaxWidth}>
        <FormSectionInfo
          title="Completion Date"
          info="Select the completion date"
          isRequired
        />
      </Flex>

      <FormDatePicker
        name="dateCompleted"
        label="Completion Date"
        type="date"
      />
    </HStack>
  );
};

export default CompletionDate;
