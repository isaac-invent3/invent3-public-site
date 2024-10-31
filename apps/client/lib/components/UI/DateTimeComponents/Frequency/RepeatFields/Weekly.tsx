import React from 'react';
import { HStack } from '@chakra-ui/react';
import { FrequencyInfo, Option } from '~/lib/interfaces/general.interfaces';
import SectionInfo from '../../../Form/FormSectionInfo';
import SelectableButtonGroup from '../../../Button/SelectableButtonGroup';

const DAYS = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

interface WeeklyProps {
  frequencyInfo: FrequencyInfo;
  setFrequencyInfo: React.Dispatch<React.SetStateAction<FrequencyInfo>>;
}
const Weekly = (props: WeeklyProps) => {
  const { frequencyInfo, setFrequencyInfo } = props;

  return (
    <HStack width="full" spacing="29px" alignItems="flex-start">
      <SectionInfo
        title="On days"
        info="Add name that users can likely search with"
        isRequired={false}
        maxWidth="130px"
      />

      <SelectableButtonGroup
        options={DAYS.map(
          (item, index) => ({ label: item, value: index }) as Option
        )}
        selectedOptions={frequencyInfo.repeatIntervals.map(
          (item) => ({ label: item, value: item }) as Option
        )}
        handleSelect={(options) =>
          setFrequencyInfo((prev) => ({
            ...prev,
            repeatIntervals: options.map((item) => item.value),
          }))
        }
        buttonVariant="outline"
        customContainerStyle={{ spacing: '4px' }}
        customButtonStyle={{ width: '42px', height: '42px' }}
        isMultiSelect={true}
      />
    </HStack>
  );
};

export default Weekly;
