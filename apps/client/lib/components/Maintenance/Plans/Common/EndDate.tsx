import { Flex, HStack } from '@chakra-ui/react';
import React from 'react';
import CustomDatePicker from '~/lib/components/UI/Form/FormDatePicker';
import SectionInfo from '~/lib/components/UI/Form/FormSectionInfo';

interface EndDateProps {
  sectionMaxWidth: string;
  spacing: string;
}
const EndDate = (props: EndDateProps) => {
  const { sectionMaxWidth, spacing } = props;
  return (
    <HStack width="full" alignItems="flex-start" spacing={spacing}>
      <Flex width="full" maxW={sectionMaxWidth}>
        <SectionInfo
          title="End Date"
          info="Add name that users can likely search with"
          isRequired
        />
      </Flex>

      <CustomDatePicker name="endDate" label="End Date" type="date" />
    </HStack>
  );
};

export default EndDate;
