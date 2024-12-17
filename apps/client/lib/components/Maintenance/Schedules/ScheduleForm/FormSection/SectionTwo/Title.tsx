import { Flex, HStack } from '@chakra-ui/react';
import { FormSectionInfo, FormTextInput } from '@repo/ui/components';
import { Field } from 'formik';

interface ScheduleTitleProps {
  sectionMaxWidth: string;
  spacing: string;
}
const ScheduleTitle = (props: ScheduleTitleProps) => {
  const { sectionMaxWidth, spacing } = props;
  return (
    <HStack width="full" alignItems="flex-start" spacing={spacing}>
      <Flex width="full" maxW={sectionMaxWidth}>
        <FormSectionInfo
          title="Schedule Title"
          info="Add name that users can likely search with"
          isRequired
        />
      </Flex>
      <Field
        as={FormTextInput}
        name="name"
        type="text"
        label="Schedule Title"
      />
    </HStack>
  );
};

export default ScheduleTitle;
