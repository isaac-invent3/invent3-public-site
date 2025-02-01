import { Flex, HStack } from '@chakra-ui/react';
import { createColumnHelper } from '@tanstack/react-table';
import React, { useEffect, useMemo, useState } from 'react';
import { DataTable, FormSectionInfo } from '@repo/ui/components';
import { MaintenanceSchedule } from '~/lib/interfaces/maintenance.interfaces';
import { useAppSelector } from '~/lib/redux/hooks';
import { dateFormatter } from '~/lib/utils/Formatters';
import { useGetAllMaintenanceScheduleByAssetIdQuery } from '~/lib/redux/services/maintenance/schedule.services';
import InfoCard from '~/lib/components/UI/InfoCard';
import { ErrorMessage } from '@repo/ui/components';
import { useField } from 'formik';
import { DEFAULT_PAGE_SIZE } from '~/lib/utils/constants';

const AssetSchedules = () => {
  const { assetId, scheduleId } = useAppSelector(
    (state) => state.task.taskForm
  );
  const [selectedRows, setSelectedRows] = useState<number[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(DEFAULT_PAGE_SIZE);
  const { data, isLoading, isFetching } =
    useGetAllMaintenanceScheduleByAssetIdQuery(
      {
        id: assetId!,
        pageSize,
        pageNumber: currentPage,
      },
      { skip: !assetId }
    );
  // eslint-disable-next-line no-unused-vars
  const [field, meta, helpers] = useField('scheduleId');

  const columnHelper = createColumnHelper<MaintenanceSchedule>();
  const columns = useMemo(
    () => [
      columnHelper.accessor('scheduleId', {
        cell: (info) => info.getValue(),
        header: '#',
        enableSorting: false,
      }),
      columnHelper.accessor('scheduleName', {
        cell: (info) => info.getValue() ?? 'N/A',
        header: 'Schedule',
        enableSorting: false,
      }),
      columnHelper.accessor('maintenanceType', {
        cell: (info) => info.getValue() ?? 'N/A',
        header: 'Type',
        enableSorting: false,
      }),
      columnHelper.accessor('frequencyName', {
        cell: (info) => info.getValue() ?? 'N/A',
        header: 'Frequency',
        enableSorting: false,
      }),
      columnHelper.accessor('scheduledDate', {
        cell: (info) =>
          dateFormatter(info.getValue(), 'DD / MM / YYYY hh:mmA') ?? 'N/A',
        header: 'Start Date and Time',
        enableSorting: false,
      }),
      columnHelper.accessor('occurrences', {
        cell: (info) => info.getValue() ?? 'N/A',
        header: 'No of Occurence',
        enableSorting: false,
      }),

      columnHelper.accessor('activeTasksCount', {
        cell: (info) => info.getValue() ?? 'N/A',
        header: 'No. Of Tasks',
        enableSorting: false,
      }),
    ],
    [[data?.data?.items]] //eslint-disable-line
  );

  useEffect(() => {
    if (selectedRows.length >= 1) {
      const schedule = data?.data?.items[selectedRows?.[0] as number];
      if (schedule) {
        helpers.setValue(schedule.scheduleId);
      }
    } else {
      helpers.setValue(null);
    }
  }, [selectedRows]);

  // Set selected row as the current Schedule Id on Edit mode
  useEffect(() => {
    if (data?.data?.items && scheduleId) {
      const items: MaintenanceSchedule[] = data?.data?.items;

      const scheduleIndex = items.findIndex(
        (value) => value.scheduleId === scheduleId
      );
      if (scheduleIndex > 0) {
        setSelectedRows([scheduleIndex]);
      }
    }
  }, [data?.data?.items]);

  return (
    <HStack width="full" alignItems="flex-start" spacing="47px">
      <Flex width="full" maxW="141px">
        <FormSectionInfo
          title="Select a Schedule"
          info="Plans attached to the selected asset"
          isRequired
        />
      </Flex>
      <Flex direction="column" width="full" gap="8px">
        <DataTable
          columns={columns}
          data={data?.data?.items ?? []}
          showFooter={true}
          emptyLines={2}
          isSelectable={true}
          hideSelectAllCheckBox={true}
          isLoading={isLoading}
          isFetching={isFetching}
          pageNumber={currentPage}
          setPageNumber={setCurrentPage}
          pageSize={pageSize}
          setPageSize={setPageSize}
          totalPages={data?.data?.totalPages}
          selectedRows={selectedRows}
          setSelectedRows={setSelectedRows}
          selectMultipleRows={false}
          showEmptyState={false}
          customThStyle={{
            paddingLeft: '16px',
            paddingTop: '17px',
            paddingBottom: '17px',
            fontWeight: 700,
          }}
          customTdStyle={{
            paddingLeft: '16px',
            paddingTop: '16px',
            paddingBottom: '16px',
          }}
          customTBodyRowStyle={{ verticalAlign: 'top' }}
        />

        {data?.data && data?.data?.items.length > 0 && (
          <InfoCard
            infoText="A task must be added to a schedule when created"
            customStyle={{ width: 'max-content' }}
          />
        )}
        {meta.touched && meta.error !== undefined && (
          <ErrorMessage>{meta.error}</ErrorMessage>
        )}
      </Flex>
    </HStack>
  );
};

export default AssetSchedules;
