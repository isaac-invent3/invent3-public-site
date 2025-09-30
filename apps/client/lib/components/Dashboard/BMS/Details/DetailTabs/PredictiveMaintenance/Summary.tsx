import {
  Grid,
  GridItem,
  HStack,
  SimpleGrid,
  Skeleton,
  Stack,
  Text,
  VStack,
} from '@chakra-ui/react';
import React from 'react';
import SummaryCard from '../../../Common/SummaryCard';
import { useParams } from 'next/navigation';
import {
  useGetBMSAssetCategoryHealthStatusQuery,
  useGetBMSPredictiveMaintenanceOverviewQuery,
} from '~/lib/redux/services/dashboard/bms.services';
import ItemDetail from '../../../Common/ItemDetail';
import { Button } from '@repo/ui/components';
import { ROUTES } from '~/lib/utils/constants';

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
      <GridItem>
        <SummaryCard title="Total Assets">
          <HStack
            width="full"
            justifyContent="space-between"
            alignItems="flex-end"
          >
            <VStack alignItems="flex-start" spacing="8px">
              <Skeleton isLoaded={!isLoading}>
                <Text fontWeight={800} size="xl">
                  {data?.data?.totalMaintenance?.toLocaleString() ?? '-'}
                </Text>
              </Skeleton>
              <Text color="neutral.600">This Month</Text>
            </VStack>
            <Button
              customStyles={{ width: '66px', height: '28px' }}
              href={`/${ROUTES.ASSETS}`}
            >
              View All
            </Button>
          </HStack>
        </SummaryCard>
      </GridItem>
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
      <GridItem colSpan={{ base: 1, lg: 2 }} height="full">
        <SummaryCard
          title="Equipment Health Score"
          icon="/adjust.png"
          containerStyle={{
            height: 'full',
          }}
        >
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
