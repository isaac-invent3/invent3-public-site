'use client';
import { addDays } from 'date-fns';
import { useState } from 'react';
import { DateRangePicker } from 'react-date-range';
import './styles.css';
import './default.css';
const DateRange = () => {
  const [state, setState] = useState([
    {
      startDate: new Date(),
      endDate: addDays(new Date(), 7),
      key: 'selection',
    },
  ]);

  return (
    <>
      <DateRangePicker
        onChange={(item: any) => {
          if (item.selection) {
            setState([item.selection]);
          }
        }}
        showPreview
        moveRangeOnFirstSelection={false}
        months={2}
        ranges={state}
        direction="horizontal"
        weekStartsOn={1}
        monthDisplayFormat="LLLL yyy"
      />
      ;{' '}
    </>
  );
};

export default DateRange;