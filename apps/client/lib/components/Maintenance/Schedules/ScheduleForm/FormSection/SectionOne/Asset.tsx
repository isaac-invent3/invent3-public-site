import { Flex, HStack } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import AssetSelect from '~/lib/components/Common/AssetSelect';
import SectionInfo from '~/lib/components/UI/Form/FormSectionInfo';
import { Asset } from '~/lib/interfaces/asset.interfaces';
import { Option } from '~/lib/interfaces/general.interfaces';
import { useAppDispatch } from '~/lib/redux/hooks';
import { useGetAssetInfoHeaderByIdQuery } from '~/lib/redux/services/asset/general.services';
import { updateScheduleForm } from '~/lib/redux/slices/MaintenanceSlice';

const AssetField = () => {
  const [selectedAsset, setSelectedAsset] = useState<Option | null>(null);
  const { data } = useGetAssetInfoHeaderByIdQuery(selectedAsset?.value, {
    skip: !selectedAsset?.value,
  });
  const dispatch = useAppDispatch();

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
        })
      );
    }
  }, [data]);
  return (
    <HStack width="full" alignItems="flex-start" spacing="81px">
      <Flex width="full" maxW="130px">
        <SectionInfo
          title="Asset"
          info="Add name that users can likely search with"
          isRequired
        />
      </Flex>
      <AssetSelect
        selectName="assetId"
        selectTitle="Asset"
        handleSelect={(option) => {
          setSelectedAsset(option);
          dispatch(updateScheduleForm({ assetName: option.label }));
        }}
      />
    </HStack>
  );
};

export default AssetField;
