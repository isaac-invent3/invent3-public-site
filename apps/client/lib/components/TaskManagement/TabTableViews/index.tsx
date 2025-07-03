import { Flex } from '@chakra-ui/react';
import { ListResponse } from '@repo/interfaces';
import { generateSearchCriterion } from '@repo/utils';
import _ from 'lodash';
import React, { useCallback, useEffect, useState } from 'react';
import useCustomMutation from '~/lib/hooks/mutation.hook';
import {
  LocationFilter,
  SearchCriterion,
} from '~/lib/interfaces/general.interfaces';
import { TaskInstance } from '~/lib/interfaces/task.interfaces';
import { useSearchTaskInstancesMutation } from '~/lib/redux/services/task/instance.services';
import { DEFAULT_PAGE_SIZE, OPERATORS } from '~/lib/utils/constants';
import TaskInstanceTable from '../Tables/TaskInstanceTable';
import Filters from './Filters';

export const initialFilterData = {
  region: [],
  area: [],
  branch: [],
};

interface TabTableViewProps {
  search: string;
  openFilter: boolean;
  activeFilter: 'bulk' | 'general' | null;
  data: ListResponse<TaskInstance> | undefined;
  isLoading: boolean;
  isFetching: boolean;
  pageSize: number;
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  setPageSize: React.Dispatch<React.SetStateAction<number>>;
  specificSearchCriterion: SearchCriterion;
  selectedRows?: number[];
  setSelectedRows?: React.Dispatch<React.SetStateAction<number[]>>;
  // eslint-disable-next-line no-unused-vars
  handleSelectRow?: (row: TaskInstance) => void;
}

const TabTableView = (props: TabTableViewProps) => {
  const {
    data,
    search,
    openFilter,
    activeFilter,
    isLoading,
    isFetching,
    pageSize,
    currentPage,
    setCurrentPage,
    setPageSize,
    specificSearchCriterion,
    selectedRows,
    handleSelectRow,
    setSelectedRows,
  } = props;
  const [filterData, setFilterData] =
    useState<LocationFilter>(initialFilterData);
  const { handleSubmit } = useCustomMutation();
  const [selectedTaskIds, setSelectedTaskIds] = useState<number[]>([]);

  // Checks if all filterdata is empty
  const isFilterEmpty = _.every(
    filterData,
    (value) => _.isArray(value) && _.isEmpty(value)
  );

  const [searchPlan, { isLoading: searchLoading }] =
    useSearchTaskInstancesMutation({});
  const [searchData, setSearchData] =
    useState<ListResponse<TaskInstance> | null>(null);

  // Search Criterion
  const searchCriterion = {
    ...(search && {
      criterion: [
        {
          columnName: 'taskInstanceName',
          columnValue: search,
          operation: OPERATORS.Contains,
        },
        specificSearchCriterion,
      ],
    }),
    ...(!isFilterEmpty && {
      orCriterion: [
        ...filterData.region.map((item) => [
          ...generateSearchCriterion('stateId', [item.value], OPERATORS.Equals),
        ]),
        ...filterData.area.map((item) => [
          ...generateSearchCriterion('lgaId', [item.value], OPERATORS.Equals),
        ]),
        ...filterData.branch.map((item) => [
          ...generateSearchCriterion(
            'facilityId',
            [item.value],
            OPERATORS.Equals
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
    if (!search && isFilterEmpty) {
      setPageSize(DEFAULT_PAGE_SIZE);
      setCurrentPage(1);
    }
  }, [search, isFilterEmpty]);

  useEffect(() => {
    if (selectedRows && selectedRows.length > 0) {
      const sourceItems = searchData?.items || data?.items || [];

      const taskInstanceIds = selectedRows
        .map((rowId) => sourceItems[rowId]?.taskInstanceId)
        .filter((id): id is number => id !== undefined);

      setSelectedTaskIds(taskInstanceIds);
    }
  }, [selectedRows]);

  return (
    <Flex width="full" direction="column" mt="16px">
      <Flex width="full" mb="16px">
        <Filters
          filterData={filterData}
          setFilterData={setFilterData}
          handleApplyFilter={handleSearch}
          activeFilter={activeFilter}
          isOpen={openFilter}
          selectedTaskIds={selectedTaskIds ?? []}
        />
      </Flex>
      <TaskInstanceTable
        data={
          (search || !isFilterEmpty) && searchData
            ? searchData.items
            : (data?.items ?? [])
        }
        totalPages={
          (search || !isFilterEmpty) && searchData
            ? searchData?.totalPages
            : data?.totalPages
        }
        isLoading={isLoading}
        isFetching={isFetching || searchLoading}
        setPageNumber={setCurrentPage}
        pageNumber={currentPage}
        pageSize={pageSize}
        setPageSize={setPageSize}
        isSortable={true}
        emptyLines={25}
        type="page"
        isSelectable
        handleSelectRow={handleSelectRow}
        selectedRows={selectedRows}
        setSelectedRows={setSelectedRows}
      />
    </Flex>
  );
};

export default TabTableView;
