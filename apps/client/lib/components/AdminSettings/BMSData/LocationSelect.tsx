import { SimpleGrid, SimpleGridProps } from '@chakra-ui/react';
import React from 'react';
import FacilitySelect from '../../AssetManagement/AssetForm/GeneralStep/AssetLocation/Modals/SelectInputs/FacilitySelect';
import BuildingSelect from '../../AssetManagement/AssetForm/GeneralStep/AssetLocation/Modals/SelectInputs/BuildingSelect';
import FloorSelect from '../../AssetManagement/AssetForm/GeneralStep/AssetLocation/Modals/SelectInputs/FloorSelect';

interface LocationSelectProps {
  location: {
    facilityId: number | null;
    buildingId: number | null;
    floorId: number | null;
  };
  setLocation: React.Dispatch<
    React.SetStateAction<{
      facilityId: number | null;
      buildingId: number | null;
      floorId: number | null;
    }>
  >;
  containerStyle: SimpleGridProps;
}

const LocationSelect = (props: LocationSelectProps) => {
  const { location, setLocation, containerStyle } = props;
  return (
    <SimpleGrid gap="17px" width="full" {...containerStyle}>
      <FacilitySelect
        type="general"
        handleSelect={(option) =>
          setLocation({ ...location, facilityId: +option?.value })
        }
      />
      <BuildingSelect
        type="specificById"
        facilityId={location.facilityId}
        handleSelect={(option) =>
          setLocation({ ...location, buildingId: +option?.value })
        }
      />
      <FloorSelect
        type="specificById"
        buildingId={location.buildingId}
        handleSelect={(option) =>
          setLocation({ ...location, floorId: +option?.value })
        }
      />
    </SimpleGrid>
  );
};

export default LocationSelect;
