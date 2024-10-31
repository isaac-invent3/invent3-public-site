import { HStack, Text, VStack } from '@chakra-ui/react';
import React, { useState } from 'react';
import RadioBox from '../../Radio/RadioBox';
import CustomDateButton from './CustomSelectDateButton';
import moment from 'moment';

interface ConditionalDateSelectorProps {
  // eslint-disable-next-line no-unused-vars
  handleSelectedDate: (date: string | null) => void;
  minDate?: Date;
  maxDate?: Date;
}

const ConditionalDateSelector = (props: ConditionalDateSelectorProps) => {
  // eslint-disable-next-line no-unused-vars
  const { handleSelectedDate, minDate, maxDate } = props;
  const [shouldSelectDate, setShouldSelectDate] = useState(false);

  return (
    <VStack spacing="16px" alignItems="flex-start">
      <HStack spacing="16px">
        <RadioBox
          handleClick={() => {
            setShouldSelectDate(false);
            handleSelectedDate(null);
          }}
          isSelected={!shouldSelectDate}
        />
        <Text color="black">Never</Text>
      </HStack>
      <HStack spacing="8px">
        <RadioBox
          handleClick={() => {
            setShouldSelectDate(true);
            handleSelectedDate(moment().toISOString());
          }}
          isSelected={shouldSelectDate}
        />
        <Text color="black">on</Text>
        <CustomDateButton
          isDisabled={!shouldSelectDate}
          customStyle={{ width: '130px' }}
        />
      </HStack>
    </VStack>
  );
};

export default ConditionalDateSelector;
