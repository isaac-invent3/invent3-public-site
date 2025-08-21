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
import { generateSearchCriteria, generateSearchCriterion } from '@repo/utils';
import PopoverAction from './PopoverAction';
import PlanDetailsDrawer from './Drawers/PlanDetailDrawer';
import useCustomSearchParams from '~/lib/hooks/useCustomSearchParams';
import useSignalR from '~/lib/hooks/useSignalR';
import useSignalREventHandler from '~/lib/hooks/useSignalREventHandler';
import { useAppDispatch } from '~/lib/redux/hooks';
import { usePageFilter } from '~/lib/hooks/usePageFilter';

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
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(DEFAULT_PAGE_SIZE);
  const { handleSubmit } = useCustomMutation();
  const { getSearchParam } = useCustomSearchParams();
  const maintenancePlanId = getSearchParam('maintenancePlanId');
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { updateSearchParam, clearSearchParamsAfter } = useCustomSearchParams();
  const dispatch = useAppDispatch();
  const [searchPlan, { isLoading: searchLoading }] =
    useSearchMaintenancePlanMutation({});
  const [searchData, setSearchData] = useState<
    ListResponse<MaintenancePlan> | undefined
  >(undefined);

  const {
    filterData,
    setFilterData,
    appliedFilter,
    isFilterEmpty,
    applyFilter,
    clearFilter,
  } = usePageFilter<PlanFilter>(initialFilterData);

  const { data, isLoading, isFetching } = useGetAllMaintenancePlanQuery(
    {
      pageSize,
      pageNumber: pageNumber,
    },
    {
      skip: search !== '' || !isFilterEmpty,
    }
  );

  const handleSearch = useCallback(async () => {
    const { orCriterion } = generateSearchCriteria(
      search,
      appliedFilter,
      { planType: { key: 'planTypeId', operator: OPERATORS.Equals } },
      ['planName']
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

  //Open Plan detail drawer if plan id exists
  useEffect(() => {
    if (maintenancePlanId !== undefined) {
      onOpen();
    }
  }, [maintenancePlanId]);

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
            pageNumber: pageNumber,
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
            pageNumber: pageNumber,
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
            pageNumber: pageNumber,
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
        pageNumber={pageNumber}
        setPageNumber={setPageNumber}
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
