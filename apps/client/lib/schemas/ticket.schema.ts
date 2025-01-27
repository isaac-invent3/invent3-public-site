import * as Yup from 'yup';
import { createDateSchema } from './general.schema';
import { taskBaseSchema } from './task.schema';

const scheduleTicketSchema = (minResolutionDate?: string) =>
  Yup.object().shape({
    assignedTo: Yup.number().required('Assignee is Required'),
    resolutionDate: createDateSchema(true, true, minResolutionDate).required(
      'Resolution Date is Required'
    ),
    tasks: Yup.array()
      .of(taskBaseSchema())
      .required('Tasks are required')
      .min(1, 'There must be atleast one task'),
    taskCount: Yup.number()
      .required('Tasks is required')
      .min(1, 'There must be atleast one task'),
  });

const updateTicketSchema = () =>
  Yup.object().shape({
    assignedTo: Yup.number().required('Assignee is Required'),
    status: Yup.string().required('Status is Required'),
    priority: Yup.string().required('Priority is Required'),
    ticketType: Yup.string().required('Ticket Type is Required'),
    tasks: Yup.array()
      .of(taskBaseSchema())
      .required('Tasks are required')
      .min(1, 'There must be atleast one task'),
    taskCount: Yup.number()
      .required('Tasks is required')
      .min(1, 'There must be atleast one task'),
  });

const assignTicketSchema = () =>
  Yup.object().shape({
    assignedTo: Yup.number().required('Assignee is Required'),
  });

const createTicketSchema = () =>
  Yup.object().shape({
    ticketTitle: Yup.string().required('Ticket Title is Required'),
    issueDescription: Yup.string().required('Description is Required'),
    assetId: Yup.number().required('Asset is Required'),
    reportedByEmployeeId: Yup.number().nullable(),
    ticketTypeId: Yup.number().required('Ticket Type is Required'),
    ticketPriorityId: Yup.number().required('Ticket Priority is Required'),
  });

const updateTicketMetadataSchema = Yup.object().shape({
  taskStatusId: Yup.string(),
  taskPriorityId: Yup.string(),
  assignedToId: Yup.string(),
});

export {
  createTicketSchema,
  scheduleTicketSchema,
  updateTicketSchema,
  assignTicketSchema,
  updateTicketMetadataSchema,
};
