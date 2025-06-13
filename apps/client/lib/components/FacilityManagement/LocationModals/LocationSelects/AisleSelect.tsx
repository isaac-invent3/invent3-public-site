import { FormInputWrapper, FormSelect } from '@repo/ui/components';
import { useAppSelector } from '~/lib/redux/hooks';

interface AisleSelectProps {
  buildingId: number;
  floorId: number;
  departmentId: number;
  roomId: number;
}
const AisleSelect = (props: AisleSelectProps) => {
  const { buildingId, floorId, departmentId, roomId } = props;
  const locationFormInfo = useAppSelector(
    (state) => state.location.locationFormInfo
  );

  return (
    <FormInputWrapper
      sectionMaxWidth="141px"
      customSpacing="16px"
      title="Aisle"
      description="Select Aisle"
      isRequired
    >
      <FormSelect
        name="aisleId"
        title="Aisle"
        options={(() => {
          const room = locationFormInfo?.createBuildingDtos
            ?.find((_, bIndex) => bIndex === buildingId)
            ?.createFloorDtos?.find((_, fIndex) => fIndex === floorId)
            ?.createDepartmentDtos?.find((_, dIndex) => dIndex === departmentId)
            ?.createRoomDtos?.find((room, rIndex) => rIndex === roomId);

          return (
            room?.createAisleDtos?.map((aisle, aIndex) => ({
              value: aIndex + 1,
              label: aisle.createAisleDto.aisleName,
            })) ?? []
          );
        })()}
        showTitleAfterSelect={false}
      />
    </FormInputWrapper>
  );
};

export default AisleSelect;
