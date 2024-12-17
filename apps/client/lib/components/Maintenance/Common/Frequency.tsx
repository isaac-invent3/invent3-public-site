import { Flex, HStack } from '@chakra-ui/react';

import FrequencySelect from '../../Common/Frequency';
import { updateScheduleForm } from '~/lib/redux/slices/MaintenanceSlice';
import { useAppDispatch } from '~/lib/redux/hooks';
import { FormSectionInfo } from '@repo/ui/components';

interface FrequencyProps {
  sectionMaxWidth: string;
  spacing: string;
  defaultName?: string | null;
}
const Frequency = (props: FrequencyProps) => {
  const { sectionMaxWidth, spacing, defaultName } = props;
  const dispatch = useAppDispatch();
  return (
    <HStack width="full" alignItems="flex-start" spacing={spacing}>
      <Flex width="full" maxW={sectionMaxWidth}>
        <FormSectionInfo
          title="Frequency"
          info="Add name that users can likely search with"
          isRequired
        />
      </Flex>
      <FrequencySelect
        selectName="frequencyId"
        selectTitle="Frequency"
        defaultName={defaultName}
        handleSelect={(option) =>
          dispatch(updateScheduleForm({ frequencyName: option.label }))
        }
      />
    </HStack>
  );
};

export default Frequency;
