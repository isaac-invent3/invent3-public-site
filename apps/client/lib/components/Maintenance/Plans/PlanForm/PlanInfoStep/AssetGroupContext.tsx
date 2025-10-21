import { useDisclosure, VStack } from '@chakra-ui/react';
import { FormAddButton, FormInputWrapper } from '@repo/ui/components';
import { useField, useFormikContext } from 'formik';
import { useState } from 'react';
import AssetTypeModal from '~/lib/components/AssetManagement/AssetForm/AcquisitionStep/AssetType/AssetTypeModal';
import GenericAsyncSelect from '~/lib/components/UI/GenericAsyncSelect';
import useCustomMutation from '~/lib/hooks/mutation.hook';
import { AssetTypePayload } from '~/lib/interfaces/asset/type.interface';
import { PlanFormDetails } from '~/lib/interfaces/maintenance.interfaces';
import { useAppDispatch, useAppSelector } from '~/lib/redux/hooks';
import {
  assetGroupTypeApi,
  useGetAllGroupContextRecordsByTypeIdQuery,
} from '~/lib/redux/services/asset/groupType.services';
import { useCreateAssetTypeMutation } from '~/lib/redux/services/asset/types.services';

import { updatePlanForm } from '~/lib/redux/slices/MaintenanceSlice';
import { ASSET_GROUP_TYPE, DEFAULT_PAGE_SIZE } from '~/lib/utils/constants';

const AssetGroupContext = () => {
  const [pageNumber, setPageNumber] = useState(1);
  const { values } = useFormikContext<PlanFormDetails>();
  const { assetGroupTypeName } = useAppSelector(
    (state) => state.maintenance.planForm
  );
  const { data, isLoading, isFetching } =
    useGetAllGroupContextRecordsByTypeIdQuery(
      {
        groupTypeId: values?.assetGroupTypeID ?? undefined,
        pageSize: DEFAULT_PAGE_SIZE,
        pageNumber,
      },
      { skip: !values?.assetGroupTypeID }
    );
  const { typeName } = useAppSelector(
    (state) => state.maintenance.scheduleForm
  );
  const dispatch = useAppDispatch();
  const [createAssetType] = useCreateAssetTypeMutation({});
  const { handleSubmit } = useCustomMutation();
  const { isOpen, onClose, onOpen } = useDisclosure();
  const [field, meta, helpers] = useField('assetTypeId');
  const { assetGroupContextName } = useAppSelector(
    (state) => state.maintenance.planForm
  );
  const handleAddAssetType = async (payload: AssetTypePayload) => {
    const response = await handleSubmit(createAssetType, payload, '');
    if (response?.data) {
      helpers.setValue(response?.data?.data?.assetTypeId);
      dispatch(
        updatePlanForm({
          assetGroupContextName: response?.data?.data?.typeName!,
        })
      );
      dispatch(
        assetGroupTypeApi.util.invalidateTags(['allAssetGroupContextRecords'])
      );
      onClose();
    }
  };

  return (
    <>
      <FormInputWrapper
        sectionMaxWidth="141px"
        customSpacing="40px"
        title={assetGroupTypeName ?? ''}
        description="Select an option"
        isRequired
      >
        <VStack alignItems="flex-end" width="full">
          <GenericAsyncSelect
            selectName="assetGroupContextID"
            selectTitle={assetGroupTypeName ?? 'Select'}
            data={data}
            labelKey="groupContextTypeName"
            valueKey="groupContextID"
            defaultInputValue={typeName}
            isLoading={isLoading || isFetching}
            pageNumber={pageNumber}
            setPageNumber={setPageNumber}
            handleSelect={(option) =>
              dispatch(updatePlanForm({ assetGroupContextName: option?.label }))
            }
            selectedOption={
              assetGroupContextName
                ? {
                    value: meta.value!,
                    label: assetGroupContextName,
                  }
                : undefined
            }
          />
          {values?.assetGroupTypeID === ASSET_GROUP_TYPE.ASSET_TYPE && (
            <FormAddButton handleClick={onOpen}>
              Add New Asset Type
            </FormAddButton>
          )}
        </VStack>
      </FormInputWrapper>
      <AssetTypeModal
        isOpen={isOpen}
        onClose={onClose}
        handleAdd={handleAddAssetType}
      />
    </>
  );
};

export default AssetGroupContext;
