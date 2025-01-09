import { Flex, HStack, Text, VStack } from '@chakra-ui/react';
import React, { useMemo, useState } from 'react';
import CardHeader from '../Common/CardHeader';
import { DATE_PERIOD, DEFAULT_PAGE_SIZE } from '~/lib/utils/constants';
import { createColumnHelper } from '@tanstack/react-table';
import { MaintenanceSchedule } from '~/lib/interfaces/maintenance.interfaces';
import { dateFormatter } from '~/lib/utils/Formatters';
import Technician from '../../AssetManagement/Common/Technician';
import Status from '../../AssetManagement/Common/MaintenanceStatus';
import { useGetUpcomingMaintenanceQuery } from '~/lib/redux/services/dashboard.services';
import { useAppSelector } from '~/lib/redux/hooks';
import { Button, DataTable } from '@repo/ui/components';

const ContentDisplay = (
  content: string | React.ReactNode,
  color: string,
  maxW?: string
) => {
  return (
    <Text
      height="full"
      whiteSpace="normal"
      noOfLines={3}
      textOverflow="ellipsis"
      width={maxW ?? 'full'}
      {...(maxW ? { maxW } : {})}
      color={color}
    >
      {content}
    </Text>
  );
};

const UpcomingMaintenance = () => {
  const { selectedCountry, selectedState } = useAppSelector(
    (state) => state.dashboard.info
  );
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(DEFAULT_PAGE_SIZE);
  const { data, isLoading } = useGetUpcomingMaintenanceQuery({
    id: selectedCountry?.value,
    ...(selectedState?.value ? { regionId: selectedState?.value } : {}),
    pageSize,
    pageNumber: currentPage,
    datePeriod: DATE_PERIOD.WEEK,
  });
  const columnHelper = createColumnHelper<MaintenanceSchedule>();
  const columns = useMemo(
    () => [
      columnHelper.accessor('scheduledDate', {
        cell: (info) => {
          const value = info.getValue();
          if (value && !isNaN(new Date(value).getTime())) {
            return ContentDisplay(
              info.getValue() ? dateFormatter(value, 'D MMM, YYYY') : 'N/A',
              'neutral.600',
              '74px'
            );
          } else {
            return 'N/A';
          }
        },
        header: 'Date',
        enableSorting: false,
      }),
      columnHelper.accessor('assetId', {
        cell: () => ContentDisplay('Brand New Bike', 'black', '100px'),
        header: 'Asset',
        enableSorting: false,
      }),
      columnHelper.accessor('planName', {
        cell: (info) => ContentDisplay(info.getValue(), 'black', '128px'),
        header: 'Task',
        enableSorting: false,
      }),
      columnHelper.accessor('contactPerson', {
        cell: (info) =>
          !info.row.original.contactPerson &&
          !info.row.original.contactPersonEmail &&
          !info.row.original.contactPersonPhoneNo
            ? 'N/A'
            : Technician(info.row.original),
        header: 'Contact Person',
        enableSorting: false,
      }),
      columnHelper.accessor('maintenanceType', {
        cell: (info) => ContentDisplay(info.getValue(), 'neutral.600', '77px'),
        header: 'Type',
        enableSorting: false,
      }),
      columnHelper.accessor('currentStatus', {
        cell: (info) =>
          info.getValue() ? Status(info.getValue() as string) : 'N/A',
        header: 'Status',
        enableSorting: false,
      }),
    ],
    [data?.data?.items] //eslint-disable-line
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
    >
      <HStack width="full" justifyContent="space-between">
        <HStack width="full" alignItems="center">
          <CardHeader>Upcoming Maintenance</CardHeader>
          <Text
            color="neutral.800"
            py="6px"
            px="8px"
            rounded="4px"
            bgColor="neutral.200"
          >
            Next 7 days
          </Text>
        </HStack>
        <Button
          href="/maintenance/schedules"
          customStyles={{
            py: 0,
            height: '28px',
            width: '68px',
            fontSize: '12px',
            lineHeight: '14.26px',
          }}
        >
          View All
        </Button>
      </HStack>
      <Flex width="full" height="full" overflow="auto" maxH="280px">
        <DataTable
          columns={columns}
          data={data?.data?.items ?? []}
          isLoading={isLoading}
          pageSize={pageSize}
          pageNumber={currentPage}
          setPageNumber={setCurrentPage}
          setPageSize={setPageSize}
          emptyLines={3}
          customThStyle={{
            paddingLeft: '16px',
            paddingTop: '12px',
            paddingBottom: '12px',
            fontWeight: 700,
          }}
          customTdStyle={{
            paddingLeft: '16px',
            paddingTop: '16px',
            paddingBottom: '8px',
          }}
          customTBodyRowStyle={{ verticalAlign: 'top' }}
          customTableContainerStyle={{ rounded: 'none' }}
        />
      </Flex>
    </VStack>
  );
};

export default UpcomingMaintenance;
