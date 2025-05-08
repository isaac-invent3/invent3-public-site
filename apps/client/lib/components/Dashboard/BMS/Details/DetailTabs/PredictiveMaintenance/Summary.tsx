import { Grid, GridItem, SimpleGrid, Stack } from '@chakra-ui/react';
import React from 'react';
import SummaryCard from '../../../Common/SummaryCard';
import { useParams } from 'next/navigation';
import {
  useGetBMSAssetCategoryHealthStatusQuery,
  useGetBMSPredictiveMaintenanceOverviewQuery,
} from '~/lib/redux/services/dashboard/bms.services';
import ItemDetail from '../../../Common/ItemDetail';

const Summary = () => {
  const params = useParams();
  const id = params?.id as unknown as number;
  const { data, isLoading } = useGetBMSPredictiveMaintenanceOverviewQuery(
    { facilityId: id },
    { skip: !id }
  );
  const { data: categoryHealthData } = useGetBMSAssetCategoryHealthStatusQuery(
    { facilityId: id },
    { skip: !id }
  );

  const summaryData = [
    {
      title: 'Total Predictive Maintenance',
      value: data?.data?.totalMaintenance?.toLocaleString() ?? '-',
      subtitle: 'This Month',
      icon: '/adjust.png',
    },
    {
      title: 'Scheduled Maintenance',
      value: data?.data?.scheduledMaintenance?.toLocaleString() ?? '-',
      subtitle: 'This week',
      icon: '/adjust.png',
    },
  ];

  return (
    <Grid
      templateColumns={{ base: 'repeat(1, 1fr)', lg: 'repeat(4, 1fr)' }}
      gap="16px"
      width="full"
    >
      {summaryData.map((item, index) => (
        <GridItem colSpan={1} height="full">
          <SummaryCard
            {...item}
            key={index}
            isLoading={isLoading}
            containerStyle={{ height: 'full', justifyContent: 'space-between' }}
          />
        </GridItem>
      ))}
      <GridItem colSpan={{ base: 1, lg: 2 }}>
        <SummaryCard title="Equipment Health Score" icon="/adjust.png">
          <Stack
            direction={{ base: 'column', lg: 'row' }}
            flexWrap="wrap"
            justifyContent="space-between"
            width="full"
          >
            {categoryHealthData?.data?.map((item, index) => (
              <ItemDetail
                icon="/adjust.png"
                value={`${item.value}%`}
                title={item.key}
                key={index}
              />
            ))}
          </Stack>
        </SummaryCard>
      </GridItem>
    </Grid>
  );
};

export default Summary;
