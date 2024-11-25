import React, { useCallback, useEffect, useState } from 'react';
import _ from 'lodash';
import TaskTable from './TaskTable';
import { useGetAllTasksQuery } from '~/lib/redux/services/task/general.services';
import { Flex } from '@chakra-ui/react';
import { DEFAULT_PAGE_SIZE, OPERATORS } from '~/lib/utils/constants';
import {
  LocationFilter,
  SearchResponse,
} from '~/lib/interfaces/general.interfaces';
import FilterDisplay from '../UI/Filter/FilterDisplay';
import Filters from './Filters';
import { generateSearchCriterion } from '~/lib/utils/helperFunctions';
import useCustomMutation from '~/lib/hooks/mutation.hook';
import { useSearchMaintenancePlanMutation } from '~/lib/redux/services/maintenance/plan.services';

export const initialFilterData = {
  region: [],
  area: [],
  branch: [],
};

interface ListViewProps {
  statusCategoryId: number;
  search: string;
  openFilter: boolean;
}

const ListView = (props: ListViewProps) => {
  const { statusCategoryId, search, openFilter } = props;
  const [filterData, setFilterData] =
    useState<LocationFilter>(initialFilterData);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(DEFAULT_PAGE_SIZE);
  const { data, isLoading, isFetching } = useGetAllTasksQuery({
    pageSize,
    pageNumber: currentPage,
    statusCategoryId,
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
              columnName: 'taskName',
              columnValue: search,
              operation: OPERATORS.Contains,
            },
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
      <TaskTable
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
        isSortable={true}
        emptyLines={25}
        type="page"
      />
    </Flex>
  );
};

export default ListView;
