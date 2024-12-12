import { useField } from 'formik';
import TextAreaInput, { TextAreaProps } from '../TextArea';

interface FormTextInputProps extends Omit<TextAreaProps, 'value' | 'onChange'> {
  name: string;
}

const FormTextAreaInput = (props: FormTextInputProps) => {
  const [field, meta] = useField(props.name);

  return (
    <TextAreaInput
      {...props}
      {...field}
      isInvalid={meta.touched && !!meta.error}
      errorMessage={meta.error}
      onChange={(e) => field.onChange(e)}
    />
  );
};

export default FormTextAreaInput;
