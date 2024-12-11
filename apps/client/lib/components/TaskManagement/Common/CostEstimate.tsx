import { Flex, HStack } from '@chakra-ui/react';
import { Field } from 'formik';

import SectionInfo from '~/lib/components/UI/Form/FormSectionInfo';
import TextInput from '~/lib/components/UI/TextInput';

interface CostEstimateProps {
  sectionMaxWidth: string;
  spacing: string;
}
const CostEstimate = (props: CostEstimateProps) => {
  const { sectionMaxWidth, spacing } = props;
  return (
    <HStack width="full" alignItems="flex-start" spacing={spacing}>
      <Flex width="full" maxW={sectionMaxWidth}>
        <SectionInfo
          title="Cost Estimate"
          info="Add name that users can likely search with"
          isRequired
        />
      </Flex>
      <Field
        as={TextInput}
        name="costEstimate"
        type="number"
        label="Cost Estimate"
      />
    </HStack>
  );
};

export default CostEstimate;
