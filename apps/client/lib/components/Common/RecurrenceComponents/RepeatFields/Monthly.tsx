import { useEffect } from 'react';

import { FormInputWrapper } from '@repo/ui/components';
import moment from 'moment';
import { useAppDispatch, useAppSelector } from '~/lib/redux/hooks';
import { updateRepeatInterval } from '~/lib/redux/slices/DateSlice';
import MonthCard from '../MonthCard';

const Monthly = () => {
  const dateInfo = useAppSelector((state) => state.date.info);
  const dispatch = useAppDispatch();
  const monthlyInterval = dateInfo.recurrence.repeatIntervals.monthly;

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
    <FormInputWrapper
      title="On Days"
      description="Select specific days for the occurence schedule"
      isRequired={false}
      sectionMaxWidth="130px"
      customSpacing="29px"
      mb="32px"
    >
      <MonthCard
        selectedDays={monthlyInterval}
        handleSelectDay={(day) => handleClick(day)}
      />
    </FormInputWrapper>
  );
};

export default Monthly;
