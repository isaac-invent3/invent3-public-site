import { FormInputWrapper, FormSelect } from '@repo/ui/components';
import { useAppSelector } from '~/lib/redux/hooks';

const BuildingSelect = () => {
  const locationFormInfo = useAppSelector(
    (state) => state.location.locationFormInfo
  );

  return (
    <FormInputWrapper
      sectionMaxWidth="141px"
      customSpacing="16px"
      title="Building"
      description="Select Building"
      isRequired
    >
      <FormSelect
        name="buildingId"
        title="Building"
        options={
          locationFormInfo?.createBuildingDtos?.map((item, index) => ({
            value: index + 1,
            label: item.createBuildingDto.buildingName,
          })) ?? []
        }
        showTitleAfterSelect={false}
      />
    </FormInputWrapper>
  );
};

export default BuildingSelect;
