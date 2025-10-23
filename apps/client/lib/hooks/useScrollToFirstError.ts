import { useEffect } from 'react';
import { FormikProps } from 'formik';

export function useScrollToFirstError<FormValues>(
  formik: FormikProps<FormValues>
) {
  useEffect(() => {
    if (formik.isSubmitting && Object.keys(formik.errors).length > 0) {
      const firstErrorKey = Object.keys(formik.errors)[0];
      if (firstErrorKey) {
        const errorElement = document.getElementById(firstErrorKey);
        console.log({ errors: formik.errors, firstErrorKey, errorElement });
        if (errorElement) {
          errorElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
          errorElement.focus?.();
        }
      }
    }
  }, [formik.isSubmitting, formik.errors]);
}
