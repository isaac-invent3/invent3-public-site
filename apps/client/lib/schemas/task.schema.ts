import * as Yup from 'yup';
import { createDateSchema } from './general.schema';

const taskBaseSchema = (minDueDate?: string) =>
  Yup.object().shape({
    taskId: Yup.number().nullable(),
    taskTypeId: Yup.number().required('Task Type is Required'),
    taskType: Yup.string().required('Task Type is Required'),
    taskName: Yup.string().required('Name is Required'),
    taskDescription: Yup.string().required('Description is Required'),
    priorityId: Yup.number().required('Priority is Required'),
    priorityName: Yup.string().required('Priority is Required'),
    taskStatusId: Yup.number().nullable(),
    taskStatusName: Yup.string().nullable(),
    assignedTo: Yup.number().required('Assignee is Required'),
    assignedToEmployeeName: Yup.string().required('Assignee is Required'),
    dueDate: createDateSchema(false, true, minDueDate).required(
      'Due Date is Required'
    ),
    costEstimate: Yup.number().required('Cost Estimate is Required'),
    actualCost: Yup.number().nullable(),
    comments: Yup.string().nullable(),
  });

const taskSchema = (minDueDate?: string) =>
  taskBaseSchema(minDueDate).shape({
    scheduleId: Yup.number().required('Schedule is Required'),
  });

const markTaskAsCompletedSchema = Yup.object().shape({
  actualCost: Yup.number().required('Actual cost is Required'),
});

export { taskBaseSchema, taskSchema, markTaskAsCompletedSchema };
