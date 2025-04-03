import { Flex, Text, useDisclosure, useMediaQuery } from '@chakra-ui/react';
import { createColumnHelper } from '@tanstack/react-table';
import React, { useEffect, useMemo, useState } from 'react';
import { amountFormatter, dateFormatter } from '~/lib/utils/Formatters';
import { MaintenanceSchedule } from '~/lib/interfaces/maintenance.interfaces';
import { useGetMaintenanceHistoryByAssetIdQuery } from '~/lib/redux/services/asset/general.services';
import { useAppSelector } from '~/lib/redux/hooks';
import { DataTable } from '@repo/ui/components';
import Technician from '../../../Common/Technician';
import Status from '../../../Common/MaintenanceStatus';
import {
  DEFAULT_PAGE_SIZE,
  SYSTEM_CONTEXT_DETAILS,
} from '~/lib/utils/constants';
import MaintenanceScheduleDrawer from '~/lib/components/Maintenance/Schedules/Timeline/MaintenanceScheduleDrawer';
import useCustomSearchParams from '~/lib/hooks/useCustomSearchParams';

const Description = (description: string | null) => {
  return (
    <Text
      height="full"
      whiteSpace="normal"
      noOfLines={3}
      textOverflow="ellipsis"
      width="full"
      maxW="217px"
    >
      {description}
    </Text>
  );
};

const HistoryTab = () => {
  const assetData = useAppSelector((state) => state.asset.asset);

  if (!assetData) {
    return null;
  }
  const { assetId } = assetData;
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(DEFAULT_PAGE_SIZE);
  const { data, isLoading } = useGetMaintenanceHistoryByAssetIdQuery(
    { id: assetId, pageSize, pageNumber: currentPage },
    { skip: !assetId }
  );
  const columnHelper = createColumnHelper<MaintenanceSchedule>();
  const [isMobile] = useMediaQuery('(max-width: 768px)');
  const { clearSearchParamsAfter, getSearchParam, updateSearchParam } =
    useCustomSearchParams();
  const maintenanceScheduleInstanceId = getSearchParam(
    SYSTEM_CONTEXT_DETAILS.MAINTENANCE_SCHEDULE_INSTANCE.slug
  );
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    if (maintenanceScheduleInstanceId) {
      onOpen();
    }
  }, [maintenanceScheduleInstanceId]);

  const mobileColumns = useMemo(
    () => [
      columnHelper.accessor('assetId', {
        cell: (info) => info.getValue(),
        header: '#',
        enableSorting: false,
      }),
      columnHelper.accessor('completionDate', {
        cell: (info) => {
          const value = info.getValue();
          if (value && !isNaN(new Date(value).getTime())) {
            return dateFormatter(value, 'YYYY-MM-DD');
          } else {
            return 'N/A';
          }
        },
        header: 'Date',
        enableSorting: false,
      }),
      columnHelper.accessor('maintenanceType', {
        cell: (info) => info.getValue() ?? 'N/A',
        header: 'Maintenance Type',
        enableSorting: false,
      }),
      columnHelper.accessor('totalCost', {
        cell: (info) => amountFormatter(info.getValue() ?? 0),
        header: 'Cost',
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

  const columns = useMemo(
    () => [
      columnHelper.accessor('assetId', {
        cell: (info) => info.getValue(),
        header: '#',
        enableSorting: false,
      }),
      columnHelper.accessor('completionDate', {
        cell: (info) => {
          const value = info.getValue();
          if (value && !isNaN(new Date(value).getTime())) {
            return dateFormatter(value, 'YYYY-MM-DD');
          } else {
            return 'N/A';
          }
        },
        header: 'Date',
        enableSorting: false,
      }),
      columnHelper.accessor('maintenanceType', {
        cell: (info) => info.getValue() ?? 'N/A',
        header: 'Maintenance Type',
        enableSorting: false,
      }),
      columnHelper.accessor('comments', {
        cell: (info) =>
          info.getValue() ? Description(info.getValue()) : 'N/A',
        header: 'Description',
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
      columnHelper.accessor('totalCost', {
        cell: (info) => amountFormatter(info.getValue() ?? 0),
        header: 'Cost',
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
    <Flex width="full" my="23px">
      <DataTable
        columns={isMobile ? mobileColumns : columns}
        data={data?.data?.items ?? []}
        isLoading={isLoading}
        pageSize={pageSize}
        pageNumber={currentPage}
        setPageNumber={setCurrentPage}
        setPageSize={setPageSize}
        // handleSelectRow={(row) => {
        //           if (row) {
        //             updateSearchParam(
        //               SYSTEM_CONTEXT_DETAILS.MAINTENANCE_SCHEDULE_INSTANCE.slug,
        //               row.scheduleInstanceId
        //             );
        //           }
        //         }}
        customThStyle={{
          paddingLeft: '16px',
          paddingTop: '8px',
          paddingBottom: '8px',
          fontWeight: 500,
        }}
        customTdStyle={{
          paddingLeft: '16px',
          paddingTop: '16px',
          paddingBottom: '8px',
        }}
        customTBodyRowStyle={{ verticalAlign: 'top' }}
      />
      <MaintenanceScheduleDrawer
        isOpen={isOpen}
        onClose={() => {
          clearSearchParamsAfter(
            SYSTEM_CONTEXT_DETAILS.MAINTENANCE_SCHEDULE_INSTANCE.slug,
            { removeSelf: true }
          );
          onClose();
        }}
        scheduleInstanceId={
          maintenanceScheduleInstanceId ? +maintenanceScheduleInstanceId : null
        }
      />
    </Flex>
  );
};

export default HistoryTab;
