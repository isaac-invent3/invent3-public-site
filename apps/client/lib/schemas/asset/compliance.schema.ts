import * as Yup from 'yup';
import { createDateSchema } from '../general.schema';

const createComplianceSchema = () =>
  Yup.object().shape({
    assetCategoryId: Yup.number().required('Asset Category is Required'),
    regulationId: Yup.number().required('Compliant Type is Required'),
    complianceRegulationId: Yup.number().required('Compliant is Required'),
    frequencyId: Yup.number().required('Frequency is Required'),
    nextInspectionDate: createDateSchema(false, false).nullable(),
    documents: Yup.array().of(
      Yup.object()
        .shape({
          documentName: Yup.string().nullable(),
          document: Yup.string().nullable(),
          base64Prefix: Yup.string().nullable(),
        })
        .nullable()
    ),
  });

const createComplianceRegulationSchema = () =>
  Yup.object().shape({
    regulationId: Yup.number().required('Compliant is Required'),
    standard: Yup.string().required('Standard is Required'),
    description: Yup.string().nullable(),
  });

const markComplianceSchema = () =>
  Yup.object().shape({
    compliancePolicyId: Yup.number().required('Policy is Required'),
    performedBy: Yup.string().required('Performed By is Required'),
    assetComplianceStatusId: Yup.number().required(
      'Compliant Status is Required'
    ),
    comments: Yup.string().nullable(),
    date: createDateSchema(false, false).required(
      'Inspection Date is required'
    ),
  });

export {
  createComplianceSchema,
  createComplianceRegulationSchema,
  markComplianceSchema,
};
