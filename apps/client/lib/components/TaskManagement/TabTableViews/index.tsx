import React, { useCallback, useEffect, useState } from 'react';
import _ from 'lodash';
import { Flex } from '@chakra-ui/react';
import { DEFAULT_PAGE_SIZE, OPERATORS } from '~/lib/utils/constants';
import {
  ListResponse,
  LocationFilter,
  SearchCriterion,
  SearchResponse,
} from '~/lib/interfaces/general.interfaces';
import { generateSearchCriterion } from '~/lib/utils/helperFunctions';
import useCustomMutation from '~/lib/hooks/mutation.hook';
import { TaskInstance } from '~/lib/interfaces/task.interfaces';
import Filters from './Filters';
import TaskInstanceTable from '../Tables/TaskInstanceTable';
import { useSearchTaskInstancesMutation } from '~/lib/redux/services/task/instance.services';
import { FilterDisplay } from '@repo/ui/components';

export const initialFilterData = {
  region: [],
  area: [],
  branch: [],
};

interface TabTableViewProps {
  search: string;
  openFilter: boolean;
  data: ListResponse<TaskInstance> | undefined;
  isLoading: boolean;
  isFetching: boolean;
  pageSize: number;
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  setPageSize: React.Dispatch<React.SetStateAction<number>>;
  specificSearchCriterion: SearchCriterion;
}

const TabTableView = (props: TabTableViewProps) => {
  const {
    data,
    search,
    openFilter,
    isLoading,
    isFetching,
    pageSize,
    currentPage,
    setCurrentPage,
    setPageSize,
    specificSearchCriterion,
  } = props;
  const [filterData, setFilterData] =
    useState<LocationFilter>(initialFilterData);
  const { handleSubmit } = useCustomMutation();

  // Checks if all filterdata is empty
  const isFilterEmpty = _.every(
    filterData,
    (value) => _.isArray(value) && _.isEmpty(value)
  );

  const [searchPlan, { isLoading: searchLoading }] =
    useSearchTaskInstancesMutation({});
  const [searchData, setSearchData] = useState<SearchResponse | null>(null);

  // Search Criterion
  const searchCriterion = {
    ...(search
      ? {
          criterion: [
            {
              columnName: 'taskName',
              columnValue: search,
              operation: OPERATORS.Contains,
            },
            specificSearchCriterion,
          ],
        }
      : {}),
    ...(!isFilterEmpty
      ? {
          orCriterion: [
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

  return (
    <Flex width="full" direction="column" mt="16px">
      {openFilter && (
        <Flex width="full" mb="16px">
          <FilterDisplay isOpen={openFilter}>
            <Filters
              filterData={filterData}
              setFilterData={setFilterData}
              handleApplyFilter={handleSearch}
            />
          </FilterDisplay>
        </Flex>
      )}
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
      />
    </Flex>
  );
};

export default TabTableView;
