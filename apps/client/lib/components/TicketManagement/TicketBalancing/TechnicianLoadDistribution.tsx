import { useMediaQuery, VStack } from '@chakra-ui/react';
import { DataTable } from '@repo/ui/components';
import { createColumnHelper } from '@tanstack/react-table';
import { useMemo, useState } from 'react';
import { LifecycleComparisonReport } from '~/lib/interfaces/location/lifecycle.interfaces';
import CardHeader from '../../Dashboard/Common/CardHeader';
import { DEFAULT_PAGE_SIZE } from '~/lib/utils/constants';
import { useGetTechnicianLoadDistributionQuery } from '~/lib/redux/services/ticket.services';
import { TechnicianLoad } from '~/lib/interfaces/ticket.interfaces';
import GenericStatusBox from '../../UI/GenericStatusBox';

const TechnicianLoadDistribution = () => {
  const columnHelper = createColumnHelper<TechnicianLoad>();
  const [isMobile] = useMediaQuery('(max-width: 768px)');
  const [pageSize, setPageSize] = useState(DEFAULT_PAGE_SIZE);
  const [pageNumber, setPageNumber] = useState(1);
  const { data, isLoading, isFetching } = useGetTechnicianLoadDistributionQuery(
    {
      pageSize,
      pageNumber,
    }
  );

  const columns = useMemo(
    () => {
      const baseColumns = [
        columnHelper.accessor('name', {
          cell: (info) => info.getValue() ?? 'N/A',
          header: 'Technician',
          enableSorting: false,
        }),
        columnHelper.accessor('skillGroup', {
          cell: (info) => info.getValue() ?? 'N/A',
          header: 'Skill Level',
          enableSorting: false,
        }),
        columnHelper.accessor('location', {
          cell: (info) => info.getValue() ?? 'N/A',
          header: 'Location',
          enableSorting: true,
        }),
        columnHelper.accessor('activeTickets', {
          cell: (info) => info.getValue() ?? 'N/A',
          header: 'Active Tickets',
          enableSorting: true,
        }),
        columnHelper.accessor('maxCapacity', {
          cell: (info) => info.getValue() ?? 'N/A',
          header: 'Max Capacity',
          enableSorting: true,
        }),
        columnHelper.accessor('load', {
          cell: (info) => info.getValue() ?? 'N/A',
          header: 'Load %',
          enableSorting: true,
        }),
        columnHelper.accessor('loadStatus', {
          cell: (info) => (
            <GenericStatusBox
              text={info.getValue()}
              colorCode={info.row.original.loadStatusColorCode}
            />
          ),
          header: 'Status',
          enableSorting: true,
        }),
      ];

      return baseColumns;
    },
    [[data]] //eslint-disable-line
  );

  // const mobileColumns = useMemo(
  //   () => {
  //     const baseColumns = [
  //       columnHelper.accessor('facilityName', {
  //         cell: (info) => info.getValue(),
  //         header: 'Technician',
  //         enableSorting: false,
  //       }),
  //       columnHelper.accessor('meanAssetAge', {
  //         cell: (info) => info.getValue(),
  //         header: 'Skill Level',
  //         enableSorting: true,
  //       }),
  //      columnHelper.accessor('loadStatus', {
  //         cell: (info) => (
  //           <GenericStatusBox
  //             text={info.getValue()}
  //             colorCode={info.row.original.loadStatusColorCode}
  //           />
  //         ),
  //         header: 'Status',
  //         enableSorting: true,
  //       }),
  //     ];

  //     return baseColumns;
  //   },
  //   [[data?.data]] //eslint-disable-line
  // );

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
      minH="352px"
    >
      <CardHeader>Technician Load Distribution</CardHeader>

      <DataTable
        columns={columns}
        data={data?.data?.items ?? []}
        isLoading={isLoading}
        isFetching={isFetching}
        showFooter={data?.data ? data?.data?.totalPages > 1 : false}
        pageSize={pageSize}
        pageNumber={pageNumber}
        setPageNumber={setPageNumber}
        setPageSize={setPageSize}
        emptyLines={5}
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
        rowColorKey="loadStatusColorCode"
      />
    </VStack>
  );
};

export default TechnicianLoadDistribution;
