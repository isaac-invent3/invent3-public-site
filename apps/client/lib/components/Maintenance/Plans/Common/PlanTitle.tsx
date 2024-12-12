import { Flex, HStack } from '@chakra-ui/react';
import { Field } from 'formik';

import SectionInfo from '~/lib/components/UI/Form/FormSectionInfo';
import TextInput from '~/lib/components/UI/TextInput';

interface PlanTitleProps {
  sectionMaxWidth: string;
  spacing: string;
}
const PlanTitle = (props: PlanTitleProps) => {
  const { sectionMaxWidth, spacing } = props;
  return (
    <HStack width="full" alignItems="flex-start" spacing={spacing}>
      <Flex width="full" maxW={sectionMaxWidth}>
        <SectionInfo
          title="Plan Title"
          info="Add name that users can likely search with"
          isRequired
        />
      </Flex>
      <Field as={TextInput} name="planName" type="text" label="Plan Title" />
    </HStack>
  );
};

export default PlanTitle;
