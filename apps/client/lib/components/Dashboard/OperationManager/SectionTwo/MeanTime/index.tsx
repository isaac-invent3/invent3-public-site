import { Flex, HStack, VStack } from '@chakra-ui/react';
import React, { useState } from 'react';
import { Option } from '~/lib/interfaces/general.interfaces';
import { timeRangeOptions } from '~/lib/utils/constants';
import Info from './Info';
import RadarChart from './RadarChart';
import CardHeader from '../../../Common/CardHeader';
import DropDown from '../../../Common/DropDown';
import { useAssetMeanTimeComputationQuery } from '~/lib/redux/services/asset/general.services';

const MeanTime = () => {
  const [selectedTimeRange, setSelectedTimeRange] = useState<Option | null>(
    timeRangeOptions[0] as Option
  );
  const { data, isLoading, isFetching } = useAssetMeanTimeComputationQuery({
    monthId: +selectedTimeRange?.value!,
  });
  return (
    <VStack
      width="full"
      height="full"
      p="16px"
      alignItems="flex-start"
      spacing="24px"
      bgColor="primary.500"
      rounded="8px"
    >
      <HStack width="full" justifyContent="space-between">
        <CardHeader color="white">Mean Time</CardHeader>
        <DropDown
          options={timeRangeOptions}
          label="Timeline"
          handleClick={(option) => setSelectedTimeRange(option)}
          selectedOptions={selectedTimeRange}
          width="110px"
        />
      </HStack>
      <HStack width="full" height="full" spacing="24px" alignItems="center">
        <Flex width="51%" flexGrow={1} alignItems="flex-start">
          <RadarChart />
        </Flex>
        <Flex
          direction="column"
          justifyContent="space-between"
          width="49%"
          gap="32px"
        >
          <Info
            title="Mean TIme Between Failures (MTBF)"
            days={data?.data.mtbf ?? 0}
            valueChange={20}
            isLoading={isLoading || isFetching}
          />
          <Info
            title="Mean Time To Repair (MTTR)"
            days={data?.data.mttr ?? 0}
            valueChange={20}
            isLoading={isLoading || isFetching}
          />
        </Flex>
      </HStack>
    </VStack>
  );
};

export default MeanTime;
