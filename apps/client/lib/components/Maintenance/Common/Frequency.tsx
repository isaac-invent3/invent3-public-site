import { Flex, HStack } from '@chakra-ui/react';
import React from 'react';
import SectionInfo from '~/lib/components/UI/Form/FormSectionInfo';
import FrequencySelect from '../../Common/Frequency';

interface FrequencyProps {
  sectionMaxWidth: string;
  spacing: string;
  defaultName?: string | null;
}
const Frequency = (props: FrequencyProps) => {
  const { sectionMaxWidth, spacing, defaultName } = props;
  return (
    <HStack width="full" alignItems="flex-start" spacing={spacing}>
      <Flex width="full" maxW={sectionMaxWidth}>
        <SectionInfo
          title="Frequency"
          info="Add name that users can likely search with"
          isRequired
        />
      </Flex>
      <FrequencySelect
        selectName="frequencyId"
        selectTitle="Frequency"
        defaultName={defaultName}
      />
    </HStack>
  );
};

export default Frequency;
