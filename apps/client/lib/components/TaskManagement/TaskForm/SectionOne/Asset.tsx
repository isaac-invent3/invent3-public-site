import { FormInputWrapper } from '@repo/ui/components';
import AssetSelect from '~/lib/components/Common/SelectComponents/AssetSelect';
import { useAppDispatch, useAppSelector } from '~/lib/redux/hooks';
import { updateTaskForm } from '~/lib/redux/slices/TaskSlice';

const AssetField = () => {
  const dispatch = useAppDispatch();
  const { assetName } = useAppSelector((state) => state.task.taskForm);

  return (
    <FormInputWrapper
      sectionMaxWidth="141px"
      customSpacing="47px"
      title="Asset"
      description="Find and select the asset you require"
      isRequired
    >
      <AssetSelect
        selectName="assetId"
        selectTitle="Asset"
        defaultInputValue={assetName}
        handleSelect={(option) => {
          dispatch(
            updateTaskForm({
              assetName: option.label,
              assetId: +option.value,
            })
          );
        }}
      />
    </FormInputWrapper>
  );
};

export default AssetField;
