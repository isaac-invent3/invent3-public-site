import FrequencySelect from '../../Common/Frequency';
import { updateScheduleForm } from '~/lib/redux/slices/MaintenanceSlice';
import { useAppDispatch } from '~/lib/redux/hooks';
import { FormInputWrapper } from '@repo/ui/components';

interface FrequencyProps {
  sectionMaxWidth: string;
  spacing: string;
  defaultName?: string | null;
}
const Frequency = (props: FrequencyProps) => {
  const { sectionMaxWidth, spacing, defaultName } = props;
  const dispatch = useAppDispatch();
  return (
    <FormInputWrapper
      title="Frequency"
      description="Choose how often the occurence will repeat"
      isRequired
      customSpacing={spacing}
      sectionMaxWidth={sectionMaxWidth}
    >
      <FrequencySelect
        selectName="frequencyId"
        selectTitle="Frequency"
        defaultName={defaultName}
        handleSelect={(option) =>
          dispatch(updateScheduleForm({ frequencyName: option?.label }))
        }
      />
    </FormInputWrapper>
  );
};

export default Frequency;
