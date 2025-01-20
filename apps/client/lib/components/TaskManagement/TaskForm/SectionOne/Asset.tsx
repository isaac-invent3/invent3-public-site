import { Flex, HStack } from '@chakra-ui/react';
import { FormSectionInfo } from '@repo/ui/components';
import React from 'react';
import AssetSelect from '~/lib/components/Common/SelectComponents/AssetSelect';
import { useAppDispatch, useAppSelector } from '~/lib/redux/hooks';
import { updateTaskForm } from '~/lib/redux/slices/TaskSlice';

const AssetField = () => {
  const dispatch = useAppDispatch();
  const { assetName } = useAppSelector((state) => state.task.taskForm);

  return (
    <HStack width="full" alignItems="flex-start" spacing="47px">
      <Flex width="full" maxW="141px">
        <FormSectionInfo
          title="Asset"
          info="Find and select the asset you require"
          isRequired
        />
      </Flex>
      <AssetSelect
        selectName="assetId"
        selectTitle="Asset"
        defaultInputValue={assetName}
        handleSelect={(option) => {
          dispatch(
            updateTaskForm({ assetName: option.label, assetId: +option.value })
          );
        }}
      />
    </HStack>
  );
};

export default AssetField;
