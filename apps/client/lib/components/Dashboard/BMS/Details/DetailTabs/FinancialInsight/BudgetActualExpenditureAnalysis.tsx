import React, { useState } from 'react';
import InfoCard from '../../../InfoCard';
import { Stack } from '@chakra-ui/react';
import { Option } from '@repo/interfaces';
import ChartLegend from '~/lib/components/Dashboard/Common/Charts/ChartLegend';
import { useParams } from 'next/navigation';
import { useGetBMSBudgetVActualExpenditureQuery } from '~/lib/redux/services/dashboard/bms.services';
import BarChart from '~/lib/components/Dashboard/Common/Charts/BarChart';
import { timeRangeOptions } from '~/lib/utils/constants';
import { transformMonthIdsToShortNames } from '~/lib/components/Dashboard/Common/utils';
import { generateLastFiveYears } from '~/lib/utils/helperFunctions';
import { useAppSelector } from '~/lib/redux/hooks';

const BudgetActualExpenditureAnalysis = () => {
  const [selectedYear, setSelectedYear] = useState<Option | null>(
    generateLastFiveYears()[0] as Option
  );
  const params = useParams();
  const id = params?.id as unknown as number;
  const { selectedBuilding, selectedFloor } = useAppSelector(
    (state) => state.dashboard.info
  );
  const { data, isLoading } = useGetBMSBudgetVActualExpenditureQuery(
    {
      facilityId: id,
      buildingId: selectedBuilding?.value as number,
      floorId: selectedFloor?.value as number,
      year: +selectedYear?.value!,
    },
    { skip: !id }
  );

  const chartLegendItems = [
    {
      label: 'Budget',
      color: '#4FBAFF',
    },
    {
      label: 'Actual expenditure analysis',
      color: '#0366EF',
    },
  ];

  return (
    <InfoCard
      title="Budget vs. Actual expenditure analysis"
      containerStyle={{
        height: 'full',
        spacing: '16px',
      }}
      options={timeRangeOptions}
      selectedTimeRange={selectedYear}
      setSelectedTimeRange={setSelectedYear}
    >
      <Stack
        direction="column"
        alignItems="flex-start"
        spacing="38px"
        width="full"
      >
        <ChartLegend
          chartLegendItems={chartLegendItems}
          containerStyle={{
            spacing: '16px',
          }}
        />
        <BarChart
          labels={transformMonthIdsToShortNames(
            data?.data?.map((item) => item.monthId) ?? []
          )}
          chartData={[
            {
              label: 'Budget',
              values: data?.data?.map((item) => item.budget) ?? [],
              color: '#4FBAFF',
            },
            {
              label: 'Actual expenditure analysis',
              values: data?.data?.map((item) => item.actualConsumption) ?? [],
              color: '#0366EF',
            },
          ]}
          isLoading={false}
        />
      </Stack>
    </InfoCard>
  );
};

export default BudgetActualExpenditureAnalysis;
