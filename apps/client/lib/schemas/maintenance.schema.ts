import * as Yup from 'yup';

const scheduleSchema = Yup.object().shape({
  title: Yup.string().required('Title is Required'),
  planId: Yup.number().required('Plan is Required'),
  comments: Yup.string().required('Comments is Required'),
  scheduledDate: Yup.string().required('Scheduled Date is Required'),
  completionDate: Yup.string().required('Completion Date is Required'),
  statusId: Yup.number().required('Status is Required'),
  ticketId: Yup.number().required('Ticket is Required'),
});

export { scheduleSchema };
