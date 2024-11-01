import React, { useEffect } from 'react';

import { HStack, SimpleGrid } from '@chakra-ui/react';

import SectionInfo from '../../../Form/FormSectionInfo';
import Button from '../../../Button';
import moment from 'moment';
import { useAppDispatch, useAppSelector } from '~/lib/redux/hooks';
import { updateRepeatInterval } from '~/lib/redux/slices/DateSlice';

const Monthly = () => {
  const dateInfo = useAppSelector((state) => state.date.info);
  const dispatch = useAppDispatch();
  const monthlyInterval = dateInfo.frequency.repeatIntervals.monthly;

  const handleClick = (item: number) => {
    const isSelected = monthlyInterval.some((option) => option === item);
    const newSelectedOptions = isSelected
      ? monthlyInterval.filter((option) => option !== item)
      : [...monthlyInterval, item];
    newSelectedOptions.length >= 1 &&
      dispatch(updateRepeatInterval({ monthly: newSelectedOptions }));
  };

  //Sets today as the default day with a cap of Day 28
  useEffect(() => {
    if (monthlyInterval.length === 0) {
      const dayOfMonth = Math.min(moment().date(), 28);
      dispatch(updateRepeatInterval({ monthly: [dayOfMonth] }));
    }
  }, []);

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
            const isSelected = monthlyInterval.some(
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
