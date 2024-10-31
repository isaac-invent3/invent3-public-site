import { Flex, HStack } from '@chakra-ui/react';
import { useFormikContext } from 'formik';
import React, { useState } from 'react';
import SectionInfo from '~/lib/components/UI/Form/FormSectionInfo';
import GenericAsyncSelect from '~/lib/components/UI/GenericAsyncSelect';
import { useAppDispatch, useAppSelector } from '~/lib/redux/hooks';
import { useGetAllGroupContextRecordsByTypeIdQuery } from '~/lib/redux/services/asset/groupType.services';

import { updatePlanForm } from '~/lib/redux/slices/MaintenanceSlice';

const AssetGroupContext = () => {
  const [pageNumber, setPageNumber] = useState(1);
  const { values } = useFormikContext<any>();
  const { data, isLoading } = useGetAllGroupContextRecordsByTypeIdQuery(
    {
      id: values?.assetGroupTypeID,
      pageSize: 25,
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
          title="Group Context"
          info="Add name that users can likely search with"
          isRequired
        />
      </Flex>
      <GenericAsyncSelect
        selectName="assetGroupContextID"
        selectTitle="Group Context"
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
