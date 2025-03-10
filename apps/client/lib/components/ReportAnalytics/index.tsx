'use client';

import {
  Flex,
  Grid,
  HStack,
  Link,
  Stack,
  Text,
  VStack,
} from '@chakra-ui/react';
import moment from 'moment';
import { useSession } from 'next-auth/react';
import { useAppSelector } from '~/lib/redux/hooks';
import {
  useGetAllDefaultReportsQuery,
  useGetAllSavedReportsQuery,
  useGetReportDasboardValuesQuery,
} from '~/lib/redux/services/reports.services';
import { DEFAULT_PAGE_SIZE, ROLE_IDS_ENUM } from '~/lib/utils/constants';
import GeneralFilter from './Filters/GeneralFilter';
import Header from './Header';
import BranchesWithTopAssetsChart from './ReportDashboard/BranchesWithTopAssetsChart';
import DefaultReport from './ReportDashboard/DefaultReport';
import { dummyReport } from './ReportDashboard/dummyData';
import ReportCard from './ReportDashboard/ReportCard';
import SavedTemplate from './ReportDashboard/SavedTemplate';
import TicketStatusPieChart from './ReportDashboard/TicketStatusPieChart';

const ReportAnalytics = () => {
  const { data: defaultReports, isLoading: defaultReportsLoading } =
    useGetAllDefaultReportsQuery({
      pageSize: DEFAULT_PAGE_SIZE,
    });

  const { filters } = useAppSelector((state) => state.report);
  const session = useSession();
  const user = session?.data?.user;

  const { data: savedReports, isLoading: savedReportsLoading } =
    useGetAllSavedReportsQuery({
      pageSize: DEFAULT_PAGE_SIZE,
    });

  const { data: reportDashboardValues, isLoading: reportDashboardLoading } =
    useGetReportDasboardValuesQuery({
      startDate: moment(filters.fromDate, 'DD/MM/YYYY HH:mm')
        .utcOffset(0, true)
        .toISOString(),
      endDate: moment(filters.toDate, 'DD/MM/YYYY HH:mm')
        .utcOffset(0, true)
        .toISOString(),
    });

  const cardData = [
    {
      title: 'Total Assets',
      value: reportDashboardValues?.data.totalAssets?.statValue,
      reportId: reportDashboardValues?.data.totalAssets?.reportId,
    },
    {
      title: 'New Assets Added',
      value: reportDashboardValues?.data.newAssets?.statValue,
      reportId: reportDashboardValues?.data.newAssets?.reportId,
    },
    {
      title: 'Total Assets Disposed',
      value: reportDashboardValues?.data.totalAssetsDisposed?.statValue,
      color: 'red.500',
      reportId: reportDashboardValues?.data.totalAssetsDisposed?.reportId,
    },
    {
      title: 'Maintenance Cost',
      value: reportDashboardValues?.data.totalMaintenanceCost?.statValue,
      reportId: reportDashboardValues?.data.totalMaintenanceCost?.reportId,
    },
    {
      title: 'Total Maintenance Plan',
      value: reportDashboardValues?.data.totalMaintenancePlans?.statValue,
      reportId: reportDashboardValues?.data.totalMaintenancePlans?.reportId,
    },
    {
      title: 'Total Tasks',
      value: reportDashboardValues?.data.totalTasks?.statValue,
      reportId: reportDashboardValues?.data.totalTasks?.reportId,
    },
  ];

  return (
    <Flex
      width="full"
      direction="column"
      pb="24px"
      px={{ base: '16px', md: 0 }}
    >
      <Header />

      <GeneralFilter />

      <Stack
        alignItems="center"
        width="full"
        mt={10}
        spacing="16px"
        paddingBlock="2rem"
        borderBlock="1px solid #BBBBBB"
        justifyContent="space-between"
        direction={{ base: 'column', md: 'row' }}
      >
        <Grid
          templateColumns={{
            base: 'repeat(2, 1fr)',
            xl: 'repeat(3, 1fr)',
          }}
          width={{ base: '100%', xl: '50%' }}
          gap="16px"
        >
          {cardData.map((card, index) => (
            <ReportCard
              isLoading={reportDashboardLoading}
              card={card}
              key={index}
            />
          ))}
        </Grid>
        {user?.roleIds.includes(ROLE_IDS_ENUM.THIRD_PARTY) ? (
          <TicketStatusPieChart
            ticketsStatistics={{
              escalatedTickets: 20,
              openTickets: 125,
              resolvedTickets: 140,
            }}
          />
        ) : (
          <BranchesWithTopAssetsChart
            totalAssets={reportDashboardValues?.data.totalAssets?.statValue}
            topFiveBranchesWithAssets={
              reportDashboardValues?.data.topFiveFacilitiesWithAssets ?? []
            }
          />
        )}
      </Stack>

      <VStack>
        <HStack
          alignItems="center"
          justifyContent="space-between"
          width="full"
          mt="5"
        >
          <Text color="#0E2642" fontSize={14} fontWeight={500}>
            Default Reports
          </Text>

          <Link color="#0366EF" fontWeight="700" fontSize="12px" href="#">
            See all Default Reports
          </Link>
        </HStack>

        <VStack
          justifyContent="center"
          my={{ base: '32px', md: '64px' }}
          w="full"
        >
          <Text fontWeight={700} size="md" color="#0E2642">
            No Default Reports Yet
          </Text>
          <Text
            color="#838383"
            width="200px"
            margin="0 auto"
            textAlign="center"
          >
            It looks like there aren’t any default reports set up yet.
          </Text>
        </VStack>

        <Grid
          templateColumns={{
            base: 'repeat(2, 1fr)',
            sm: 'repeat(3, 1fr)',
            md: 'repeat(4, 1fr)',
            lg: 'repeat(5, 1fr)',
            xl: 'repeat(7, 1fr)',
          }}
          width="100%"
          gap="16px"
          mt="10px"
        >
          {defaultReportsLoading && (
            <DefaultReport report={dummyReport} isLoading={true} />
          )}

          {defaultReports?.data.items.map((report, index) => (
            <DefaultReport
              key={index}
              report={report}
              isLoading={defaultReportsLoading}
            />
          ))}
        </Grid>
      </VStack>

      <VStack mt="5">
        <HStack
          alignItems="center"
          justifyContent="space-between"
          width="full"
          mt="5"
        >
          <Text color="#0E2642" fontSize={14} fontWeight={500}>
            Saved Templates
          </Text>

          <Link color="#0366EF" fontWeight="700" fontSize="12px" href="#">
            See all Saved Templates
          </Link>
        </HStack>
        <VStack
          justifyContent="center"
          my={{ base: '32px', md: '64px' }}
          w="full"
        >
          <Text fontWeight={700} size="md" color="#0E2642">
            No Saved Reports Yet
          </Text>
          <Text
            color="#838383"
            width="200px"
            margin="0 auto"
            textAlign="center"
          >
            It looks like there aren’t any saved reports set up yet
          </Text>
        </VStack>

        <Grid
          templateColumns={{
            base: 'repeat(2, 1fr)',
            sm: 'repeat(3, 1fr)',
            md: 'repeat(4, 1fr)',
            lg: 'repeat(5, 1fr)',
            xl: 'repeat(7, 1fr)',
          }}
          width="100%"
          gap="16px"
          mt="10px"
        >
          {savedReportsLoading && (
            <SavedTemplate report={dummyReport} isLoading={true} />
          )}

          {savedReports?.data.items.map((report, index) => (
            <SavedTemplate key={index} report={report} />
          ))}
        </Grid>
      </VStack>
    </Flex>
  );
};

export default ReportAnalytics;
