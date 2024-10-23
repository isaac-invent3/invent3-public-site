import * as Yup from 'yup';
import { taskBaseSchema } from './task.schema';

const scheduleSchema = (
  validateTask: boolean,
  validateAsset: boolean,
  validatePlanId: boolean
) =>
  Yup.object().shape({
    name: Yup.string().required('Title is Required'),
    sla: Yup.number().nullable(),
    typeId: Yup.string().required('Type is Required'),
    frequencyId: Yup.string().required('Frequency is Required'),
    description: Yup.string().required('Description is Required'),
    comment: Yup.string().nullable(),
    scheduledDate: Yup.string().required('Scheduled Date is Required'),
    completionDate: Yup.string().nullable(),
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
            .of(taskBaseSchema)
            .required('Tasks are required')
            .min(1, 'There must be atleast one task'),
        }
      : {
          taskCount: Yup.number().nullable(),
          tasks: Yup.array().of(taskBaseSchema).notRequired(),
        }),
  });

const planSchema = (
  isDefaultPlan: boolean,
  validateBasedOnPlanScope: boolean
) =>
  Yup.object().shape({
    planName: Yup.string().required('Name is Required'),
    frequencyId: Yup.number().nullable(),
    startDate: Yup.string().required('Start Date is Required'),
    endDate: Yup.string().required('End Date is Required'),
    ownerId: Yup.number().required('Owner is Required'),
    cost: Yup.number().nullable(),

    // Conditionally add based on `validateBasedOnPlanType` and `isDefaultPlan`
    ...(validateBasedOnPlanScope && {
      planScope: Yup.string().required('Plan Scope is Required'),
      ...(isDefaultPlan
        ? {
            assetTypeId: Yup.number().required('Asset Type is Required'),
            assetId: Yup.number().nullable(),
          }
        : {
            assetId: Yup.number().required('Asset is Required'),
            assetTypeId: Yup.number().nullable(),
          }),
    }),
  });

export { scheduleSchema, planSchema };
