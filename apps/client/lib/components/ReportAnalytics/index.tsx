'use client';

import {
  Flex,
  Grid,
  HStack,
  Link,
  SimpleGrid,
  Skeleton,
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
  useGetCMFReportDasboardValuesQuery,
  useGetReportDasboardValuesQuery,
} from '~/lib/redux/services/reports.services';
import { DEFAULT_PAGE_SIZE, ROLE_IDS_ENUM } from '~/lib/utils/constants';
import GeneralFilter from './Filters/GeneralFilter';
import Header from './Header';
import BranchesWithTopAssetsChart from './ReportDashboard/BranchesWithTopAssetsChart';
import DefaultReport from './ReportDashboard/DefaultReport';
import ReportCard from './ReportDashboard/ReportCard';
import SavedTemplate from './ReportDashboard/SavedTemplate';
import TicketStatusPieChart from './ReportDashboard/TicketStatusPieChart';
import { useState } from 'react';
import { ReportFilterInput } from '~/lib/interfaces/report.interfaces';
import PredictiveMaintenance from '../Dashboard/BMS/Details/DetailTabs/PredictiveMaintenance';
import PredictiveMaintenanceReport from './PredictiveMaintenanceReport';

const ReportAnalytics = () => {
  const { data: defaultReports, isLoading: defaultReportsLoading } =
    useGetAllDefaultReportsQuery({
      pageSize: DEFAULT_PAGE_SIZE,
    });
  const { filters } = useAppSelector((state) => state.report);
  const [finalFilters, setFinalFilters] = useState<ReportFilterInput>(filters);
  const session = useSession();
  const user = session?.data?.user;

  const { data: savedReports, isLoading: savedReportsLoading } =
    useGetAllSavedReportsQuery({
      pageSize: DEFAULT_PAGE_SIZE,
    });

  const {
    data: reportDashboardValues,
    isLoading: reportDashboardLoading,
    isFetching: isFetchingReportDashboard,
  } = useGetReportDasboardValuesQuery(
    {
      startDate: moment(finalFilters.fromDate, 'DD/MM/YYYY')
        .utc()
        .toISOString(),
      endDate: moment(finalFilters.toDate, 'DD/MM/YYYY').utc().toISOString(),
      regionIds: finalFilters.region?.map((item) => item.value as number) || [],
      lgaIds: finalFilters.area?.map((item) => item.value as number) || [],
      facilityIds:
        finalFilters.branch?.map((item) => item.value as number) || [],
    },
    { skip: !user || user?.roleIds.includes(ROLE_IDS_ENUM.THIRD_PARTY) }
  );

  const {
    data: cmfReportDashboardValues,
    isLoading: cmfReportDashboardLoading,
    isFetching: isFetchingCMFReportDashboard,
  } = useGetCMFReportDasboardValuesQuery(
    {
      startDate: moment(finalFilters.fromDate, 'DD/MM/YYYY')
        .utc()
        .toISOString(),
      endDate: moment(finalFilters.toDate, 'DD/MM/YYYY').utc().toISOString(),
      regionIds: finalFilters.region?.map((item) => item.value as number) || [],
      tenants:
        finalFilters.companies?.map((item) => item.value as string) || [],
      lgaIds: finalFilters.area?.map((item) => item.value as number) || [],
      facilityIds:
        finalFilters.branch?.map((item) => item.value as number) || [],
    },
    { skip: !user || !user?.roleIds.includes(ROLE_IDS_ENUM.THIRD_PARTY) }
  );

  const normalCardData = [
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
      value: reportDashboardValues?.data.totalMaintenanceCost?.statValue ?? 0,
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

  const cmfCardData = [
    {
      title: 'Total Client Companies Managed',
      value:
        cmfReportDashboardValues?.data?.totalClientCompaniesManaged
          ?.statValue ?? 0,
      reportId:
        cmfReportDashboardValues?.data?.totalClientCompaniesManaged?.reportId,
    },
    {
      title: 'Total Active Client Companies',
      value:
        cmfReportDashboardValues?.data?.totalActiveClientCompanies?.statValue ??
        0,
      reportId:
        cmfReportDashboardValues?.data?.totalActiveClientCompanies?.reportId,
    },
    {
      title: 'Total Assets Under Management',
      value:
        cmfReportDashboardValues?.data?.totalAssetsUnderManagement?.statValue ??
        0,
      reportId:
        cmfReportDashboardValues?.data?.totalAssetsUnderManagement?.reportId,
    },
    {
      title: 'Total Open Tickets',
      value: cmfReportDashboardValues?.data?.totalOpenTasks?.statValue ?? 0,
      reportId: cmfReportDashboardValues?.data?.totalOpenTasks?.reportId,
    },
    {
      title: 'Total Maintenance Tasks Completed',
      value: cmfReportDashboardValues?.data?.totalOpenTasks?.statValue ?? 0,
      reportId: cmfReportDashboardValues?.data?.totalOpenTasks?.reportId,
    },
    {
      title: 'Total Compliance Violations Logged',
      value:
        cmfReportDashboardValues?.data?.totalComplianceViolationsLogged
          ?.statValue,
      reportId:
        cmfReportDashboardValues?.data?.totalComplianceViolationsLogged
          ?.reportId,
      color: 'red.500',
    },
  ];

  const cardData = user?.roleIds.includes(ROLE_IDS_ENUM.THIRD_PARTY)
    ? cmfCardData
    : normalCardData;

  return (
    <Flex
      width="full"
      direction="column"
      pb="24px"
      px={{ base: '16px', md: 0 }}
    >
      <Header />

      <GeneralFilter setFinalFilters={setFinalFilters} />

      <Stack
        alignItems="center"
        width="full"
        mt={10}
        spacing="16px"
        paddingBlock="2rem"
        borderBlock="1px solid #BBBBBB"
        justifyContent="space-between"
        direction={{ base: 'column', md: 'row' }}
        opacity={
          isFetchingReportDashboard || isFetchingCMFReportDashboard ? 0.7 : 1
        }
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
              isLoading={reportDashboardLoading || cmfReportDashboardLoading}
              card={card}
              key={index}
            />
          ))}
        </Grid>
        {user?.roleIds.includes(ROLE_IDS_ENUM.THIRD_PARTY) ? (
          <TicketStatusPieChart
            ticketsStatistics={
              cmfReportDashboardValues?.data?.topTicketStatusChart ?? []
            }
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
      <PredictiveMaintenanceReport />
      <VStack borderTop="1px solid #BBBBBB" mt={6}>
        <HStack
          alignItems="center"
          justifyContent="space-between"
          width="full"
          mt="5"
        >
          <Text color="#0E2642" fontSize={14} fontWeight={700}>
            Default Reports
          </Text>

          <Link color="#0366EF" fontWeight="700" fontSize="12px" href="#">
            See all Default Reports
          </Link>
        </HStack>

        {!defaultReportsLoading &&
          (defaultReports?.data.items.length === 0 ||
            !defaultReports?.data) && (
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
          )}

        <SimpleGrid
          columns={{ base: 1, sm: 2, md: 3, lg: 4, xl: 5 }}
          width="100%"
          gap="16px"
          mt="10px"
        >
          {defaultReportsLoading &&
            Array(7)
              .fill('')
              .map((item, index) => (
                <Skeleton minWidth="full" height="194px" />
              ))}
          {!defaultReportsLoading &&
            defaultReports?.data.items.map((report, index) => (
              <DefaultReport
                key={index}
                report={report}
                isLoading={defaultReportsLoading}
              />
            ))}
        </SimpleGrid>
      </VStack>

      <VStack mt="5">
        <HStack
          alignItems="center"
          justifyContent="space-between"
          width="full"
          mt="5"
        >
          <Text color="#0E2642" fontSize={14} fontWeight={700}>
            Saved Templates
          </Text>

          <Link color="#0366EF" fontWeight="700" fontSize="12px" href="#">
            See all Saved Templates
          </Link>
        </HStack>
        {!savedReportsLoading &&
          (savedReports?.data.items.length === 0 || !savedReports?.data) && (
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
          )}

        <SimpleGrid
          columns={{ base: 1, sm: 2, md: 3, lg: 4, xl: 5 }}
          width="100%"
          gap="16px"
          mt="10px"
        >
          {savedReportsLoading &&
            Array(7)
              .fill('')
              .map((item, index) => (
                <Skeleton minWidth="full" height="194px" />
              ))}

          {!savedReportsLoading &&
            savedReports?.data.items.map((report, index) => (
              <SavedTemplate key={index} report={report} />
            ))}
        </SimpleGrid>
      </VStack>
    </Flex>
  );
};

export default ReportAnalytics;
