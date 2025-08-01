'use client';
import { Flex, HStack, Skeleton, Stack, Text, VStack } from '@chakra-ui/react';
import { DataTable } from '@repo/ui/components';
import { createColumnHelper } from '@tanstack/react-table';
import moment from 'moment';
import { useMemo, useState } from 'react';
import { ViewReportTableData } from '~/lib/interfaces/report.interfaces';
import { useAppSelector } from '~/lib/redux/hooks';
import {
  useGetReportByIdQuery,
  useViewReportByIdQuery,
} from '~/lib/redux/services/reports.services';
import { DEFAULT_PAGE_SIZE } from '~/lib/utils/constants';
import { dateFormatter } from '~/lib/utils/Formatters';
import PageHeader from '../../UI/PageHeader';
import ReportViewFilters from '../Filters/ReportViewFilters';

interface ReportViewProps {
  id: string;
}

const ReportView = (props: ReportViewProps) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(DEFAULT_PAGE_SIZE);

  const [activeFilter, setActiveFilter] = useState<'general' | null>(null);
  const { filters } = useAppSelector((state) => state.report);

  const { data: reportInfo, isLoading: loadingReportInfo } =
    useGetReportByIdQuery(props.id);

  const { data: reportTableData, isLoading: loadingReportTableData } =
    useViewReportByIdQuery({
      reportId: props.id,
      startDate: moment(filters.fromDate, 'DD-MM-YYYY')
        .utcOffset(0, true)
        .toISOString(),
      endDate: moment(filters.toDate, 'DD-MM-YYYY')
        .utcOffset(0, true)
        .toISOString(),
      pageNumber: 1,
      pageSize: DEFAULT_PAGE_SIZE,
    });

  const columnHelper = createColumnHelper<any>();

  const generateDynamicColumns = (data: ViewReportTableData[]) => {
    if (!data || data.length === 0) return [];

    // Get keys from the first record to generate columns dynamically
    const dynamicKeys = Object.keys(data[0]?.reportValues || {});

    return dynamicKeys.map((key) => {
      return columnHelper.accessor(key, {
        cell: (info) => info.row.original.reportValues[key],
        header: key.replace(/([A-Z])/g, ' $1').toUpperCase(), // Format key to readable header
        enableSorting: false,
      });
    });
  };

  const columns = useMemo(
    () => {
      const dynamicColumns = generateDynamicColumns(
        reportTableData?.data.items || []
      );

      return dynamicColumns;
    },
    [[reportTableData?.data.items]] //eslint-disable-line
  );

  return (
    <Flex width="full" direction="column" pb="24px" pt="12px">
      <VStack
        spacing="58px"
        alignItems="flex-start"
        width="full"
        pt="12px"
        borderBottom="1px solid #BBBBBB"
        paddingBottom="16px"
        marginBottom="16px"
        px={{ base: '16px', lg: 'none' }}
      >
        <Skeleton isLoaded={!loadingReportInfo} width="full" height="full">
          <Stack
            width="full"
            justifyContent="space-between"
            alignItems={{ base: 'flex-start', lg: 'center' }}
            direction={{ base: 'column', lg: 'row' }}
            spacing="16px"
          >
            <VStack alignItems="start">
              <HStack spacing="16px">
                <PageHeader>{reportInfo?.data.reportName}</PageHeader>

                {reportInfo?.data.isDefaultReport && (
                  <Text
                    bg="#BBBBBB"
                    borderRadius="24px"
                    padding="6px 12px"
                    color="#0E2642"
                  >
                    Default
                  </Text>
                )}
              </HStack>

              <HStack>
                <Text
                  color="#838383"
                  size="md"
                  fontWeight="700"
                  lineHeight="16.63px"
                  textTransform="capitalize"
                >
                  Created by: {reportInfo?.data.createdBy}
                </Text>

                <Text color="#838383" fontWeight="500">
                  |{' '}
                  {dateFormatter(
                    reportInfo?.data.createdDate,
                    'DD - MM - YYYY'
                  )}
                </Text>
              </HStack>
            </VStack>
            <HStack spacing="16px" flexWrap="wrap">
              <Text
                color="#0E2642"
                size="md"
                fontWeight="500"
                lineHeight="16.63px"
              >
                Total Record: {reportTableData?.data.totalItems}
              </Text>

              {reportInfo?.data && (
                <ReportViewFilters
                  activeFilter={activeFilter}
                  setActiveFilter={setActiveFilter}
                  report={reportInfo?.data}
                />
              )}
            </HStack>
          </Stack>
        </Skeleton>
      </VStack>

      <DataTable
        columns={columns}
        data={reportTableData?.data.items ?? []}
        isLoading={loadingReportTableData}
        isFetching={loadingReportTableData}
        totalPages={reportTableData?.data?.totalPages}
        setPageNumber={setCurrentPage}
        pageNumber={currentPage}
        pageSize={pageSize}
        setPageSize={setPageSize}
        emptyLines={5}
        isSelectable
        maxTdWidth="200px"
        customThStyle={{
          paddingLeft: '16px',
          paddingTop: '12px',
          paddingBottom: '12px',
          fontWeight: 700,
        }}
        customTdStyle={{
          paddingLeft: '16px',
          paddingTop: '12px',
          paddingBottom: '12px',
        }}
      />
    </Flex>
  );
};

export default ReportView;
