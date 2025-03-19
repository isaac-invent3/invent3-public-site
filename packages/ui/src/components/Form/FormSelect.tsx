import { useField } from 'formik';
import SelectInput, { SelectInputProps } from '../Select';
// eslint-disable-next-line no-redeclare
import { Option } from '@repo/interfaces';

interface FormSelectProps
  extends Omit<SelectInputProps, 'selectedOptions' | 'handleSelect'> {
  name: string;
  // eslint-disable-next-line no-unused-vars
  onSelect?: (option: Option | Option[]) => void;
}

const FormSelect = (props: FormSelectProps) => {
  const [field, meta, helpers] = useField(props.name);

  return (
    <SelectInput
      {...field}
      {...props}
      isInvalid={
        props.isInvalid ? props.isInvalid : meta.touched && !!meta.error
      }
      errorMessage={meta.error}
      selectedOption={meta.value}
      handleSelect={(option) => {
        props.onSelect && props.onSelect(option);
        if (props.isMultiSelect) {
          helpers.setValue((option as Option[]).map((item) => item.value));
        } else {
          helpers.setValue((option as Option)?.value);
        }
      }}
    />
  );
};

export default FormSelect;
