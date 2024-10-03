import { HStack, VStack } from '@chakra-ui/react';
import React, { useState } from 'react';
import Info from './Info';
import LineChart from './LineGraph';
import DropDown from '../../Common/DropDown';
import { monthOptions } from '~/lib/utils/constants';
import { Option } from '~/lib/interfaces/general.interfaces';

const MTMTab = () => {
  const [selectedMonth, setSelectMonth] = useState<Option | null>(
    monthOptions[0] as Option
  );
  const labels = ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5'];
  const actual = [90000, 85000, 90000];
  const projected = [85000, 87000, 93000, 92000];
  return (
    <VStack width="full" spacing="10px">
      <HStack width="full" justifyContent="flex-end">
        <DropDown
          options={monthOptions}
          label="Month"
          handleClick={(option) => setSelectMonth(option)}
          selectedOptions={selectedMonth}
          width="100px"
        />
      </HStack>
      <Info value={35650} valueChange={20} />
      <LineChart labels={labels} actual={actual} projected={projected} />
    </VStack>
  );
};

export default MTMTab;
