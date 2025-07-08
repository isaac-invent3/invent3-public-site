import React, { useCallback, useEffect, useState } from 'react';
import { DEFAULT_PAGE_SIZE, OPERATORS } from '~/lib/utils/constants';
import useCustomMutation from '~/lib/hooks/mutation.hook';
import GenericTemplateModal from '~/lib/components/Common/Modals/GenericTemplateModal';

import { Button } from '@repo/ui/components';
import { useField } from 'formik';
import {
  useGetAllMaintenancePlanQuery,
  useSearchMaintenancePlanMutation,
} from '~/lib/redux/services/maintenance/plan.services';
import {
  MaintenancePlan,
  PlanFilter,
} from '~/lib/interfaces/maintenance.interfaces';
import { useAppDispatch, useAppSelector } from '~/lib/redux/hooks';
import { updateAssetForm } from '~/lib/redux/slices/AssetSlice';
import MaintenancePlanTable from '~/lib/components/Maintenance/Plans/PlanTable';
import { ListResponse } from '@repo/interfaces';
import { initialFilterData } from '~/lib/components/Maintenance/Plans';
import { Flex } from '@chakra-ui/react';
import Filters from '~/lib/components/Maintenance/Plans/Filters';
import { generateSearchCriterion } from '@repo/utils';
import _ from 'lodash';

interface ExistingMaintenancePlanModalProps {
  isOpen: boolean;
  onClose: () => void;
}
const ExistingMaintenancePlanModal = (
  props: ExistingMaintenancePlanModalProps
) => {
  const { isOpen, onClose } = props;
  const [search, setSearch] = useState('');
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(DEFAULT_PAGE_SIZE);
  const dispatch = useAppDispatch();
  const { maintenancePlans: existingSelectedPlans, newMaintenancePlanIds } =
    useAppSelector((state) => state.asset.assetForm);
  const { data, isLoading, isFetching } = useGetAllMaintenancePlanQuery(
    {
      pageNumber,
      pageSize,
    },
    { skip: search !== '' || !isOpen }
  );
  const [searchMaintenancePlan, { isLoading: searchLoading }] =
    useSearchMaintenancePlanMutation({});
  const [searchData, setSearchData] =
    useState<ListResponse<MaintenancePlan> | null>(null);
  const { handleSubmit } = useCustomMutation();
  const [showDetails, setShowDetails] = useState(false);
  const [selectedRows, setSelectedRows] = useState<number[]>([]);
  // eslint-disable-next-line no-unused-vars
  const [field, meta, helpers] = useField('maintenancePlans');
  const [filterData, setFilterData] = useState<PlanFilter>(initialFilterData);

  // Checks if all filterdata is empty
  const isFilterEmpty = _.every(
    filterData,
    (value) => _.isArray(value) && _.isEmpty(value)
  );

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
        [
          ...generateSearchCriterion(
            'planTypeId',
            filterData.planType.map((item) => item.value),
            OPERATORS.Equals
          ),
        ],
        [
          ...generateSearchCriterion(
            'stateId',
            filterData.region.map((item) => item.value),
            OPERATORS.Equals
          ),
        ],
        [
          ...generateSearchCriterion(
            'lgaId',
            filterData.area.map((item) => item.value),
            OPERATORS.Equals
          ),
        ],
        [
          ...generateSearchCriterion(
            'facilityId',
            filterData.branch.map((item) => item.value),
            OPERATORS.Equals
          ),
        ],
      ],
    }),
    pageNumber: pageNumber,
    pageSize: pageSize,
  };

  const handleSearch = useCallback(async () => {
    const response = await handleSubmit(
      searchMaintenancePlan,
      searchCriterion,
      ''
    );
    response?.data?.data && setSearchData(response?.data?.data);
  }, [searchMaintenancePlan, searchCriterion]);

  // Removes Plans Duplicate
  const removeDuplicate = (
    plans: MaintenancePlan[] | undefined
  ): MaintenancePlan[] => {
    if (!plans) {
      return [];
    }

    const seenPlanIds = new Set<number>();
    const uniqueMaintenancePlans = plans.filter((item) => {
      if (seenPlanIds.has(item.maintenancePlanId)) {
        return false;
      }
      seenPlanIds.add(item.maintenancePlanId);
      return true; // Keep unique items
    });

    return uniqueMaintenancePlans;
  };

  // Trigger search when search input changes or pagination updates
  useEffect(() => {
    if (search) {
      handleSearch();
    }
  }, [search, pageNumber, pageSize]);

  // Reset pagination when clearing the search
  useEffect(() => {
    if (!search) {
      setPageSize(DEFAULT_PAGE_SIZE);
      setPageNumber(1);
    }
  }, [search]);

  const handleAddDocuments = () => {
    const selectedMaintenancePlans: MaintenancePlan[] = [];
    const sourceItems = removeDuplicate(
      search && searchData ? searchData?.items : data?.data?.items || []
    );
    selectedRows.forEach((row) => {
      const plan = sourceItems.find((_, index) => index === row);
      if (plan) {
        selectedMaintenancePlans.push(plan);
      }
    });

    //Filter out plans already existing
    const newPlans = selectedMaintenancePlans.filter(
      (item) =>
        !existingSelectedPlans
          .map((plan) => plan.maintenancePlanId)
          .includes(item.maintenancePlanId)
    );
    dispatch(
      updateAssetForm({
        maintenancePlans: [...existingSelectedPlans, ...newPlans],
        newMaintenancePlanIds: [
          ...newMaintenancePlanIds,
          ...newPlans.map((item) => item.maintenancePlanId),
        ],
      })
    );
    helpers.setValue([
      ...meta.value,
      ...selectedMaintenancePlans.map((item) => item.maintenancePlanId),
    ]);
    onClose();
  };

  return (
    <GenericTemplateModal
      isOpen={isOpen}
      onClose={onClose}
      headerName={'Maintenance Plans'}
      pageSize={pageSize}
      pageNumber={pageNumber}
      totalPages={
        search && searchData
          ? searchData.totalPages
          : (data?.data?.totalPages ?? 0)
      }
      showDetails={showDetails}
      setShowDetails={setShowDetails}
      setSearch={setSearch}
      setPageNumber={setPageNumber}
      setPageSize={setPageSize}
      footer={
        <Button
          customStyles={{ width: 'max-content', mt: '20px' }}
          isDisabled={selectedRows.length === 0}
          handleClick={handleAddDocuments}
        >
          Add Plan{selectedRows.length > 1 ? 's' : ''}
        </Button>
      }
      filters={
        <Flex width="full" pb="16px">
          <Filters
            filterData={filterData}
            setFilterData={setFilterData}
            handleApplyFilter={handleSearch}
          />
        </Flex>
      }
    >
      <MaintenancePlanTable
        data={removeDuplicate(
          (search || !isFilterEmpty) && searchData
            ? searchData.items
            : (data?.data?.items ?? [])
        )}
        showFooter={true}
        emptyLines={3}
        isLoading={isLoading}
        isSelectable
        isFetching={isFetching || searchLoading}
        selectMultipleRows={true}
        selectedRows={selectedRows}
        setSelectedRows={(items) => setSelectedRows(items)}
      />
    </GenericTemplateModal>
  );
};

export default ExistingMaintenancePlanModal;
