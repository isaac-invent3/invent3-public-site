import { Flex } from '@chakra-ui/react';
import _ from 'lodash';
import { createColumnHelper } from '@tanstack/react-table';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import DataTable from '~/lib/components/UI/Table';
import {
  MaintenancePlan,
  PlanFilter,
} from '~/lib/interfaces/maintenance.interfaces';
import {
  useGetAllMaintenancePlanQuery,
  useSearchMaintenancePlanMutation,
} from '~/lib/redux/services/maintenance/plan.services';
import { dateFormatter } from '~/lib/utils/Formatters';
import PopoverAction from './PopoverAction';
import { DEFAULT_PAGE_SIZE, OPERATORS } from '~/lib/utils/constants';
import Filters from './Filters';
import { SearchResponse } from '~/lib/interfaces/general.interfaces';
import { generateSearchCriterion } from '~/lib/utils/helperFunctions';
import useCustomMutation from '~/lib/hooks/mutation.hook';
import FilterDisplay from '../../UI/Filter/FilterDisplay';

export const initialFilterData = {
  planType: [],
  region: [],
  area: [],
  branch: [],
};

interface PlansProp {
  search: string;
  openFilter: boolean;
}

const Plans = (props: PlansProp) => {
  const { search, openFilter } = props;
  const [filterData, setFilterData] = useState<PlanFilter>(initialFilterData);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(DEFAULT_PAGE_SIZE);
  const { data, isLoading, isFetching } = useGetAllMaintenancePlanQuery({
    pageSize,
    pageNumber: currentPage,
  });
  const { handleSubmit } = useCustomMutation();

  // Checks if all filterdata is empty
  const isFilterEmpty = _.every(
    filterData,
    (value) => _.isArray(value) && _.isEmpty(value)
  );

  const [searchPlan, { isLoading: searchLoading }] =
    useSearchMaintenancePlanMutation({});
  const [searchData, setSearchData] = useState<SearchResponse | null>(null);

  // Search Criterion
  const searchCriterion = {
    ...(search
      ? {
          criterion: [
            {
              columnName: 'planName',
              columnValue: search,
              operation: OPERATORS.Contains,
            },
          ],
        }
      : {}),
    ...(!isFilterEmpty
      ? {
          orCriterion: [
            ...(filterData.planType.map((item) => item.value).length > 0
              ? [
                  generateSearchCriterion(
                    'planTypeId',
                    filterData.planType.map((item) => item.value),
                    OPERATORS.Equals
                  ),
                ]
              : []),

            ...(filterData.region.map((item) => item.value).length > 0
              ? [
                  generateSearchCriterion(
                    'stateId',
                    filterData.region.map((item) => item.value),
                    OPERATORS.Equals
                  ),
                ]
              : []),
            ...(filterData.area.map((item) => item.value).length > 0
              ? [
                  generateSearchCriterion(
                    'lgaId',
                    filterData.area.map((item) => item.value),
                    OPERATORS.Equals
                  ),
                ]
              : []),
            ...(filterData.branch.map((item) => item.value).length > 0
              ? [
                  generateSearchCriterion(
                    'facilityId',
                    filterData.branch.map((item) => item.value),
                    OPERATORS.Equals
                  ),
                ]
              : []),
          ],
        }
      : {}),
    pageNumber: currentPage,
    pageSize: pageSize,
  };

  // Function that handles search/filters
  const handleSearch = useCallback(async () => {
    if (search || !isFilterEmpty) {
      const response = await handleSubmit(searchPlan, searchCriterion, '');
      setSearchData(response?.data?.data);
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
    if (!search && isFilterEmpty) {
      setPageSize(DEFAULT_PAGE_SIZE);
      setCurrentPage(1);
    }
  }, [search, isFilterEmpty]);

  const columnHelper = createColumnHelper<MaintenancePlan>();
  const columns = useMemo(
    () => [
      columnHelper.accessor('maintenancePlanId', {
        cell: (info) => info.getValue(),
        header: '#',
        enableSorting: false,
      }),
      columnHelper.accessor('planName', {
        cell: (info) => info.getValue(),
        header: 'Plan Name',
        enableSorting: false,
      }),
      columnHelper.accessor('planTypeName', {
        cell: (info) => info.getValue(),
        header: 'Plan Type',
        enableSorting: false,
      }),
      columnHelper.accessor('activeSchedules', {
        cell: (info) => info.getValue(),
        header: 'Total Schedules',
        enableSorting: false,
      }),
      columnHelper.accessor('startDate', {
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
      columnHelper.accessor('endDate', {
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
      columnHelper.accessor('planStatusName', {
        cell: (info) => info.getValue(),
        header: 'Status',
        enableSorting: false,
      }),
      columnHelper.accessor('dateCreated', {
        cell: (info) => {
          const value = info.getValue();
          if (value && !isNaN(new Date(value).getTime())) {
            return dateFormatter(value, 'DD / MM / YYYY');
          } else {
            return 'N/A';
          }
        },
        header: 'Created Date',
        enableSorting: false,
      }),
      columnHelper.accessor('rowId', {
        cell: (info) => PopoverAction(info.row.original),
        header: '',
        enableSorting: false,
      }),
    ],
    [[data?.data?.items]] //eslint-disable-line
  );

  return (
    <Flex direction="column" pt="16px">
      <Flex width="full" mb="8px">
        <FilterDisplay isOpen={openFilter}>
          {openFilter && (
            <Filters
              filterData={filterData}
              setFilterData={setFilterData}
              handleApplyFilter={handleSearch}
            />
          )}
        </FilterDisplay>
      </Flex>
      <DataTable
        columns={columns}
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
        showFooter={true}
        emptyLines={15}
        isSelectable={false}
        isLoading={isLoading}
        isFetching={isFetching || searchLoading}
        pageNumber={currentPage}
        setPageNumber={setCurrentPage}
        pageSize={pageSize}
        setPageSize={setPageSize}
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
        customTableContainerStyle={{ rounded: 'none' }}
      />
    </Flex>
  );
};

export default Plans;
