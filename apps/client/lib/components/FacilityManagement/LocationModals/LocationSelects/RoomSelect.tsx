import { FormInputWrapper, FormSelect } from '@repo/ui/components';
import { useAppSelector } from '~/lib/redux/hooks';

interface RoomSelectProps {
  buildingId: number;
  floorId: number;
  departmentId: number;
}
const RoomSelect = (props: RoomSelectProps) => {
  const { buildingId, floorId, departmentId } = props;
  const locationFormInfo = useAppSelector(
    (state) => state.location.locationFormInfo
  );

  return (
    <FormInputWrapper
      sectionMaxWidth="141px"
      customSpacing="16px"
      title="Room"
      description="Select Room"
      isRequired
    >
      <FormSelect
        name="roomId"
        title="Room"
        options={
          locationFormInfo?.createBuildingDtos
            ?.find((_, bIndex) => bIndex === buildingId)
            ?.createFloorDtos?.find((_, fIndex) => fIndex === floorId)
            ?.createDepartmentDtos?.find((_, dIndex) => dIndex === departmentId)
            ?.createRoomDtos?.map((room, rIndex) => ({
              value: rIndex + 1,
              label: room.createRoomDto.roomName,
            })) ?? []
        }
        showTitleAfterSelect={false}
      />
    </FormInputWrapper>
  );
};

export default RoomSelect;
