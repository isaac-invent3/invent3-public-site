import { HStack, Text, VStack } from '@chakra-ui/react';
import React, { useState } from 'react';
import RadioBox from '../../Radio/RadioBox';
import CustomDateButton from './CustomSelectDateButton';
import moment from 'moment';

interface ConditionalDateSelectorProps {
  // eslint-disable-next-line no-unused-vars
  handleSelectedDateTime: (date: Date | null, time: string | null) => void;
  minDate?: Date;
  maxDate?: Date;
  selectedDate?: Date | null;
  selectedTime?: string | null;
  includeTime?: boolean;
}

const ConditionalDateSelector = (props: ConditionalDateSelectorProps) => {
  // eslint-disable-next-line no-unused-vars
  const {
    handleSelectedDateTime,
    minDate,
    maxDate,
    selectedDate,
    selectedTime,
    includeTime = false,
  } = props;
  const [shouldSelectDate, setShouldSelectDate] = useState(
    selectedDate ? true : false
  );

  return (
    <VStack spacing="16px" alignItems="flex-start">
      <HStack spacing="16px">
        <RadioBox
          handleClick={() => {
            setShouldSelectDate(false);
            handleSelectedDateTime(null, null);
          }}
          isSelected={!shouldSelectDate}
        />
        <Text color="black">Never</Text>
      </HStack>
      <HStack spacing="8px">
        <RadioBox
          handleClick={() => {
            setShouldSelectDate(true);
            handleSelectedDateTime(moment().toDate(), null);
          }}
          isSelected={shouldSelectDate}
        />
        <Text color="black">on</Text>
        <HStack>
          <CustomDateButton
            minDate={minDate}
            maxDate={maxDate}
            selectedTime={selectedTime}
            selectedDate={selectedDate}
            handleSelectedDateTime={(date, time) =>
              handleSelectedDateTime(date ?? null, time ?? null)
            }
            isDisabled={!shouldSelectDate}
            customStyle={{ width: '130px' }}
            includeTimeDisplay={includeTime}
          />
        </HStack>
      </HStack>
    </VStack>
  );
};

export default ConditionalDateSelector;
