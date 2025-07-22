import { Flex, useDisclosure } from '@chakra-ui/react';
import _ from 'lodash';
import React, { useCallback, useEffect, useState } from 'react';
import {
  MaintenancePlan,
  PlanFilter,
  PlanTableType,
} from '~/lib/interfaces/maintenance.interfaces';
import {
  maintenancePlanApi,
  useGetAllMaintenancePlanQuery,
  useSearchMaintenancePlanMutation,
} from '~/lib/redux/services/maintenance/plan.services';
import {
  DEFAULT_PAGE_SIZE,
  OPERATORS,
  SYSTEM_CONTEXT_DETAILS,
} from '~/lib/utils/constants';
import Filters from './Filters';
import useCustomMutation from '~/lib/hooks/mutation.hook';
import { FilterDisplay } from '@repo/ui/components';
import MaintenancePlanTable from './PlanTable';
import { ListResponse } from '@repo/interfaces';
import { generateSearchCriterion } from '@repo/utils';
import PopoverAction from './PopoverAction';
import PlanDetailsDrawer from './Drawers/PlanDetailDrawer';
import useCustomSearchParams from '~/lib/hooks/useCustomSearchParams';
import useSignalR from '~/lib/hooks/useSignalR';
import useSignalREventHandler from '~/lib/hooks/useSignalREventHandler';
import { useAppDispatch } from '~/lib/redux/hooks';

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
  const { updateSearchParam, clearSearchParamsAfter } = useCustomSearchParams();
  const dispatch = useAppDispatch();

  // Checks if all filterdata is empty
  const isFilterEmpty = _.every(
    filterData,
    (value) => (_.isArray(value) && _.isEmpty(value)) || value === undefined
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

    orCriterion: isFilterEmpty
      ? undefined
      : [
          ...(filterData.planType && filterData.planType.length >= 1
            ? [
                generateSearchCriterion(
                  'planTypeId',
                  filterData.planType.map((item) => item.value),
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

  //Open Plan detail drawer if plan id exists
  useEffect(() => {
    if (maintenancePlanId !== undefined) {
      onOpen();
    }
  }, [maintenancePlanId]);

  //Handle apply Filter
  const handleApplyFilter = () => {
    setCurrentPage(1);
    setPageSize(DEFAULT_PAGE_SIZE);
    handleSearch();
  };

  // SignalR Connection
  const connectionState = useSignalR('maintenanceplan-hub');

  useSignalREventHandler({
    eventName: 'CreateMaintenancePlan',
    connectionState,
    callback: (newPlan) => {
      // Update the query cache when a new plan is received
      const parsedPlan = JSON.parse(newPlan);
      dispatch(
        maintenancePlanApi.util.updateQueryData(
          'getAllMaintenancePlan',
          {
            pageNumber: currentPage,
            pageSize,
          },
          (draft) => {
            if (draft?.data?.items) {
              draft?.data?.items.unshift(parsedPlan); // Add new plan to the beginning
            }
          }
        )
      );
    },
  });

  useSignalREventHandler({
    eventName: 'UpdateMaintenancePlan',
    connectionState,
    callback: (updatedPlan) => {
      // Update the query cache when a plan is updated
      const parsedPlan = JSON.parse(updatedPlan);
      dispatch(
        maintenancePlanApi.util.updateQueryData(
          'getAllMaintenancePlan',
          {
            pageNumber: currentPage,
            pageSize,
          },
          (draft) => {
            if (draft?.data?.items) {
              const index = draft.data.items.findIndex(
                (item) =>
                  item.maintenancePlanId === parsedPlan.maintenancePlanId
              );
              if (index !== -1) {
                draft.data.items[index] = parsedPlan; // Update the existing plan
              }
            }
          }
        )
      );
    },
  });

  useSignalREventHandler({
    eventName: 'DeleteMaintenancePlan',
    connectionState,
    callback: (deletedPlan) => {
      // Update the query cache when a plan is deleted
      const parsedPlan = JSON.parse(deletedPlan);
      dispatch(
        maintenancePlanApi.util.updateQueryData(
          'getAllMaintenancePlan',
          {
            pageNumber: currentPage,
            pageSize,
          },
          (draft) => {
            if (draft?.data?.items) {
              draft.data.items = draft.data.items.filter(
                (item) =>
                  item.maintenancePlanId !== parsedPlan.maintenancePlanId
              ); // Remove the deleted plan
            }
          }
        )
      );
    },
  });

  return (
    <Flex direction="column" pt="16px" width="full">
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
        PopoverComponent={(plan) => PopoverAction(plan, 'current')}
        type={type}
        handleSelectRow={(row) =>
          updateSearchParam(
            SYSTEM_CONTEXT_DETAILS.MAINTENANCE_PLANS.slug,
            row?.maintenancePlanId
          )
        }
      />
      {maintenancePlanId && (
        <PlanDetailsDrawer
          isOpen={isOpen}
          onClose={() => {
            onClose;
            clearSearchParamsAfter(
              SYSTEM_CONTEXT_DETAILS.MAINTENANCE_PLANS.slug,
              { removeSelf: true }
            );
          }}
          data={null}
          planId={+maintenancePlanId}
        />
      )}
    </Flex>
  );
};

export default Plans;
