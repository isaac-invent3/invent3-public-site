import { useFormik, FormikConfig, FormikValues } from 'formik';
import { useScrollToFirstError } from './useScrollToFirstError';

export function useAppFormik<Values extends FormikValues = FormikValues>(
  config: FormikConfig<Values>
) {
  const formik = useFormik(config);

  useScrollToFirstError(formik);

  return formik;
}
