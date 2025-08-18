import * as Yup from 'yup';
import { createDateSchema } from './general.schema';

const generateReportSchema = () =>
  Yup.object().shape({
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
    selectedCompany: Yup.string().nullable(),
    contextTypeId: Yup.number().required('Context Type ID is Required'),
    // orderByCriteria: Yup.object().shape({
    //   columnName: Yup.string().required('Column Name is Required'),
    //   operation: Yup.number().required('Operation is Required'),
    // }).nullable(),
    pageNumber: Yup.number().min(0, 'Page Number must be 0 or greater'),
    pageSize: Yup.number().min(0, 'Page Size must be 0 or greater'),
  });

const scheduleReportSchema = (minStartDate: string) =>
  Yup.object().shape({
    reportId: Yup.number().required('Report ID is required'),
    frequencyId: Yup.string().required('Frequency ID is Required'),
    startDate: createDateSchema(true, false).required('Start Date is Required'),
    endDate: createDateSchema(true, false, minStartDate).nullable(),
    intervalValue: Yup.number().nullable(),
    dayOccurrences: Yup.array().of(Yup.string()).nullable(),
    weekOccurrences: Yup.array().of(Yup.number()).nullable(),
    monthOccurrences: Yup.array().of(Yup.number()).nullable(),
    yearOccurrences: Yup.object()
      .shape(
        Array.from({ length: 12 }, (_, i) => i + 1).reduce(
          (acc, month) => ({
            ...acc,
            [month]: Yup.array().of(Yup.number()).nullable(),
          }),
          {}
        )
      )
      .nullable(),
  });

export { generateReportSchema, scheduleReportSchema };
