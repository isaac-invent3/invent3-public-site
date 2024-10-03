import { HStack, VStack } from '@chakra-ui/react';
import React, { useState } from 'react';
import Info from './Info';
import LineChart from './LineGraph';
import DropDown from '../../Common/DropDown';
import { yearOptions } from '~/lib/utils/constants';
import { Option } from '~/lib/interfaces/general.interfaces';

const Y2DTab = () => {
  const [selectedYear, setSelectedYear] = useState<Option | null>(
    yearOptions[0] as Option
  );
  const labels = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];
  const actual = [90000, 95000, 98000, 85000, 87000, 89000, 88000];
  const projected = [
    85000, 87000, 93000, 92000, 96000, 95000, 94000, 97000, 80000, 85000, 95000,
  ];
  return (
    <VStack width="full" spacing="10px">
      <HStack width="full" justifyContent="flex-end">
        <DropDown
          options={yearOptions}
          label="Year"
          handleClick={(option) => setSelectedYear(option)}
          selectedOptions={selectedYear}
          width="100px"
        />
      </HStack>
      <Info value={90000} valueChange={20} />
      <LineChart labels={labels} actual={actual} projected={projected} />
    </VStack>
  );
};

export default Y2DTab;
