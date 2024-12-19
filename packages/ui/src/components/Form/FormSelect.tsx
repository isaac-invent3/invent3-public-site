import { useField } from 'formik';
import SelectInput, { SelectInputProps } from '../Select';
// eslint-disable-next-line no-redeclare
import { Option } from '@repo/interfaces';

interface FormSelectProps
  extends Omit<SelectInputProps, 'selectedOptions' | 'handleSelect'> {
  name: string;
  // eslint-disable-next-line no-unused-vars
  onSelect?: (option: Option) => void;
}

const FormSelect = (props: FormSelectProps) => {
  const [field, meta, helpers] = useField(props.name);

  return (
    <SelectInput
      {...field}
      {...props}
      isInvalid={meta.touched && !!meta.error}
      errorMessage={meta.error}
      selectedOption={meta.value}
      handleSelect={(option) => {
        props.onSelect && props.onSelect(option);
        helpers.setValue(option?.value);
      }}
    />
  );
};

export default FormSelect;
