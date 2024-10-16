import { Flex, HStack } from '@chakra-ui/react';
import React from 'react';
import EmployeeSelect from '~/lib/components/Common/EmployeeSelect';
import SectionInfo from '~/lib/components/UI/Form/FormSectionInfo';

const Owner = () => {
  return (
    <HStack width="full" alignItems="flex-start" spacing="73px">
      <Flex width="full" maxW="118px">
        <SectionInfo
          title="Owner"
          info="Add name that users can likely search with"
          isRequired
        />
      </Flex>
      <EmployeeSelect selectName="ownerId" selectTitle="Owner" />
    </HStack>
  );
};

export default Owner;
