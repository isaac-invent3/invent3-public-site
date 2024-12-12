import { Divider, Flex, HStack, Text } from '@chakra-ui/react';

import SectionInfo from '../../UI/Form/FormSectionInfo';
import { Field } from 'formik';
import TextInput from '../../UI/TextInput';

interface EstimatedDurationProps {
  sectionMaxWidth: string;
  spacing: string;
}
const EstimatedDuration = (props: EstimatedDurationProps) => {
  const { sectionMaxWidth, spacing } = props;
  return (
    <HStack width="full" alignItems="flex-start" spacing={spacing}>
      <Flex width="full" maxW={sectionMaxWidth}>
        <SectionInfo
          title="Estimated Duration"
          info="Add name that users can likely search with"
          isRequired
        />
      </Flex>
      <Field
        as={TextInput}
        name="estimatedDurationInHours"
        type="number"
        label="Estimated Duration"
        customStyle={{ paddingRight: '55px' }}
        customRightElement={
          <HStack mr="10px" height="full" py="4px">
            <Divider
              orientation="vertical"
              borderColor="neutral.300"
              borderWidth="0.5px"
            />
            <Text pl="4px" color="neutral.300">
              Hours
            </Text>
          </HStack>
        }
      />
    </HStack>
  );
};

export default EstimatedDuration;
