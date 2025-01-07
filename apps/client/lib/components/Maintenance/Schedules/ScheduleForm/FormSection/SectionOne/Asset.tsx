import { Flex, HStack } from '@chakra-ui/react';
import { FormSectionInfo } from '@repo/ui/components';
import React, { useEffect, useState } from 'react';
import AssetSelect from '~/lib/components/Common/AssetSelect';
import { Asset } from '~/lib/interfaces/asset/general.interface';
import { Option } from '~/lib/interfaces/general.interfaces';
import { useAppDispatch, useAppSelector } from '~/lib/redux/hooks';
import { useGetAssetInfoHeaderByIdQuery } from '~/lib/redux/services/asset/general.services';
import { updateScheduleForm } from '~/lib/redux/slices/MaintenanceSlice';

const AssetField = () => {
  const [selectedAsset, setSelectedAsset] = useState<Option | null>(null);
  const assetId = selectedAsset?.value
    ? Number(selectedAsset?.value)
    : undefined;
  const { data } = useGetAssetInfoHeaderByIdQuery(
    { id: assetId! },
    {
      skip: assetId === undefined,
    }
  );
  const dispatch = useAppDispatch();
  const { assetName } = useAppSelector(
    (state) => state.maintenance.scheduleForm
  );

  useEffect(() => {
    if (data?.data) {
      const asset: Asset = data?.data;
      const location = [
        asset.facilityName,
        asset.buildingName,
        asset.floorName,
        asset.roomName,
        asset.departmentName,
        asset.roomName,
        asset.shelfName,
        asset.lganame,
        asset.stateName,
        asset.countryName,
      ]
        .filter(Boolean)
        .join(', ');
      dispatch(
        updateScheduleForm({
          assetLocation: location,
          assetTypeId: asset.assetTypeId,
          assetId: asset.assetId,
        })
      );
    }
  }, [data]);
  return (
    <HStack width="full" alignItems="flex-start" spacing="81px">
      <Flex width="full" maxW="130px">
        <FormSectionInfo
          title="Asset"
          info="Choose the type of asset for maintenance."
          isRequired
        />
      </Flex>
      <AssetSelect
        selectName="assetId"
        selectTitle="Asset"
        defaultInputValue={assetName}
        handleSelect={(option) => {
          setSelectedAsset(option);
          dispatch(updateScheduleForm({ assetName: option.label }));
        }}
      />
    </HStack>
  );
};

export default AssetField;
