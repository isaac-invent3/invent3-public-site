import * as Yup from 'yup';
import { createDateSchema, singleDocumentSchema } from './general.schema';

const vendorInfoSchema = Yup.object().shape({
  logo: Yup.object()
    .shape({
      imageId: Yup.number().nullable(),
      imageName: Yup.string().required(),
      base64PhotoImage: Yup.string().required(),
      base64Prefix: Yup.string().nullable(),
    })
    .required('Logo is required'),
  vendorName: Yup.string().required('Vendor name is required'),
  description: Yup.string().required('Description is required'),
  vendorCategoryId: Yup.string().required('Vendor Category is required'),
});

const contactInformationSchema = Yup.object().shape({
  contactFirstName: Yup.string().required('First name is required'),
  contactLastName: Yup.string().required('Last name is required'),
  primaryEmail: Yup.string().email().required('Email is required'),
  primaryPhoneNumber: Yup.number().required('Phone number is required'),
  address1: Yup.string().nullable(),
  address2: Yup.string().nullable(),
  vendorCountryId: Yup.number().nullable(),
  vendorStateId: Yup.number().nullable(),
  vendorCityId: Yup.number().nullable(),
  postalCode: Yup.string().nullable(),
});

const contractDetailSchema = Yup.object().shape({
  contractStartDate: createDateSchema(false, false).required(
    'Contract Start Date'
  ),
  contractEndDate: createDateSchema(false, false).nullable(),
  contractValue: Yup.number().nullable(),
  vendorStatusId: Yup.number().required('Vendor Status is required'),
  vendorDocuments: Yup.array().of(singleDocumentSchema),
});

export { vendorInfoSchema, contactInformationSchema, contractDetailSchema };
