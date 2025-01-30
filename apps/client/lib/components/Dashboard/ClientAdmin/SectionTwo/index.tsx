import { SimpleGrid } from '@chakra-ui/react';
import React, { useState } from 'react';
import TaskCompletionRateChart from '../../Common/Charts/TaskCompletionRateChart';
import MaintenanceAndDowntimeChart from './MaintenanceAndDowntime';
import { useAppSelector } from '~/lib/redux/hooks';
import { useGetTaskCompletionRateDataQuery } from '~/lib/redux/services/dashboard/clientadmin.services';
import AssetTrends from './AssetTrends';
import { Option } from '@repo/interfaces';
import { generateLastFiveYears } from '~/lib/utils/helperFunctions';

const SectionTwo = () => {
  const { selectedCountry, selectedState } = useAppSelector(
    (state) => state.dashboard.info
  );
  const [selectedYear, setSelectedYear] = useState<Option | undefined>(
    generateLastFiveYears()[0] as Option
  );
  const { data, isLoading, isFetching } = useGetTaskCompletionRateDataQuery({
    countryId: +selectedCountry?.value!,
    regionId: (selectedState?.value as number) ?? undefined,
  });

  return (
    <SimpleGrid columns={3} width="full" gap="16px">
      <AssetTrends />
      <MaintenanceAndDowntimeChart />
      <TaskCompletionRateChart
        notCompletedColorCode="#00A129"
        completedColorCode="#0366EF"
        isLoading={isLoading || isFetching}
        selectedYear={selectedYear}
        setSelectedYear={setSelectedYear}
        data={
          data?.data?.taskCompletionRates.map((item) => ({
            complete: item.completed,
            inComplete: item.overdue,
            monthId: item.monthId,
            year: item.year,
          })) ?? []
        }
      />
    </SimpleGrid>
  );
};

export default SectionTwo;
