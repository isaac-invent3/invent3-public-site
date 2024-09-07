import * as Yup from 'yup';

export const generalInfoSchema = Yup.object().shape({
  name: Yup.string().required('Name is required'),
  description: Yup.string().required('Description is Required'),
  images: Yup.array()
    .required('Images is required')
    .min(1, 'Images must contain at least one item'),
  codePrefix: Yup.string().required('Code Prefix is Required'),
  codeSuffix: Yup.string().required('Code Suffix is Required'),
  assetCode: Yup.string().required('Asset Code is Required'),
  make: Yup.string().required('Make is Required'),
  model: Yup.string().required('Model is Required'),
  serialNo: Yup.string().required('Serial No. is Required'),
  category: Yup.string().required('Category is Required'),
  subCategory: Yup.string().required('Subcategory is Required'),
  weight: Yup.string().required('Weight is Required'),
  width: Yup.string().required('Width is Required'),
  height: Yup.string().required('Height is Required'),
  depth: Yup.string().required('Depth is Required'),
  owner: Yup.string().required('Owner is Required'),
  department: Yup.string().required('Department is Required'),
  assignedTo: Yup.string().required('This is Required'),
  responsibleFor: Yup.string().required('This is Required'),
});
