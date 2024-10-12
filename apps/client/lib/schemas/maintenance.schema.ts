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
  completionDate: Yup.string().required('Completion Date is Required'),
  ticketId: Yup.number().nullable(),
});

export { scheduleSchema };
