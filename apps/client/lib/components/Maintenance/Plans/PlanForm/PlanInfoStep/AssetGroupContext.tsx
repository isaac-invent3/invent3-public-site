import { FormInputWrapper } from '@repo/ui/components';
import { useFormikContext } from 'formik';
import { useState } from 'react';
import GenericAsyncSelect from '~/lib/components/UI/GenericAsyncSelect';
import { PlanFormDetails } from '~/lib/interfaces/maintenance.interfaces';
import { useAppDispatch, useAppSelector } from '~/lib/redux/hooks';
import { useGetAllGroupContextRecordsByTypeIdQuery } from '~/lib/redux/services/asset/groupType.services';

import { updatePlanForm } from '~/lib/redux/slices/MaintenanceSlice';
import { DEFAULT_PAGE_SIZE } from '~/lib/utils/constants';

const AssetGroupContext = () => {
  const [pageNumber, setPageNumber] = useState(1);
  const { values } = useFormikContext<PlanFormDetails>();
  const { assetGroupTypeName } = useAppSelector(
    (state) => state.maintenance.planForm
  );
  const { data, isLoading } = useGetAllGroupContextRecordsByTypeIdQuery(
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
  return (
    <FormInputWrapper
      sectionMaxWidth="141px"
      customSpacing="40px"
      title={assetGroupTypeName ?? ''}
      description="Select an option"
      isRequired
    >
      <GenericAsyncSelect
        selectName="assetGroupContextID"
        selectTitle={assetGroupTypeName ?? 'Select'}
        data={data}
        labelKey="groupContextTypeName"
        valueKey="groupContextID"
        defaultInputValue={typeName}
        isLoading={isLoading}
        pageNumber={pageNumber}
        setPageNumber={setPageNumber}
        handleSelect={(option) =>
          dispatch(updatePlanForm({ assetGroupContextName: option.label }))
        }
      />
    </FormInputWrapper>
  );
};

export default AssetGroupContext;
