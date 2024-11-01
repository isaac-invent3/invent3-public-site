import React, { useEffect } from 'react';

import { HStack, SimpleGrid } from '@chakra-ui/react';

import { FrequencyInfo } from '~/lib/interfaces/general.interfaces';
import SectionInfo from '../../../Form/FormSectionInfo';
import Button from '../../../Button';
import moment from 'moment';

interface MonthlyProps {
  frequencyInfo: FrequencyInfo;
  setFrequencyInfo: React.Dispatch<React.SetStateAction<FrequencyInfo>>;
}
const Monthly = (props: MonthlyProps) => {
  const { frequencyInfo, setFrequencyInfo } = props;

  const handleClick = (item: number) => {
    const isSelected = frequencyInfo.repeatIntervals.some(
      (option) => option === item
    );
    const newSelectedOptions = isSelected
      ? frequencyInfo.repeatIntervals.filter((option) => option !== item)
      : [...frequencyInfo.repeatIntervals, item];
    setFrequencyInfo((prev) => ({
      ...prev,
      repeatIntervals:
        newSelectedOptions.length >= 1
          ? newSelectedOptions
          : frequencyInfo.repeatIntervals,
    }));
  };

  //Sets today as the default day with a cap of Day 28
  useEffect(() => {
    if (frequencyInfo.repeatIntervals.length === 0) {
      const dayOfMonth = Math.min(moment().date(), 28);
      setFrequencyInfo((prev) => ({ ...prev, repeatIntervals: [dayOfMonth] }));
    }
  }, [frequencyInfo]);

  return (
    <HStack width="full" spacing="29px" alignItems="flex-start" mb="32px">
      <SectionInfo
        title="Days"
        info="Add name that users can likely search with"
        isRequired={false}
        maxWidth="130px"
      />
      <SimpleGrid
        columns={7}
        rowGap="12px"
        columnGap="4px"
        width="full"
        border="1px solid #BBBBBB80"
        bgColor="#F7F7F7"
        py={2}
        px="4px"
        rounded="8px"
      >
        {Array(28)
          .fill('')
          .map((_, index) => {
            const isSelected = frequencyInfo.repeatIntervals.some(
              (option) => option === index + 1
            );
            return (
              <Button
                key={index}
                handleClick={() => handleClick(index + 1)}
                variant={isSelected ? 'primary' : 'outline'}
                customStyles={{
                  py: '10px',
                  borderColor: isSelected ? 'none' : '#BBBBBB80',
                  color: isSelected ? 'white' : 'black',
                }}
              >
                {index + 1}
              </Button>
            );
          })}
      </SimpleGrid>
    </HStack>
  );
};

export default Monthly;
