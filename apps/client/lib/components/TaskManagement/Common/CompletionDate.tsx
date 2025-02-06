import { FormDatePicker, FormInputWrapper } from '@repo/ui/components';

interface CompletionDateProps {
  sectionMaxWidth: string;
  spacing: string;
}
const CompletionDate = (props: CompletionDateProps) => {
  const { sectionMaxWidth, spacing } = props;
  return (
    <FormInputWrapper
      sectionMaxWidth={sectionMaxWidth}
      customSpacing={spacing}
      title="Completion Date"
      description="Select the completion date"
      isRequired
    >
      <FormDatePicker
        name="dateCompleted"
        label="Completion Date"
        type="date"
      />
    </FormInputWrapper>
  );
};

export default CompletionDate;
