import * as Yup from 'yup';

const scheduleSchema = Yup.object().shape({
  name: Yup.string().required('Title is Required'),
  planId: Yup.number().required('Plan is Required'),
  assetId: Yup.number().required('Asset is Required'),
  typeId: Yup.string().required('Type is Required'),
  description: Yup.string().required('Comments is Required'),
  scheduledDate: Yup.string().required('Scheduled Date is Required'),
  completionDate: Yup.string().required('Completion Date is Required'),
  ticketId: Yup.number(),
});

export { scheduleSchema };
