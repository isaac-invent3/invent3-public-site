import { useField } from 'formik';
import SelectInput, { SelectInputProps } from '../Select';
// eslint-disable-next-line no-redeclare
import { Option } from '@repo/interfaces';
import { CSSObjectWithLabel } from 'react-select';

interface FormSelectProps extends Omit<SelectInputProps, 'handleSelect'> {
  name: string;
  // eslint-disable-next-line no-unused-vars
  onSelect?: (option: Option | Option[] | null) => void;
  selectStyles?: CSSObjectWithLabel;
  showErrorMessage?: boolean;
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
      selectedOption={props.selectedOption ?? meta.value}
      handleSelect={(option) => {
        props.onSelect && props.onSelect(option);
        if (props.isMultiSelect) {
          const values = Array.isArray(option)
            ? option.map((item) => item.value)
            : [];
          helpers.setValue(values);
        } else {
          helpers.setValue((option as Option)?.value ?? null);
        }
      }}
    />
  );
};

export default FormSelect;
