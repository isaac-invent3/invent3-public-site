import React, { useEffect, useState } from 'react';

import { HStack, Icon, Text, VStack } from '@chakra-ui/react';

import moment from 'moment';
import { useAppDispatch, useAppSelector } from '~/lib/redux/hooks';
import { updateRepeatInterval } from '~/lib/redux/slices/DateSlice';
import {
  ChevronLeftIcon,
  ChevronRightIcon,
} from '~/lib/components/CustomIcons';
import { FormSectionInfo } from '@repo/ui/components';
import MonthCard from '../MonthCard';

const months = Array.from({ length: 12 }, (_, i) => ({
  label: moment().month(i).format('MMMM'),
  value: i + 1,
}));

const Monthly = () => {
  const dateInfo = useAppSelector((state) => state.date.info);
  const dispatch = useAppDispatch();
  const annualInterval = dateInfo.recurrence.repeatIntervals.annually;
  const [selectedMonth, setSelectedMonth] = useState(moment().month() + 1);

  const currentMonthNumber = moment().month() + 1;

  const handleClick = (month: number, day: number) => {
    const isSelected = annualInterval[month]?.includes(day);
    const existingDays = annualInterval[month] || [];
    const newSelectedOptions = isSelected
      ? existingDays.filter((option) => option !== day)
      : [...existingDays, day];

    dispatch(
      updateRepeatInterval({
        annually: { ...annualInterval, [month]: newSelectedOptions },
      })
    );
  };

  //Sets today in the current month as the default day with a cap of Day 28
  useEffect(() => {
    const isAllEmpty = Object.values(annualInterval).every(
      (arr) => arr.length === 0
    );
    if (isAllEmpty) {
      const dayOfMonth = Math.min(moment().date(), 28);
      dispatch(
        updateRepeatInterval({
          annually: { ...annualInterval, [currentMonthNumber]: [dayOfMonth] },
        })
      );
    }
  }, []);

  return (
    <HStack width="full" spacing="29px" alignItems="flex-start" mb="32px">
      <FormSectionInfo
        title="Days"
        info="Add name that users can likely search with"
        isRequired={false}
        maxWidth="130px"
      />
      {months.map(
        (item, index) =>
          selectedMonth === item.value && (
            <VStack width="full" spacing="24px" key={index}>
              <HStack width="full" justifyContent="space-between">
                <Icon
                  as={ChevronLeftIcon}
                  boxSize="24px"
                  cursor="pointer"
                  onClick={() => {
                    selectedMonth > 1 && setSelectedMonth((prev) => prev - 1);
                  }}
                />
                <Text fontWeight={700} fontSize="lg">
                  {item.label}
                </Text>
                <Icon
                  as={ChevronRightIcon}
                  boxSize="24px"
                  cursor="pointer"
                  onClick={() => {
                    selectedMonth < 12 && setSelectedMonth((prev) => prev + 1);
                  }}
                />
              </HStack>
              <MonthCard
                selectedDays={annualInterval[item.value] ?? []}
                handleSelectDay={(day) => handleClick(item.value, day)}
              />
            </VStack>
          )
      )}
    </HStack>
  );
};

export default Monthly;
