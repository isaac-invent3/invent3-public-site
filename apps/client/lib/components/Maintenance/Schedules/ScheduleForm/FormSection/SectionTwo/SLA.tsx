import { Box, Flex, HStack, Text } from '@chakra-ui/react';
import { Field } from 'formik';
import React from 'react';
import SectionInfo from '~/lib/components/UI/Form/FormSectionInfo';
import TextInput from '~/lib/components/UI/TextInput';

const ServiceLevelAgreement = () => {
  return (
    <HStack width="full" alignItems="flex-start" spacing="56px">
      <Flex width="full" maxW="130px">
        <SectionInfo
          title="Service Level Agreement"
          info="Add name that users can likely search with"
          isRequired
        />
      </Flex>
      <HStack spacing={0} position="relative" width="full">
        <Field
          as={TextInput}
          name="sla"
          type="number"
          label="Agreement Max. Hours"
          customStyle={{ roundedRight: 'none' }}
          customRightElement={
            <HStack
              height="50px"
              bgColor="neutral.100"
              pr="16px"
              spacing="17px"
              roundedRight="8px"
            >
              <Box borderWidth="1px" bgColor="neutral.700" height="24px" />
              <Text color="neutral.700">Hours</Text>
            </HStack>
          }
        />
      </HStack>
    </HStack>
  );
};

export default ServiceLevelAgreement;
