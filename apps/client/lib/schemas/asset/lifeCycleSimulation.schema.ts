import * as Yup from 'yup';
import { createDateSchema } from '../general.schema';
import { dateFormatter } from '~/lib/utils/Formatters';

const assetParameterSchema = Yup.object().shape({
  assetName: Yup.string().required('Asset Name is Required'),
  categoryName: Yup.string().required('Category is Required'),
  acquisitionDate: createDateSchema(
    false,
    true,
    undefined,
    dateFormatter(new Date(), 'DD/MM/YYYY') as string
  ).required('Acquisition Date is required'),
  expectedUsefulLife: Yup.string().required('Expected Useful Life is Required'),
  currentAge: Yup.number().required('Current Age is Required'),
  purchasePrice: Yup.number().required('Purchase Price is Required'),
  location: Yup.string().required('Location is Required'),
  currentCondition: Yup.string().required('Condition is Required'),
});

const maintenanceDepreciationSchema = Yup.object().shape({
  maintenanceFrequency: Yup.number().required('Frequency is Required'),
  maintenanceCost: Yup.number().required('Cost is Required'),
  depreciationModel: Yup.number().required('Depreciation Model is Required'),
  residualValue: Yup.number().required('Residual Value is Required'),
  autoAdjust: Yup.boolean().required('Auto Adjust is Required'),
});

export { assetParameterSchema, maintenanceDepreciationSchema };
