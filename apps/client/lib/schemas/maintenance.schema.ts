import * as Yup from 'yup';
import { taskBaseSchema } from './task.schema';
import { createDateSchema } from './general.schema';

const scheduleSchema = (
  validateTask: boolean,
  validateAsset: boolean,
  validatePlanId: boolean,
  minScheduleDate?: string,
  maxScheduleDate?: string
) =>
  Yup.object().shape({
    localId: Yup.number().nullable(),
    name: Yup.string().required('Title is Required'),
    sla: Yup.number().nullable(),
    typeId: Yup.string().required('Type is Required'),
    frequencyId: Yup.string().required('Frequency is Required'),
    description: Yup.string().required('Description is Required'),
    comment: Yup.string().nullable(),
    scheduledDate: createDateSchema(
      true,
      true,
      minScheduleDate,
      maxScheduleDate
    ).required('Schedule Date is Required'),
    endDate: createDateSchema(true, false).nullable(),
    completionDate: Yup.string().nullable(),
    intervalValue: Yup.number().nullable(),
    ticketId: Yup.number().nullable(),
    ...(validatePlanId
      ? { planId: Yup.number().required('Plan is Required') }
      : { planId: Yup.number().nullable() }),
    ...(validateAsset
      ? { assetId: Yup.number().required('Asset is Required') }
      : { assetId: Yup.number().nullable() }),
    ...(validateTask
      ? {
          taskCount: Yup.number()
            .required('Tasks is required')
            .min(1, 'There must be atleast one task'),
          tasks: Yup.array()
            .of(taskBaseSchema())
            .required('Tasks are required')
            .min(1, 'There must be atleast one task'),
        }
      : {
          taskCount: Yup.number().nullable(),
          tasks: Yup.array().of(taskBaseSchema()).notRequired(),
        }),
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

const planSchema = (
  isDefaultPlan: boolean,
  validateBasedOnPlanScope: boolean,
  minStartDate?: string,
  minEndDate?: string
) =>
  Yup.object().shape({
    planName: Yup.string().required('Name is Required'),
    startDate: createDateSchema(false, true, minStartDate).required(
      'Start Date is Required'
    ),
    endDate: createDateSchema(false, false, minEndDate).nullable(),
    ownerId: Yup.number().required('Owner is Required'),
    cost: Yup.number().nullable(),

    // Conditionally add based on `validateBasedOnPlanType` and `isDefaultPlan`
    ...(validateBasedOnPlanScope && {
      planScope: Yup.string().required('Plan Scope is Required'),
      ...(isDefaultPlan
        ? {
            assetGroupTypeID: Yup.number().required('Asset Group is Required'),
            assetGroupContextID: Yup.number().required(
              'Group Context is Required'
            ),
            assetId: Yup.number().nullable(),
          }
        : {
            assetId: Yup.number().required('Asset is Required'),
            assetGroupTypeID: Yup.number().nullable(),
            assetGroupContextID: Yup.number().nullable(),
          }),
    }),
  });

const planScheduleSchema = (
  validateTask: boolean,
  validateAsset: boolean,
  validatePlanId: boolean
) =>
  Yup.object().shape({
    schedules: Yup.array()
      .of(scheduleSchema(validateTask, validateAsset, validatePlanId))
      .required('Schedule is required')
      .min(1, 'There must be atleast one schedule'),
  });
export { scheduleSchema, planSchema, planScheduleSchema };
