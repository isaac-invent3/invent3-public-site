import { Flex, HStack } from '@chakra-ui/react';
import { useFormikContext } from 'formik';
import React, { useState } from 'react';
import SectionInfo from '~/lib/components/UI/Form/FormSectionInfo';
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
      id: values?.assetGroupTypeID,
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
    <HStack width="full" alignItems="flex-start" spacing="40px">
      <Flex width="full" maxW="141px">
        <SectionInfo
          title={assetGroupTypeName ?? ''}
          info="Add name that users can likely search with"
          isRequired
        />
      </Flex>
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
    </HStack>
  );
};

export default AssetGroupContext;
