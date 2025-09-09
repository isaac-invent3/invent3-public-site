/* eslint-disable no-unused-vars */
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { DataTable, FilterDisplay } from '@repo/ui/components';
import { createColumnHelper } from '@tanstack/react-table';
import { dateFormatter } from '~/lib/utils/Formatters';
import {
  MaintenanceScheduleInstance,
  ScheduleFilter,
} from '~/lib/interfaces/maintenance.interfaces';
import {
  DEFAULT_PAGE_SIZE,
  SYSTEM_CONTEXT_DETAILS,
} from '~/lib/utils/constants';
import {
  useGetAllScheduleInstanceQuery,
  useSearchScheduleInstanceMutation,
} from '~/lib/redux/services/maintenance/scheduleInstance.services';
import PopoverAction from './PopoverAction';
import { Flex, useDisclosure, useMediaQuery } from '@chakra-ui/react';
import useCustomSearchParams from '~/lib/hooks/useCustomSearchParams';
import TaskInstanceListView from '../../TaskManagement/Drawers/TaskListDrawer/TaskInstanceListView';
import { generateSearchCriteria } from '@repo/utils';
import { OPERATORS } from '@repo/constants';
import { ListResponse } from '@repo/interfaces';
import useCustomMutation from '~/lib/hooks/mutation.hook';
import _ from 'lodash';
import Filters from './Filters';
import { useAppDispatch, useAppSelector } from '~/lib/redux/hooks';
import { usePageFilter } from '~/lib/hooks/usePageFilter';
import { updateSelectedTableIds } from '~/lib/redux/slices/CommonSlice';

interface MaintenanceHistoryProp {
  search: string;
  openFilter: boolean;
}

const MaintenanceHistory = (props: MaintenanceHistoryProp) => {
  const { search, openFilter } = props;
  const columnHelper = createColumnHelper<MaintenanceScheduleInstance>();
  const [pageNumber, setPageNumber] = useState(1);
  const appConfigValues = useAppSelector(
    (state) => state.general.appConfigValues
  );
  const [pageSize, setPageSize] = useState(DEFAULT_PAGE_SIZE);

  const [isMobile] = useMediaQuery('(max-width: 768px)');
  const { getSearchParam, updateSearchParam } = useCustomSearchParams();
  const maintenanceScheduleInstanceId = getSearchParam(
    'maintenanceScheduleInstanceId'
  );
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { handleSubmit } = useCustomMutation();
  const [selectedRows, setSelectedRows] = useState<number[]>([]);
  const { selectedTableIds } = useAppSelector((state) => state.common);
  const dispatch = useAppDispatch();
  const [searchPlan, { isLoading: searchLoading }] =
    useSearchScheduleInstanceMutation({});
  const [searchData, setSearchData] = useState<
    ListResponse<MaintenanceScheduleInstance> | undefined
  >(undefined);

  const initialFilterData = {
    planType: [],
    maintenanceType: [],
    region: [],
    area: [],
    branch: [],
    scheduleDate: undefined,
    completionDate: undefined,
    statusId: [+appConfigValues?.DEFAULT_COMPLETED_TASK_STATUS_ID!],
  };

  const {
    filterData,
    setFilterData,
    appliedFilter,
    isFilterEmpty,
    applyFilter,
    clearFilter,
  } = usePageFilter<ScheduleFilter>(initialFilterData);

  const { data, isLoading, isFetching } = useGetAllScheduleInstanceQuery({
    pageSize,
    pageNumber,
    statusId: +appConfigValues?.DEFAULT_COMPLETED_TASK_STATUS_ID!,
  });

  const handleSearch = useCallback(async () => {
    const { orCriterion } = generateSearchCriteria(
      search,
      appliedFilter,
      {
        maintenanceType: {
          key: 'maintenanceTypeId',
          operator: OPERATORS.Equals,
        },

        statusId: { key: 'currentStatusId', operator: OPERATORS.Equals },
        region: { key: 'stateId', operator: OPERATORS.Equals },
        area: { key: 'lgaId', operator: OPERATORS.Equals },
        branch: { key: 'facilityId', operator: OPERATORS.Equals },
        scheduleDate: { key: 'scheduleDate', operator: OPERATORS.Contains },
        completionDate: { key: 'completionDate', operator: OPERATORS.Contains },
      },
      ['scheduleInstanceName']
    );
    const payload = {
      pageNumber,
      pageSize,
      orCriterion,
    };

    if (orCriterion.length > 0) {
      const response = await handleSubmit(searchPlan, payload, '');
      setSearchData(response?.data?.data);
    }
  }, [searchPlan, search, appliedFilter, pageNumber, pageSize]);

  // Trigger search when search or input changes or applied filter changes or pagination updates
  useEffect(() => {
    if (search || !isFilterEmpty) {
      handleSearch();
    }
  }, [search, appliedFilter, pageNumber, pageSize]);

  // Reset pagination when clearing the search
  useEffect(() => {
    if (!search || isFilterEmpty) {
      setPageSize(DEFAULT_PAGE_SIZE);
      setPageNumber(1);
    }
  }, [search, appliedFilter]);

  useEffect(() => {
    if (maintenanceScheduleInstanceId) {
      onOpen();
    }
  }, [maintenanceScheduleInstanceId]);

  // Reset Selected Row when SelectedIds array is emptied
  useEffect(() => {
    if (selectedTableIds.length === 0 && selectedRows.length > 0) {
      setSelectedRows([]);
    }
  }, [selectedTableIds]);

  // Update selectedTableIds array when selected row is greater than 1
  useEffect(() => {
    if (selectedRows.length > 0) {
      const sourceItems = searchData?.items || data?.data?.items || [];
      const scheduleInstanceIds = selectedRows
        .map((rowId) => sourceItems[rowId]?.scheduleInstanceId) // Access by index and get id
        .filter((id): id is number => id !== undefined); // Filter out undefined values
      dispatch(updateSelectedTableIds(scheduleInstanceIds));
    }
    if (selectedRows.length === 0) {
      // Reset selectedTableIds when no rows are selected
      dispatch(updateSelectedTableIds([]));
    }
  }, [selectedRows]);

  const mobileColumns = useMemo(
    () => {
      const baseColumns = [
        columnHelper.accessor('maintenancePlanId', {
          cell: (info) => info.getValue() ?? 'N/A',
          header: 'Plan ID',
          enableSorting: false,
        }),
        columnHelper.accessor('planName', {
          cell: (info) => info.getValue() ?? 'N/A',
          header: 'Plan Name',
          enableSorting: false,
        }),
        columnHelper.accessor('maintenanceType', {
          cell: (info) => info.getValue() ?? 'N/A',
          header: 'Maintenance Type',
          enableSorting: false,
        }),
        columnHelper.accessor('scheduleInstanceName', {
          cell: (info) => info.getValue(),
          header: 'Schedule Name',
          enableSorting: false,
        }),
        columnHelper.accessor('rowId', {
          cell: (info) => PopoverAction(info.row.original),

          header: '',
          enableSorting: false,
        }),
      ];

      return baseColumns;
    },
    [data?.data?.items] //eslint-disable-line
  );

  const columns = useMemo(
    () => {
      const baseColumns = [
        columnHelper.accessor('maintenancePlanId', {
          cell: (info) => info.getValue() ?? 'N/A',
          header: 'Plan ID',
          enableSorting: false,
        }),
        columnHelper.accessor('planName', {
          cell: (info) => info.getValue() ?? 'N/A',
          header: 'Plan Name',
          enableSorting: false,
        }),
        columnHelper.accessor('scheduleInstanceName', {
          cell: (info) => info.getValue(),
          header: 'Plan Type',
          enableSorting: false,
        }),
        columnHelper.accessor('maintenanceType', {
          cell: (info) => info.getValue() ?? 'N/A',
          header: 'Maintenance Type',
          enableSorting: false,
        }),
        columnHelper.accessor('assetName', {
          cell: (info) => info.getValue(),
          header: 'Asset Name',
          enableSorting: false,
        }),
        columnHelper.accessor('scheduleInstanceId', {
          cell: (info) => info.getValue(),
          header: 'Schedule ID',
          enableSorting: false,
        }),
        columnHelper.accessor('scheduleInstanceName', {
          cell: (info) => info.getValue(),
          header: 'Schedule Name',
          enableSorting: false,
        }),
        columnHelper.accessor('scheduledDate', {
          cell: (info) => {
            const value = info.getValue();
            if (value && !isNaN(new Date(value).getTime())) {
              return dateFormatter(value, 'DD / MM / YYYY');
            } else {
              return 'N/A';
            }
          },
          header: 'Start Date',
          enableSorting: false,
        }),
        columnHelper.accessor('completionDate', {
          cell: (info) => {
            const value = info.getValue();
            if (value && !isNaN(new Date(value).getTime())) {
              return dateFormatter(value, 'DD / MM / YYYY');
            } else {
              return 'N/A';
            }
          },
          header: 'End Date',
          enableSorting: false,
        }),
        columnHelper.accessor('rowId', {
          cell: (info) => PopoverAction(info.row.original),

          header: '',
          enableSorting: false,
        }),
      ];

      return baseColumns;
    },
    [data?.data?.items] //eslint-disable-line
  );
  return (
    <Flex width="full" direction="column" mt="24px">
      {openFilter && (
        <Flex width="full" mb="16px">
          <FilterDisplay isOpen={openFilter}>
            <Filters
              filterData={filterData}
              setFilterData={setFilterData}
              onApply={() => {
                applyFilter();
                handleSearch(); // manually trigger
              }}
              onClear={() => {
                clearFilter();
                handleSearch(); // to reload default data
              }}
            />
          </FilterDisplay>
        </Flex>
      )}
      <DataTable
        columns={isMobile ? mobileColumns : columns}
        data={
          (search || !isFilterEmpty) && searchData
            ? searchData.items
            : (data?.data?.items ?? [])
        }
        totalPages={
          (search || !isFilterEmpty) && searchData
            ? searchData?.totalPages
            : data?.data?.totalPages
        }
        isLoading={isLoading}
        isFetching={isFetching || searchLoading}
        setPageNumber={setPageNumber}
        pageNumber={pageNumber}
        pageSize={pageSize}
        setPageSize={setPageSize}
        emptyLines={25}
        isSelectable={true}
        selectedRows={selectedRows}
        setSelectedRows={setSelectedRows}
        handleSelectRow={(row) =>
          updateSearchParam(
            SYSTEM_CONTEXT_DETAILS.MAINTENANCE_SCHEDULE_INSTANCE.slug,
            row?.scheduleInstanceId
          )
        }
        maxTdWidth="200px"
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
      {maintenanceScheduleInstanceId && (
        <TaskInstanceListView
          isOpen={isOpen}
          onClose={onClose}
          scheduleId={+maintenanceScheduleInstanceId}
          showPopover={false}
        />
      )}
    </Flex>
  );
};

export default MaintenanceHistory;
