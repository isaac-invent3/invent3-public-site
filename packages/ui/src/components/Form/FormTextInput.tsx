import { useField } from 'formik';
import TextInput, { TextInputProps } from '../TextInput';

interface FormTextInputProps
  extends Omit<TextInputProps, 'value' | 'onChange'> {
  name: string;
  showErrorMessage?: boolean;
}

const FormTextInput = (props: FormTextInputProps) => {
  const [field, meta] = useField(props.name);

  return (
    <TextInput
      {...props}
      {...field}
      isInvalid={meta.touched && !!meta.error}
      errorMessage={meta.error}
      onChange={(e) => field.onChange(e)}
    />
  );
};

export default FormTextInput;
