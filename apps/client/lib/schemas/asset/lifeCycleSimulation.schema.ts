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
  purchaseCost: Yup.number().required('Purchase Price is Required'),
  location: Yup.string().required('Location is Required'),
  currentCondition: Yup.string().required('Condition is Required'),
});

const maintenanceDepreciationSchema = (
  isCustomDetail: boolean,
  isManualRate?: boolean
) =>
  Yup.object().shape({
    maintenanceFrequency: Yup.number().required('Frequency is Required'),
    maintenanceCost: Yup.number().required('Cost is Required'),
    depreciationModel: Yup.number().required('Depreciation Model is Required'),
    residualValue: Yup.number().required('Residual Value is Required'),
    autoAdjust: Yup.boolean().required('Auto Adjust is Required'),

    annualCostBreakDown: isManualRate
      ? Yup.array()
          .of(
            Yup.object().shape({
              year: Yup.number().required('Year is Required'),
              depreciationRate: Yup.number().required(
                'Depreciation Rate is Required'
              ),
            })
          )
          .required('Annual Rate Breakdown is required')
          .min(1, 'At least one rate breakdown is needed')
      : Yup.array()
          .of(
            Yup.object().shape({
              year: Yup.number().nullable(),
              depreciationRate: Yup.number().nullable(),
            })
          )
          .nullable(),

    ...(isCustomDetail
      ? {
          scheduleType: Yup.number().required('Schedule Type is Required'),
          initialDepreciationRate: Yup.number().required(
            'Initial Rate is Required'
          ),
          adjustmentCurve: Yup.number().required(
            'Adjustment Curve is Required'
          ),
        }
      : {
          scheduleType: Yup.number().nullable(),
          initialDepreciationRate: Yup.number().nullable(),
          adjustmentCurve: Yup.number().nullable(),
        }),
  });

const annualRateSchema = Yup.object().shape({
  year: Yup.number().required('Year is Required'),
  depreciationRate: Yup.number().required('Depreciation Rate is Required'),
});

const lifeCycleTransitionSchema = Yup.object().shape({
  criterion: Yup.array()
    .of(
      Yup.object().shape({
        columnName: Yup.string().required('Column Name is Required'),
        columnValue: Yup.string().required('Column Value is Required'),
        operation: Yup.number().required('Operation is Required'),
        join: Yup.number().when(
          ['$isLast'],
          (value: any[], schema: Yup.NumberSchema) => {
            return value[0] ? schema : schema.required('Join is Required');
          }
        ),
      })
    )
    .required('Criterion is Required')
    .min(1),
});

export {
  assetParameterSchema,
  maintenanceDepreciationSchema,
  annualRateSchema,
  lifeCycleTransitionSchema,
};
