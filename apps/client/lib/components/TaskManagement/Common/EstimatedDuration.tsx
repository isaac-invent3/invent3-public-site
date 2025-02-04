import { Divider, HStack, Text } from '@chakra-ui/react';

import { FormInputWrapper, FormTextInput } from '@repo/ui/components';
import { Field } from 'formik';

interface EstimatedDurationProps {
  sectionMaxWidth: string;
  spacing: string;
}
const EstimatedDuration = (props: EstimatedDurationProps) => {
  const { sectionMaxWidth, spacing } = props;
  return (
    <FormInputWrapper
      sectionMaxWidth={sectionMaxWidth}
      spacing={spacing}
      title="Estimated Duration"
      description="Enter the approximate hours to complete the task"
      isRequired
    >
      <Field
        as={FormTextInput}
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
    </FormInputWrapper>
  );
};

export default EstimatedDuration;
