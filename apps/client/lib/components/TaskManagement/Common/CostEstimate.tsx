import { FormInputWrapper, FormTextInput } from '@repo/ui/components';
import { Field } from 'formik';

interface CostEstimateProps {
  sectionMaxWidth: string;
  spacing: string;
}
const CostEstimate = (props: CostEstimateProps) => {
  const { sectionMaxWidth, spacing } = props;
  return (
    <FormInputWrapper
      sectionMaxWidth={sectionMaxWidth}
      customSpacing={spacing}
      title="Cost Estimate"
      description="Enter the estimate cost for this task"
      isRequired={false}
    >
      <Field
        as={FormTextInput}
        name="costEstimate"
        type="number"
        label="Cost Estimate"
      />
    </FormInputWrapper>
  );
};

export default CostEstimate;
