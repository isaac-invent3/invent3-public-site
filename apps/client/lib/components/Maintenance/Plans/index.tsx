import { Flex, useDisclosure } from '@chakra-ui/react';
import _ from 'lodash';
import React, { useCallback, useEffect, useState } from 'react';
import {
  MaintenancePlan,
  PlanFilter,
  PlanTableType,
} from '~/lib/interfaces/maintenance.interfaces';
import {
  useGetAllMaintenancePlanQuery,
  useSearchMaintenancePlanMutation,
} from '~/lib/redux/services/maintenance/plan.services';
import { DEFAULT_PAGE_SIZE, OPERATORS } from '~/lib/utils/constants';
import Filters from './Filters';
import useCustomMutation from '~/lib/hooks/mutation.hook';
import { FilterDisplay } from '@repo/ui/components';
import MaintenancePlanTable from './PlanTable';
import { ListResponse } from '@repo/interfaces';
import { generateSearchCriterion } from '@repo/utils';
import PopoverAction from './PopoverAction';
import PlanDetailsModal from './Drawers/PlanDetailDrawer';
import useCustomSearchParams from '~/lib/hooks/useCustomSearchParams';

export const initialFilterData = {
  planType: [],
  region: [],
  area: [],
  branch: [],
  startDate: undefined,
  endDate: undefined,
};

interface PlansProp {
  search: string;
  openFilter: boolean;
  type?: PlanTableType;
}

const Plans = (props: PlansProp) => {
  const { search, openFilter, type = 'current' } = props;
  const [filterData, setFilterData] = useState<PlanFilter>(initialFilterData);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(DEFAULT_PAGE_SIZE);
  const { data, isLoading, isFetching } = useGetAllMaintenancePlanQuery({
    pageSize,
    pageNumber: currentPage,
  });
  const { handleSubmit } = useCustomMutation();
  const { getSearchParam } = useCustomSearchParams();
  const maintenancePlanId = getSearchParam('maintenancePlanId');
  const { isOpen, onOpen, onClose } = useDisclosure();

  // Checks if all filterdata is empty
  const isFilterEmpty = _.every(
    filterData,
    (value) => _.isArray(value) && _.isEmpty(value)
  );

  const [searchPlan, { isLoading: searchLoading }] =
    useSearchMaintenancePlanMutation({});
  const [searchData, setSearchData] =
    useState<ListResponse<MaintenancePlan> | null>(null);

  // Search Criterion
  const searchCriterion = {
    ...(search && {
      criterion: [
        {
          columnName: 'planName',
          columnValue: search,
          operation: OPERATORS.Contains,
        },
      ],
    }),
    ...(!isFilterEmpty && {
      orCriterion: [
        ...filterData.planType.map((item) => [
          ...generateSearchCriterion(
            'planTypeId',
            [item.value],
            OPERATORS.Equals
          ),
        ]),
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
        ...[filterData.startDate]
          .filter(Boolean)
          .map((item) => [
            ...generateSearchCriterion(
              'startDate',
              [item as string],
              OPERATORS.Contains
            ),
          ]),
        ...[filterData.endDate]
          .filter(Boolean)
          .map((item) => [
            ...generateSearchCriterion(
              'endDate',
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
    if (!search && isFilterEmpty) {
      setPageSize(DEFAULT_PAGE_SIZE);
      setCurrentPage(1);
    }
  }, [search, isFilterEmpty]);

  //Open Plan detail drawer if plan id exists
  useEffect(() => {
    if (maintenancePlanId !== undefined) {
      onOpen();
    }
  }, [maintenancePlanId]);

  return (
    <Flex direction="column" pt="16px">
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
      <MaintenancePlanTable
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
        PopoverComponent={(plan) => PopoverAction(plan, 'history')}
        type={type}
      />
      {maintenancePlanId && (
        <PlanDetailsModal
          isOpen={isOpen}
          onClose={onClose}
          data={null}
          planId={+maintenancePlanId}
        />
      )}
    </Flex>
  );
};

export default Plans;
