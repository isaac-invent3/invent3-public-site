import * as Yup from 'yup';

const scheduleSchema = Yup.object().shape({
  name: Yup.string().required('Title is Required'),
  planId: Yup.number().required('Plan is Required'),
  assetId: Yup.number().required('Asset is Required'),
  sla: Yup.number().required('Max Agreement Hour is Required'),
  typeId: Yup.string().required('Type is Required'),
  frequencyId: Yup.string().required('Frequency is Required'),
  description: Yup.string().required('Description is Required'),
  comment: Yup.string().nullable(),
  scheduledDate: Yup.string().required('Scheduled Date is Required'),
  completionDate: Yup.string().nullable(),
  ticketId: Yup.number().nullable(),
});

const planSchema = Yup.object().shape({
  planName: Yup.string().required('Name is Required'),
  planTypeId: Yup.string().required('Type is Required'),
  startDate: Yup.string().required('Start Date is Required'),
  endDate: Yup.string().required('End Date is Required'),
  assetId: Yup.string().required('Asset is Required'),
});

export { scheduleSchema, planSchema };
