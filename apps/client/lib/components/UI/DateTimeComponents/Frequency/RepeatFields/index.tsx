import { Flex } from '@chakra-ui/react';
import React from 'react';
import { FrequencyInfo } from '~/lib/interfaces/general.interfaces';
import Weekly from './Weekly';
import Annually from './Annually';
import Daily from './Daily';
import Monthly from './Monthly';

interface RepeatFieldProps {
  frequencyInfo: FrequencyInfo;
  setFrequencyInfo: React.Dispatch<React.SetStateAction<FrequencyInfo>>;
  selectedDateTime: string | null;
}

const RepeatFields = (props: RepeatFieldProps) => {
  const { frequencyInfo, setFrequencyInfo, selectedDateTime } = props;
  return (
    <Flex width="full" height="full">
      {frequencyInfo.repeat?.label.toLowerCase() === 'daily' && (
        <Daily
          frequencyInfo={frequencyInfo}
          setFrequencyInfo={setFrequencyInfo}
          selectedDateTime={selectedDateTime}
        />
      )}
      {frequencyInfo.repeat?.label.toLowerCase() === 'monthly' && (
        <Monthly
          frequencyInfo={frequencyInfo}
          setFrequencyInfo={setFrequencyInfo}
        />
      )}
      {frequencyInfo.repeat?.label.toLowerCase() === 'weekly' && (
        <Weekly
          frequencyInfo={frequencyInfo}
          setFrequencyInfo={setFrequencyInfo}
        />
      )}
      {frequencyInfo.repeat?.label.toLowerCase() === 'annually' && (
        <Annually
          frequencyInfo={frequencyInfo}
          setFrequencyInfo={setFrequencyInfo}
        />
      )}
    </Flex>
  );
};

export default RepeatFields;
