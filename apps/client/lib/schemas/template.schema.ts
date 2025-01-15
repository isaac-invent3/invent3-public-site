import * as Yup from 'yup';

const updateTemplateSchema = Yup.object().shape({
  templateName: Yup.string().required('Template Name is Required'),
  description: Yup.string().required('Description is Required'),
});

export { updateTemplateSchema };
