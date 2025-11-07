import { HStack, Text, VStack } from '@chakra-ui/react';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { DataTable } from '@repo/ui/components';
import CardHeader from '~/lib/components/Dashboard/Common/CardHeader';
import { createColumnHelper } from '@tanstack/react-table';
import { DEFAULT_PAGE_SIZE } from '~/lib/utils/constants';
import { BaseApiResponse, ListResponse, Option } from '@repo/interfaces';
import { useGetPredictiveSlaTicketBreakdownMutation } from '~/lib/redux/services/prediction.services';
import useCustomMutation from '~/lib/hooks/mutation.hook';
import { PredictiveSlaTicketBreakdown } from '~/lib/interfaces/prediction.interfaces';
import { generateSearchCriteria } from '@repo/utils';
import GenericStatusBox from '~/lib/components/UI/GenericStatusBox';
import { dateFormatter } from '~/lib/utils/Formatters';
import { OPERATORS } from '@repo/constants';
import Filters from './Filters';

const PredictiveSLATaskBreakdown = () => {
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(DEFAULT_PAGE_SIZE);
  const [search, setSearch] = useState('');
  const [searchData, setSearchData] = useState<
    BaseApiResponse<ListResponse<PredictiveSlaTicketBreakdown>> | undefined
  >(undefined);
  const { handleSubmit } = useCustomMutation();
  const [searchAssetPerformance, { isLoading }] =
    useGetPredictiveSlaTicketBreakdownMutation({});
  const [slaStatus, setSLAStatus] = useState<null | Option>(null);
  const [datePeriod, setDatePeriod] = useState<null | Option>(null);
  const [category, setCategory] = useState<null | Option>(null);

  const handleSearch = useCallback(async () => {
    const { orCriterion } = generateSearchCriteria(
      undefined,
      {
        search: [search],
      },
      {
        search: {
          key: ['assetName', 'assetCategory'],
          operator: OPERATORS.Contains,
        },
      },
      undefined
    );
    const payload = {
      pageNumber,
      pageSize: pageSize,
      orCriterion,
      slaStatus: +slaStatus?.value!,
      datePeriod: +datePeriod?.value!,
      category: category?.value!,
    };

    const response = await handleSubmit(searchAssetPerformance, payload, '');
    setSearchData(response?.data);
  }, [searchAssetPerformance, search, pageSize, pageNumber]);

  // Trigger search when search input changes or pagination updates
  useEffect(() => {
    handleSearch();
  }, [search, pageNumber, pageSize]);

  // Reset pagination when clearing the search
  useEffect(() => {
    if (!search) {
      setPageSize(DEFAULT_PAGE_SIZE);
      setPageNumber(1);
    }
  }, [search]);

  const columnHelper = createColumnHelper<PredictiveSlaTicketBreakdown>();
  const columns = useMemo(
    () => {
      const baseColumns = [
        columnHelper.accessor('ticketId', {
          cell: (info) => info.getValue() ?? 'N/A',
          header: '#',
          enableSorting: false,
        }),
        columnHelper.accessor('assetName', {
          cell: (info) => info.getValue() ?? 'N/A',
          header: 'Asset',
          enableSorting: false,
        }),
        columnHelper.accessor('riskLevel', {
          cell: (info) => (
            <GenericStatusBox
              text={info.getValue()}
              colorCode={info.row.original.riskLevelColor}
              showDot={false}
              borderWidth="none"
            />
          ),
          header: 'Risk Level',
          enableSorting: false,
        }),
        columnHelper.accessor('slaDeadline', {
          cell: (info) => dateFormatter(info.getValue(), 'DD MMM, 2025'),
          header: 'SLA Deadline',
          enableSorting: false,
        }),
        columnHelper.accessor('actualCompletion', {
          cell: (info) => dateFormatter(info.getValue(), 'DD MMM, 2025'),
          header: 'Actual Completion ',
          enableSorting: false,
        }),
        columnHelper.accessor('slaStatus', {
          cell: (info) => (
            <GenericStatusBox
              text={info.getValue()}
              colorCode={info.row.original.slaStatusColor}
              showDot={false}
              borderWidth="none"
              rounded="full"
            />
          ),
          header: 'Status',
          enableSorting: false,
        }),
        columnHelper.accessor('deviation', {
          cell: (info) => (
            <Text color={info.row.original.deviationColor}>
              {info.getValue()}
            </Text>
          ),
          header: 'Deviation',
          enableSorting: false,
        }),
      ];

      return baseColumns;
    },
    [[searchData?.data?.items]] //eslint-disable-line
  );
  return (
    <VStack
      width="full"
      height="full"
      pl="16px"
      pr="15px"
      pt="21px"
      pb="12px"
      alignItems="flex-start"
      spacing="16px"
      bgColor="white"
      rounded="8px"
      minH="353px"
    >
      <HStack width="full" justifyContent="space-between">
        <CardHeader>Predictive SLA Task Breakdown</CardHeader>
        <Filters
          slaStatus={slaStatus}
          setSLAStatus={setSLAStatus}
          category={category}
          setCategory={setCategory}
          datePeriod={datePeriod}
          setDatePeriod={setDatePeriod}
        />
      </HStack>
      <DataTable
        columns={columns}
        data={searchData?.data?.items ?? []}
        isLoading={isLoading}
        isFetching={isLoading}
        showFooter={false}
        maxTdWidth="200px"
        customTdStyle={{
          paddingLeft: '16px',
          paddingTop: '12px',
          paddingBottom: '12px',
        }}
      />
    </VStack>
  );
};

export default PredictiveSLATaskBreakdown;
