import { Text } from '@chakra-ui/react';
import React from 'react';
import { useAppSelector } from '~/lib/redux/hooks';

const AssetLocation = () => {
  const assetData = useAppSelector((state) => state.asset.asset);

  if (!assetData) {
    return null;
  }

  const {
    countryName,
    stateName,
    lganame,
    facilityName,
    floorName,
    buildingName,
    departmentName,
    roomName,
    aisleName,
    shelfName,
  } = assetData;

  const location =
    [
      facilityName,
      buildingName,
      floorName,
      departmentName,
      roomName,
      aisleName,
      shelfName,
      lganame,
      stateName,
      countryName,
    ]
      .filter(Boolean)
      .join(', ') || 'N/A';

  return (
    <Text fontWeight={400} lineHeight="140%" maxW="212px">
      {location}
    </Text>
  );
};

export default AssetLocation;
