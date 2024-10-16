import * as Yup from 'yup';

const taskBaseSchema = Yup.object().shape({
  taskId: Yup.number().nullable(),
  taskTypeId: Yup.number().required('Task Type is Required'),
  taskTypeName: Yup.string().required('Task Type is Required'),
  taskName: Yup.string().required('Name is Required'),
  taskDescription: Yup.string().required('Description is Required'),
  priorityId: Yup.number().required('Priority is Required'),
  priorityName: Yup.string().required('Priority is Required'),
  taskStatusId: Yup.number().nullable(),
  taskStatusName: Yup.string().nullable(),
  assignedTo: Yup.number().required('Assignee is Required'),
  assignedToName: Yup.string().required('Assignee is Required'),
  dueDate: Yup.string().required('Due Date is Required'),
  dateCompleted: Yup.string().required('Completion Date is Required'),
  costEstimate: Yup.number().required('Cost Estimate is Required'),
  actualCost: Yup.number().nullable(),
  comments: Yup.string().nullable(),
});

const taskSchema = taskBaseSchema.shape({
  scheduleId: Yup.number().required('Schedule is Required'),
});

export { taskBaseSchema, taskSchema };
