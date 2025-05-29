import { HStack } from '@chakra-ui/react';
import { useParams } from 'next/navigation';
import React from 'react';
import { useGetBuildingsByFacilityIdQuery } from '~/lib/redux/services/location/building.services';
import { useGetFloorsByBuildingIdQuery } from '~/lib/redux/services/location/floor.services';
import SingleLocationDropdown from './Dropdown';
import { BuildingIcon } from '~/lib/components/CustomIcons/Dashboard';
import { generateOptions } from '~/lib/utils/helperFunctions';
import { TemplateIcon } from '~/lib/components/CustomIcons/layout';
import { useAppDispatch, useAppSelector } from '~/lib/redux/hooks';
import { updateInfo } from '~/lib/redux/slices/DashboardSlice';

const LocationDropdown = () => {
  const params = useParams();
  const id = params?.id as unknown as number;
  const disptach = useAppDispatch();
  const { selectedBuilding, selectedFloor } = useAppSelector(
    (state) => state.dashboard.info
  );

  const { data: buildingData, isLoading: isLoadingBuilding } =
    useGetBuildingsByFacilityIdQuery(
      {
        id,
      },
      { skip: !id }
    );
  const { data: floorData, isLoading: isLoadingFloor } =
    useGetFloorsByBuildingIdQuery(
      {
        id: (selectedBuilding?.value as number)!,
      },
      { skip: !selectedBuilding?.value }
    );
  return (
    <HStack spacing="16px">
      <SingleLocationDropdown
        label="Building"
        icon={BuildingIcon}
        isLoading={isLoadingBuilding}
        options={generateOptions(
          buildingData?.data?.items,
          'buildingName',
          'buildingId'
        )}
        selectedOption={selectedBuilding}
        handleClick={(option) =>
          disptach(updateInfo({ selectedBuilding: option }))
        }
      />
      <SingleLocationDropdown
        label="Floor"
        icon={TemplateIcon}
        isLoading={isLoadingFloor}
        options={generateOptions(
          floorData?.data?.items,
          'floorName',
          'floorId'
        )}
        selectedOption={selectedFloor}
        handleClick={(option) =>
          disptach(updateInfo({ selectedFloor: option }))
        }
      />
    </HStack>
  );
};

export default LocationDropdown;
