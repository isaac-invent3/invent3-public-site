import { Flex, HStack } from '@chakra-ui/react';
import { FormSectionInfo, FormTextInput } from '@repo/ui/components';
import { Field } from 'formik';

interface PlanTitleProps {
  sectionMaxWidth: string;
  spacing: string;
}
const PlanTitle = (props: PlanTitleProps) => {
  const { sectionMaxWidth, spacing } = props;
  return (
    <HStack width="full" alignItems="flex-start" spacing={spacing}>
      <Flex width="full" maxW={sectionMaxWidth}>
        <FormSectionInfo
          title="Plan Title"
          info="Give a title for this maintenance plan"
          isRequired
        />
      </Flex>
      <Field
        as={FormTextInput}
        name="planName"
        type="text"
        label="Plan Title"
      />
    </HStack>
  );
};

export default PlanTitle;
