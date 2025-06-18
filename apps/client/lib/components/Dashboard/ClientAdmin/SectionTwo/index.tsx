import { SimpleGrid } from '@chakra-ui/react';
import { Option } from '@repo/interfaces';
import { useState } from 'react';
import { useAppSelector } from '~/lib/redux/hooks';
import { useGetTaskCompletionRateDataQuery } from '~/lib/redux/services/dashboard/clientadmin.services';
import { generateLastFiveYears } from '~/lib/utils/helperFunctions';
import TaskCompletionRateChart from '../../Common/Charts/TaskCompletionRateChart';
import AssetTrends from './AssetTrends';
import MaintenanceAndDowntimeChart from './MaintenanceAndDowntime';

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
    <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} width="full" gap="16px">
      <AssetTrends />
      <MaintenanceAndDowntimeChart />
      <TaskCompletionRateChart
        notCompletedColorCode="#00A129"
        completedColorCode="#0366EF"
        isLoading={isLoading || isFetching}
        selectedYear={selectedYear}
        setSelectedYear={setSelectedYear}
        data={
          data?.data
            ? data?.data?.map((item) => ({
                complete: item.completed,
                inComplete: item.overdue,
                monthId: item.monthId,
                year: item.year,
              }))
            : []
        }
      />
    </SimpleGrid>
  );
};

export default SectionTwo;
