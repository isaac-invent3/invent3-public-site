import * as Yup from 'yup';

const generalInfoSchema = Yup.object().shape({
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
  weight: Yup.number().required('Weight is Required'),
  width: Yup.number().required('Width is Required'),
  height: Yup.number().required('Height is Required'),
  depth: Yup.number().required('Depth is Required'),
  owner: Yup.string().required('Owner is Required'),
  department: Yup.string().required('Department is Required'),
  assignedTo: Yup.string().required('This is Required'),
  responsibleFor: Yup.string().required('This is Required'),
});

const acquisitionInfoSchema = Yup.object().shape({
  acquisitionDate: Yup.string().required('Acquisition Date is required'),
  assetCondition: Yup.string().required('Asset Condition is required'),
  purchasePrice: Yup.number().required('Purchase Price is required'),
  warrantyStartDate: Yup.string().required('Warranty Start Date is required'),
  warrantyEndDate: Yup.string().required('Warranty End Date is required'),
  warrantyTerms: Yup.string().required('Warranty Terms is required'),
  paymentTerms: Yup.string().required('Payment Terms is required'),
  depreciationStartDate: Yup.string().required(
    'Depreciation Start Date is required'
  ),
  depreciationMethod: Yup.string().required('Depreciation Method is required'),
  depreciationRate: Yup.number().required('Depreciation Rate is required'),
  vendorId: Yup.string().required('Vendor is required'),
  vendorDetail: Yup.string().required('Vendor Detail is required'),
});

const documentSchema = Yup.object().shape({
  documents: Yup.array(),
});

export { generalInfoSchema, acquisitionInfoSchema, documentSchema };
