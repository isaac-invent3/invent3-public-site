import { Flex } from '@chakra-ui/react';
import React from 'react';
import { FrequencyInfo } from '~/lib/interfaces/general.interfaces';
import Weekly from './Weekly';

interface RepeatFieldProps {
  frequencyInfo: FrequencyInfo;
  setFrequencyInfo: React.Dispatch<React.SetStateAction<FrequencyInfo>>;
}

const RepeatFields = (props: RepeatFieldProps) => {
  const { frequencyInfo, setFrequencyInfo } = props;
  return (
    <Flex width="full" height="full">
      {frequencyInfo.repeat.label.toLowerCase() === 'weekly' && (
        <Weekly
          frequencyInfo={frequencyInfo}
          setFrequencyInfo={setFrequencyInfo}
        />
      )}
    </Flex>
  );
};

export default RepeatFields;
