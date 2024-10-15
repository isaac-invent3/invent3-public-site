import * as Yup from 'yup';

const taskSchema = Yup.object().shape({
  taskTypeId: Yup.number().required('Task Type is Required'),
  taskName: Yup.string().required('Name is Required'),
  taskDescription: Yup.string().required('Description is Required'),
  priorityId: Yup.number().required('Priority is Required'),
  taskStatusId: Yup.number().required('Status is Required'),
  assignedTo: Yup.number().required('Priority is Required'),
  dueDate: Yup.string().required('Due Date is Required'),
  dateCompleted: Yup.string().required('Completion Date is Required'),
  costEstimate: Yup.number().required('Cost Estimate is Required'),
  actualCost: Yup.number().required('Cost Estimate is Required'),
  comments: Yup.string().nullable(),
  scheduleId: Yup.number().required('Schedule is Required'),
});

export { taskSchema };
