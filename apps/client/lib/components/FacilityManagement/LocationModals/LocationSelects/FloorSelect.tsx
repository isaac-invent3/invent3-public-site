import { FormInputWrapper, FormSelect } from '@repo/ui/components';
import { useAppSelector } from '~/lib/redux/hooks';

const FloorSelect = ({ buildingId }: { buildingId: number }) => {
  const locationFormInfo = useAppSelector(
    (state) => state.location.locationFormInfo
  );

  return (
    <FormInputWrapper
      sectionMaxWidth="141px"
      customSpacing="16px"
      title="Floor"
      description="Select Floor"
      isRequired
    >
      <FormSelect
        name="floorId"
        title="Floor"
        options={
          locationFormInfo?.createBuildingDtos
            ?.find((_, index) => index === buildingId)
            ?.createFloorDtos?.map((floor, index) => ({
              value: index + 1,
              label: floor.createFloorDto.floorName,
            })) ?? []
        }
        showTitleAfterSelect={false}
      />
    </FormInputWrapper>
  );
};

export default FloorSelect;
