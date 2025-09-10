import * as Yup from 'yup';
import { locationSchema } from './location.schema';
import { createDateSchema } from '../general.schema';
import { dateFormatter } from '~/lib/utils/Formatters';

const generalInfoSchema = (isUpdate: boolean) =>
  locationSchema(isUpdate).shape({
    assetName: Yup.string().required('Name is required'),
    description: Yup.string().required('Description is Required'),
    images: Yup.array()
      .of(
        Yup.object().shape({
          imageId: Yup.number().nullable(),
          imageName: Yup.string().required(),
          base64PhotoImage: Yup.string().required(),
          base64Prefix: Yup.string().nullable(),
          isPrimaryImage: Yup.boolean().required(),
        })
      )
      .required('Images are required')
      .min(1, 'Images must contain at least one item')
      .test('has-primary', 'One image must be set as primary', (images) =>
        images.some((img) => img.isPrimaryImage)
      ),
    brandName: Yup.string().required('Make is Required'),
    modelRef: Yup.string().required('Model is Required'),
    serialNo: Yup.string().required('Serial No. is Required'),
    categoryId: Yup.string().required('Category is Required'),
    subCategoryId: Yup.string().required('Subcategory is Required'),
    weightKg: Yup.number().required('Weight is Required'),
    widthCm: Yup.number().required('Width is Required'),
    heightCm: Yup.number().required('Height is Required'),
    lengthCm: Yup.number().required('Length is Required'),
    parentId: Yup.number().nullable(),
    ...(isUpdate
      ? {
          currentOwner: Yup.number().nullable(),
          assignedTo: Yup.number().nullable(),
          responsibleFor: Yup.number().nullable(),
        }
      : {
          currentOwner: Yup.number().required('Owner is Required'),
          assignedTo: Yup.number().required('This is Required'),
          responsibleFor: Yup.number().required('This is Required'),
        }),
  });

const acquisitionInfoSchema = Yup.object().shape({
  acquisitionDate: createDateSchema(
    false,
    true,
    undefined,
    dateFormatter(new Date(), 'DD/MM/YYYY') as string
  ).required('Acquisition Date is required'),
  purchaseDate: createDateSchema(
    false,
    false,
    undefined,
    dateFormatter(new Date(), 'DD/MM/YYYY') as string
  ),
  conditionId: Yup.string().required('Asset Condition is required'),
  statusId: Yup.string().required('Status is Required'),
  assetTypeId: Yup.string().required('Type is Required'),
  initialValue: Yup.number()
    .required('Purchase Price is required')
    .min(1, 'Price must be greater than 1'),
  warrantyStartDate: createDateSchema(false, false).nullable(),
  warrantyEndDate: createDateSchema(false, false).nullable(),
  warrantyDetails: Yup.string().nullable(),
  resaleValue: Yup.number().nullable(),
  scrapValue: Yup.number().nullable(),
  currentValue: Yup.number().nullable(),
  lifeExpectancy: Yup.number().nullable(),
  accumulatedDepreciation: Yup.number().nullable(),
  depreciationStartDate: createDateSchema(false, false).required(
    'Depreciation Start Date is required'
  ),
  depreciationMethod: Yup.string().nullable(),
  depreciationRate: Yup.number()
    .required('Depreciation Rate is required')
    .min(0, 'Rate must be greater than 0'),
  vendorId: Yup.number().nullable(),
});

const documentSchema = Yup.object().shape({
  documents: Yup.array().of(
    Yup.object().shape({
      documentId: Yup.number().nullable(),
      documentName: Yup.string().required(),
      base64Document: Yup.string().required(),
      base64Prefix: Yup.string().nullable(),
    })
  ),
});

const assetMaintenancePlanSchema = Yup.object().shape({
  maintenancePlans: Yup.array().of(Yup.string()),
});

const assetTransferSchema = Yup.object().shape({
  newOwnerId: Yup.number().required('Owner is Required'),
  transferredTo: Yup.number().required('New Location is Required'),
  transferDate: createDateSchema(
    false,
    true,
    dateFormatter(new Date(), 'DD/MM/YYYY') as string
  ).required('Transfer Date is required'),
  comments: Yup.string().nullable(),
});

const assetDisposeSchema = documentSchema.shape({
  disposalDate: createDateSchema(false, true).required(
    'Disposal Date is required'
  ),
  disposalReasonId: Yup.number().required('Reason is Required'),
  comments: Yup.number(),
  documents: Yup.array().of(
    Yup.object().shape({
      documentId: Yup.number().nullable(),
      documentName: Yup.string().required(),
      base64Document: Yup.string().required(),
      base64Prefix: Yup.string().nullable(),
    })
  ),
});

const bulkStatusActionSchema = Yup.object().shape({
  statusId: Yup.string().required('Status is Required'),
  assetIds: Yup.array()
    .of(Yup.number())
    .required('Assets are required')
    .min(1, 'There must be atleast one asset selected'),
});

export {
  generalInfoSchema,
  acquisitionInfoSchema,
  documentSchema,
  assetTransferSchema,
  locationSchema,
  assetDisposeSchema,
  assetMaintenancePlanSchema,
  bulkStatusActionSchema,
};
