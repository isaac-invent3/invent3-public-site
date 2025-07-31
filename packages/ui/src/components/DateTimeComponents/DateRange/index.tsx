'use client';
import { addDays } from 'date-fns';
import { useEffect, useMemo, useState } from 'react';
import {
  DateRangePicker,
  Range as IRange,
  RangeKeyDict,
} from 'react-date-range';
import './styles.css';

export interface BaseDateRangeProps {
  minStartDate?: Date;
  maxEndDate?: Date;
  dateRange?: IRange | undefined;
  // eslint-disable-next-line no-unused-vars
  handleChangeDate?: (info: IRange) => void;
}

const DateRange = (props: BaseDateRangeProps) => {
  const { minStartDate, maxEndDate, dateRange, handleChangeDate } = props;

  const getInitialDateRange = (): IRange[] => {
    if (dateRange && dateRange?.startDate && dateRange?.endDate) {
      return [dateRange];
    }
    return [
      {
        startDate: new Date(),
        endDate: addDays(new Date(), 7),
        key: 'selection',
      },
    ];
  };

  const [selectedDateRange, setSelectedDateRange] = useState<IRange[]>(
    getInitialDateRange()
  );

  useEffect(() => {
    if (dateRange && dateRange?.startDate && dateRange?.endDate) {
      setSelectedDateRange([
        {
          startDate: dateRange?.startDate ?? new Date(),
          endDate: dateRange?.endDate ?? new Date(),
          key: 'selection',
        },
      ]);
    }
  }, [dateRange]);

  return (
    <DateRangePicker
      onChange={(item: RangeKeyDict) => {
        const value = item?.selection ?? item?.range1;
        const newDateRange = value ? [value] : [];
        setSelectedDateRange(newDateRange);

        if (handleChangeDate && value) {
          handleChangeDate(value);
        }
      }}
      showPreview
      moveRangeOnFirstSelection={false}
      months={2}
      ranges={selectedDateRange}
      direction="horizontal"
      weekStartsOn={1}
      monthDisplayFormat="LLLL yyy"
      minDate={minStartDate}
      maxDate={maxEndDate}
    />
  );
};

export default DateRange;
