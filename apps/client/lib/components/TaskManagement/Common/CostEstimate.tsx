import { Flex, HStack } from '@chakra-ui/react';
import { FormSectionInfo, FormTextInput } from '@repo/ui/components';
import { Field } from 'formik';

interface CostEstimateProps {
  sectionMaxWidth: string;
  spacing: string;
}
const CostEstimate = (props: CostEstimateProps) => {
  const { sectionMaxWidth, spacing } = props;
  return (
    <HStack width="full" alignItems="flex-start" spacing={spacing}>
      <Flex width="full" maxW={sectionMaxWidth}>
        <FormSectionInfo
          title="Cost Estimate"
          info="Enter the estimate cost for this task"
          isRequired
        />
      </Flex>
      <Field
        as={FormTextInput}
        name="costEstimate"
        type="number"
        label="Cost Estimate"
      />
    </HStack>
  );
};

export default CostEstimate;
