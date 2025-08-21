import { Flex } from '@chakra-ui/react';
import { ListResponse } from '@repo/interfaces';
import { generateSearchCriteria, generateSearchCriterion } from '@repo/utils';
import _ from 'lodash';
import React, { useCallback, useEffect, useState } from 'react';
import useCustomMutation from '~/lib/hooks/mutation.hook';
import { SearchCriterion } from '~/lib/interfaces/general.interfaces';
import { TaskFilter, TaskInstance } from '~/lib/interfaces/task.interfaces';
import { useSearchTaskInstancesMutation } from '~/lib/redux/services/task/instance.services';
import { DEFAULT_PAGE_SIZE, OPERATORS } from '~/lib/utils/constants';
import TaskInstanceTable from '../Tables/TaskInstanceTable';
import Filters from './Filters';
import { usePageFilter } from '~/lib/hooks/usePageFilter';

export const initialFilterData = {
  region: [],
  area: [],
  branch: [],
  users: [],
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
  const { handleSubmit } = useCustomMutation();
  const [selectedTaskIds, setSelectedTaskIds] = useState<number[]>([]);
  const [searchTask, { isLoading: searchLoading }] =
    useSearchTaskInstancesMutation({});
  const [searchData, setSearchData] = useState<
    ListResponse<TaskInstance> | undefined
  >(undefined);

  const {
    filterData,
    setFilterData,
    appliedFilter,
    isFilterEmpty,
    applyFilter,
    clearFilter,
  } = usePageFilter<TaskFilter>(initialFilterData);

  const handleSearch = useCallback(async () => {
    const { orCriterion } = generateSearchCriteria(
      search,
      appliedFilter,
      {
        users: {
          key: 'assignedToEmployeeId',
          operator: OPERATORS.Equals,
        },
        region: { key: 'stateId', operator: OPERATORS.Equals },
        area: { key: 'lgaId', operator: OPERATORS.Equals },
        branch: { key: 'facilityId', operator: OPERATORS.Equals },
      },
      []
    );
    const finalOrCriterion = [
      ...orCriterion,
      ...(specificSearchCriterion ? [[specificSearchCriterion]] : []),
      ...(search
        ? [
            [
              {
                columnName: 'taskInstanceName',
                columnValue: search,
                operation: OPERATORS.Contains,
              },
              ...(!isNaN(Number(search))
                ? [
                    'taskInstanceId',
                    'scheduleInstanceId',
                    'assignedToEmployeeId',
                  ].map((item) => ({
                    columnName: item,
                    columnValue: search,
                    operation: OPERATORS.Equals,
                  }))
                : []),
            ],
          ]
        : []),
    ];
    const payload = {
      pageNumber: currentPage,
      pageSize,
      orCriterion: finalOrCriterion,
    };

    if (finalOrCriterion.length > 0) {
      const response = await handleSubmit(searchTask, payload, '');
      setSearchData(response?.data?.data);
    }
  }, [searchTask, search, appliedFilter, currentPage, pageSize]);

  // Trigger search when search or input changes or applied filter changes or pagination updates
  useEffect(() => {
    if (search || !isFilterEmpty) {
      handleSearch();
    }
  }, [search, appliedFilter, currentPage, pageSize]);

  // Reset pagination when clearing the search
  useEffect(() => {
    if (!search || isFilterEmpty) {
      setPageSize(DEFAULT_PAGE_SIZE);
      setCurrentPage(1);
    }
  }, [search, appliedFilter]);

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
          onApply={() => {
            applyFilter();
            handleSearch(); // manually trigger
          }}
          onClear={() => {
            clearFilter();
            handleSearch(); // to reload default data
          }}
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
