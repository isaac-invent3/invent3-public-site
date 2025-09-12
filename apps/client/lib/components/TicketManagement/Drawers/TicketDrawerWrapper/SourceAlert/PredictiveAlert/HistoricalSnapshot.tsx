import { HStack, Text, VStack } from '@chakra-ui/react';
import React from 'react';
import LineChart from '~/lib/components/Dashboard/Common/Charts/LineChart';
import DropDown from '~/lib/components/Dashboard/Common/DropDown';

const HistoryDataSnapShot = () => {
  return (
    <VStack spacing="16px" width="full" alignItems="flex-start">
      <HStack spacing="16px" width="full" justifyContent="space-between">
        <Text color="neutral.600" fontWeight={700}>
          Historical Data Snapshot
        </Text>
        <DropDown
          options={[]}
          label="Temperature"
          handleClick={(option) => {}}
          selectedOptions={null}
          width="100px"
        />
      </HStack>
      <LineChart
        labels={['Temperature']}
        datasets={[
          {
            label: 'Actual',
            data: [10, 12, 9, 15, 39],
            borderColor: '#8D35F1',
            pointBorderColor: '#fff',
            pointBackgroundColor: '#8D35F1',
            pointRadius: 6,
            borderWidth: 3,
            tension: 0.4,
            fill: false,
          },
        ]}
        isLoading={false}
      />
    </VStack>
  );
};

export default HistoryDataSnapShot;
