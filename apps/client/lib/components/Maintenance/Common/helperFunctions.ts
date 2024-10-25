import moment from 'moment';
import {
  PlanFormDetails,
  ScheduleFormDetails,
} from '~/lib/interfaces/maintenance.interfaces';
import {
  baseTaskFormDetail,
  taskFormDetails,
} from '~/lib/interfaces/task.interfaces';

const generateTasksArray = (
  type: 'create' | 'edit',
  formTasks: taskFormDetails[],
  username: string
) => {
  let allTasks: baseTaskFormDetail[] = [];
  formTasks.forEach((item) =>
    allTasks.push({
      taskTypeId: item.taskTypeId,
      taskName: item.taskName,
      taskDescription: item.taskDescription,
      priorityId: item.priorityId,
      assignedTo: item.assignedTo,
      dueDate: moment(item.dueDate, 'DD/MM/YYYY').utcOffset(
        0,
        true
      ) as unknown as string,
      dateCompleted: null,
      costEstimate: item.costEstimate,
      actualCost: item.actualCost,
      comments: item.comments,
      scheduleId: item.scheduleId,
      [`${type === 'create' ? 'createdBy' : 'lastModifiedBy'}`]: username,
    })
  );
  return allTasks;
};

const generateMaintenanceScheduleDTO = (
  type: 'create' | 'edit',
  formDetail: ScheduleFormDetails,
  username: string
) => {
  const maintenanceScheduleDto = {
    planId: formDetail.planId,
    scheduleName: formDetail.name,
    description: formDetail.description,
    comments: formDetail.comment,
    maintenanceTypeId: formDetail.typeId,
    scheduledDate: moment(
      formDetail.scheduledDate,
      'DD/MM/YYYY hh:mmA'
    ).utcOffset(0, true),
    completionDate: null,
    ...(type === 'edit'
      ? {
          scheduleId: formDetail.scheduleId,
        }
      : {}),
    [`${type === 'create' ? 'createdBy' : 'lastModifiedBy'}`]: username,
  };
  return maintenanceScheduleDto;
};

const generatePlanDTO = (
  type: 'create' | 'edit',
  formDetail: PlanFormDetails,
  username: string
) => {
  const maintenanceScheduleDto = {
    planName: formDetail.planName,
    frequencyId: formDetail.frequencyId,
    ownerId: formDetail.ownerId,
    ...(formDetail.assetId
      ? { assetId: formDetail.assetId }
      : { assetTypeId: formDetail.assetTypeId }),
    startDate: moment(formDetail.startDate, 'DD/MM/YYYY').format('YYYY-MM-DD'),
    endDate: moment(formDetail.endDate, 'DD/MM/YYYY').format('YYYY-MM-DD'),
    planTypeId: formDetail.planTypeId,
    [`${type === 'create' ? 'createdBy' : 'lastModifiedBy'}`]: username,
  };
  return maintenanceScheduleDto;
};

export { generateTasksArray, generatePlanDTO, generateMaintenanceScheduleDTO };
