import * as Yup from 'yup';

const taskBaseSchema = () =>
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
    costEstimate: Yup.number().nullable(),
    actualCost: Yup.number().nullable(),
    estimatedDurationInHours: Yup.number().required(
      'Estimated Duration is required'
    ),
    comments: Yup.string().nullable(),
  });

const updateTaskInstanceMetadataSchema = Yup.object().shape({
  taskStatusId: Yup.string(),
  taskPriorityId: Yup.string(),
  assignedToId: Yup.string(),

  // Custom test to validate at least one of the fields is present
  atLeastOne: Yup.object().test(
    'at-least-one',
    'At least one of taskStatusId, taskPriorityId, or assignedToId is required',
    function (value: {
      taskStatusId?: string;
      taskPriorityId?: string;
      assignedToId?: string;
    }) {
      const { taskStatusId, taskPriorityId, assignedToId } = value || {};
      return !taskStatusId || !taskPriorityId || !assignedToId;
    }
  ),

  taskInstanceIds: Yup.array()
    .of(Yup.number())
    .required('Task Instances are required')
    .min(1, 'There must be atleast one task selected'),
});

const taskSchema = () =>
  taskBaseSchema().shape({
    scheduleId: Yup.number().required('Schedule is Required'),
  });

const markTaskAsCompletedSchema = Yup.object().shape({
  actualCost: Yup.number().required('Actual cost is Required'),
});

export {
  markTaskAsCompletedSchema,
  taskBaseSchema,
  taskSchema,
  updateTaskInstanceMetadataSchema,
};
