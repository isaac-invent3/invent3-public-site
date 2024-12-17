import React, { useCallback, useEffect, useState } from 'react';
import { DEFAULT_PAGE_SIZE, OPERATORS } from '~/lib/utils/constants';
import { ListResponse } from '~/lib/interfaces/general.interfaces';
import useCustomMutation from '~/lib/hooks/mutation.hook';
import GenericTemplateModal from '~/lib/components/Common/Modals/GenericTemplateModal';

import { Button } from '@repo/ui/components';
import { useField } from 'formik';
import {
  useGetAllMaintenancePlanQuery,
  useSearchMaintenancePlanMutation,
} from '~/lib/redux/services/maintenance/plan.services';
import { MaintenancePlan } from '~/lib/interfaces/maintenance.interfaces';
import { useAppDispatch, useAppSelector } from '~/lib/redux/hooks';
import { updateAssetForm } from '~/lib/redux/slices/AssetSlice';
import MaintenancePlanTable from '~/lib/components/Maintenance/Plans/PlanTable';

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

  const searchCriterion = {
    criterion: [
      {
        columnName: 'planName',
        columnValue: search,
        operation: OPERATORS.Contains,
      },
    ],
    pageNumber,
    pageSize,
  };

  const handleSearch = useCallback(async () => {
    const response = await handleSubmit(
      searchMaintenancePlan,
      searchCriterion,
      ''
    );
    setSearchData(response?.data?.data);
  }, [searchMaintenancePlan, searchCriterion]);

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
    selectedRows.forEach((row) => {
      const plan =
        search && searchData
          ? searchData.items.find((_, index) => index === row)
          : data?.data?.items.find((_, index) => index === row);
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
    console.log({ newPlans });
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
    >
      <MaintenancePlanTable
        data={
          search && searchData ? searchData.items : (data?.data?.items ?? [])
        }
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
