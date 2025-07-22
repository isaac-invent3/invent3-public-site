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
import { generateSearchCriterion } from '@repo/utils';
import { OPERATORS } from '@repo/constants';
import { ListResponse } from '@repo/interfaces';
import useCustomMutation from '~/lib/hooks/mutation.hook';
import _ from 'lodash';
import Filters from './Filters';
import { useAppSelector } from '~/lib/redux/hooks';

export const initialFilterData = {
  planType: [],
  maintenanceType: [],
  region: [],
  area: [],
  branch: [],
  scheduleDate: undefined,
  completionDate: undefined,
};

interface MaintenanceHistoryProp {
  search: string;
  openFilter: boolean;
}

const MaintenanceHistory = (props: MaintenanceHistoryProp) => {
  const { search, openFilter } = props;
  const columnHelper = createColumnHelper<MaintenanceScheduleInstance>();
  const [currentPage, setCurrentPage] = useState(1);
  const appConfigValues = useAppSelector(
    (state) => state.general.appConfigValues
  );
  const [pageSize, setPageSize] = useState(DEFAULT_PAGE_SIZE);
  const { data, isLoading, isFetching } = useGetAllScheduleInstanceQuery({
    pageSize,
    pageNumber: currentPage,
    statusId: +appConfigValues?.DEFAULT_COMPLETED_TASK_STATUS_ID!,
  });
  const [isMobile] = useMediaQuery('(max-width: 768px)');
  const [filterData, setFilterData] =
    useState<ScheduleFilter>(initialFilterData);
  const { getSearchParam, updateSearchParam } = useCustomSearchParams();
  const maintenanceScheduleInstanceId = getSearchParam(
    'maintenanceScheduleInstanceId'
  );
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { handleSubmit } = useCustomMutation();

  // Checks if all filterdata is empty
  const isFilterEmpty = _.every(
    filterData,
    (value) => _.isArray(value) && _.isEmpty(value)
  );

  const [searchPlan, { isLoading: searchLoading }] =
    useSearchScheduleInstanceMutation({});
  const [searchData, setSearchData] =
    useState<ListResponse<MaintenanceScheduleInstance> | null>(null);

  // Search Criterion
  const searchCriterion = {
    ...(search && {
      criterion: [
        {
          columnName: 'scheduleInstanceName',
          columnValue: search,
          operation: OPERATORS.Contains,
        },
      ],
    }),
    ...((!isFilterEmpty || search) && {
      orCriterion: [
        ...(filterData.planType && filterData.planType.length >= 1
          ? [
              generateSearchCriterion(
                'planTypeId',
                filterData.planType.map((item) => item.value),
                OPERATORS.Equals
              ),
            ]
          : []),
        ...(filterData.maintenanceType && filterData.maintenanceType.length >= 1
          ? [
              generateSearchCriterion(
                'maintenanceTypeId',
                filterData.maintenanceType.map((item) => item.value),
                OPERATORS.Equals
              ),
            ]
          : []),
        ...(filterData.region && filterData.region.length >= 1
          ? [
              generateSearchCriterion(
                'stateId',
                filterData.region.map((item) => item.value),
                OPERATORS.Equals
              ),
            ]
          : []),
        ...(filterData.area && filterData.area.length >= 1
          ? [
              generateSearchCriterion(
                'lgaId',
                filterData.area.map((item) => item.value),
                OPERATORS.Equals
              ),
            ]
          : []),
        ...(filterData.branch && filterData.branch.length >= 1
          ? [
              generateSearchCriterion(
                'facilityId',
                filterData.branch.map((item) => item.value),
                OPERATORS.Equals
              ),
            ]
          : []),
        ...[filterData.scheduleDate]
          .filter(Boolean)
          .map((item) => [
            ...generateSearchCriterion(
              'scheduleDate',
              [item as string],
              OPERATORS.Contains
            ),
          ]),
        ...[filterData.completionDate]
          .filter(Boolean)
          .map((item) => [
            ...generateSearchCriterion(
              'completionDate',
              [item as string],
              OPERATORS.Contains
            ),
          ]),
      ],
    }),
    pageNumber: currentPage,
    pageSize: pageSize,
  };

  // Function that handles search/filters
  const handleSearch = useCallback(async () => {
    if (search || !isFilterEmpty) {
      const response = await handleSubmit(searchPlan, searchCriterion, '');
      response?.data?.data && setSearchData(response?.data?.data);
    }
  }, [searchPlan, searchCriterion]);

  // Trigger search when search input changes or pagination updates
  useEffect(() => {
    if (search) {
      handleSearch();
    }
  }, [search, currentPage, pageSize]);

  // Reset pagination when the search input is cleared or apply filter flag is false
  useEffect(() => {
    setPageSize(DEFAULT_PAGE_SIZE);
    setCurrentPage(1);
  }, [search, isFilterEmpty]);

  useEffect(() => {
    if (maintenanceScheduleInstanceId) {
      onOpen();
    }
  }, [maintenanceScheduleInstanceId]);

  //Handle apply Filter
  const handleApplyFilter = () => {
    setCurrentPage(1);
    setPageSize(DEFAULT_PAGE_SIZE);
    handleSearch();
  };

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
              handleApplyFilter={handleApplyFilter}
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
        setPageNumber={setCurrentPage}
        pageNumber={currentPage}
        pageSize={pageSize}
        setPageSize={setPageSize}
        emptyLines={25}
        isSelectable={false}
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
