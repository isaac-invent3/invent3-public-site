import * as Yup from 'yup';

const categorySchema = Yup.object().shape({
  categoryName: Yup.string().required('Name is Required'),
});

const subCategorySchema = Yup.object().shape({
  categoryId: Yup.number().required('Category is Required'),
  subCategoryName: Yup.string().required('Name is Required'),
});

export { categorySchema, subCategorySchema };
