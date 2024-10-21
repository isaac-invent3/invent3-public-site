import { Flex, HStack } from '@chakra-ui/react';
import React from 'react';
import EmployeeSelect from '~/lib/components/Common/EmployeeSelect';
import SectionInfo from '~/lib/components/UI/Form/FormSectionInfo';

interface OwnerProps {
  sectionMaxWidth: string;
  spacing: string;
  defaultName?: string | null;
}
const Owner = (props: OwnerProps) => {
  const { sectionMaxWidth, spacing, defaultName } = props;
  return (
    <HStack width="full" alignItems="flex-start" spacing={spacing}>
      <Flex width="full" maxW={sectionMaxWidth}>
        <SectionInfo
          title="Owner"
          info="Add name that users can likely search with"
          isRequired
        />
      </Flex>
      <EmployeeSelect
        selectName="ownerId"
        selectTitle="Owner"
        defaultName={defaultName}
      />
    </HStack>
  );
};

export default Owner;
