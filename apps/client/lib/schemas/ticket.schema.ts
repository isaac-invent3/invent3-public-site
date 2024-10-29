import * as Yup from 'yup';
import { createDateSchema } from './general.schema';
import { taskBaseSchema } from './task.schema';

const scheduleTicketSchema = (minResolutionDate?: string) =>
  Yup.object().shape({
    assignedTo: Yup.number().required('Assignee is Required'),
    resolutionDate: createDateSchema(false, true, minResolutionDate).required(
      'Resolution Date is Required'
    ),
    tasks: Yup.array()
      .of(taskBaseSchema(minResolutionDate))
      .required('Tasks are required')
      .min(1, 'There must be atleast one task'),
    taskCount: Yup.number()
      .required('Tasks is required')
      .min(1, 'There must be atleast one task'),
  });

export { scheduleTicketSchema };
