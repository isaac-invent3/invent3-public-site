import { Flex, HStack } from '@chakra-ui/react';
import React, { useState } from 'react';
import SectionInfo from '~/lib/components/UI/Form/FormSectionInfo';
import GenericAsyncSelect from '~/lib/components/UI/GenericAsyncSelect';
import { useAppDispatch, useAppSelector } from '~/lib/redux/hooks';
import {
  useGetAllAssetGroupTypesQuery,
  useSearchAssetGroupTypesMutation,
} from '~/lib/redux/services/asset/groupType.services';

import { updatePlanForm } from '~/lib/redux/slices/MaintenanceSlice';

const AssetGroupContext = () => {
  const [pageNumber, setPageNumber] = useState(1);
  const { data, isLoading } = useGetAllAssetGroupTypesQuery({
    pageSize: 25,
    pageNumber,
  });
  const [searchAssetGroupType] = useSearchAssetGroupTypesMutation({});
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
        labelKey="groupTypeName"
        valueKey="groupTypeId"
        defaultInputValue={typeName}
        mutationFn={searchAssetGroupType}
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
