import * as Yup from 'yup';

const slaSchema = Yup.object().shape({
  ticketTypeId: Yup.number().required('Ticket Type Required'),
  priorityId: Yup.number().required('Priority is Required'),
  slaDurationMinutes: Yup.number().nullable(),
  slaResponseHours: Yup.number().required('Response Time is Required'),
  slaReminderHours: Yup.number().required('Resolution Time is Required'),
  enableReminders: Yup.boolean(),
  isActive: Yup.boolean(),
});

export { slaSchema };
