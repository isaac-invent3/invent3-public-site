import { FormInputWrapper, FormSelect } from '@repo/ui/components';
import { useAppSelector } from '~/lib/redux/hooks';

const DepartmentSelect = ({
  buildingId,
  floorId,
}: {
  buildingId: number;
  floorId: number;
}) => {
  const locationFormInfo = useAppSelector(
    (state) => state.location.locationFormInfo
  );

  return (
    <FormInputWrapper
      sectionMaxWidth="141px"
      customSpacing="16px"
      title="Department"
      description="Select Department"
      isRequired
    >
      <FormSelect
        name="departmentId"
        title="Department"
        options={
          locationFormInfo?.createBuildingDtos
            ?.find((_, bIndex) => bIndex === buildingId)
            ?.createFloorDtos?.find((_, fIndex) => fIndex === floorId)
            ?.createDepartmentDtos?.map((department, dIndex) => ({
              value: dIndex + 1,
              label: department.createDepartmentDto.departmentName,
            })) ?? []
        }
        showTitleAfterSelect={false}
      />
    </FormInputWrapper>
  );
};

export default DepartmentSelect;
