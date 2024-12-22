import { isEmpty } from 'lodash';
import moment from 'moment';
import {
  PlanFormDetails,
  ScheduleFormDetails,
} from '~/lib/interfaces/maintenance.interfaces';
import {
  taskFormDetails,
  TaskInstancePayload,
  TaskPayload,
} from '~/lib/interfaces/task.interfaces';
import { FORM_ENUM, INSTANCE_UPDATE_ENUM } from '~/lib/utils/constants';

const generateTasksArray = (
  formTasks: taskFormDetails[],
  updatedTaskIDs: number[],
  username: string,
  instanceUpdateType?: (typeof INSTANCE_UPDATE_ENUM)[keyof typeof INSTANCE_UPDATE_ENUM],
  type: 'main' | 'instance' = 'main'
) => {
  // Transform formTasks into allTasks array
  const allTasks = formTasks.map((item) => {
    const actionType =
      item.taskId && updatedTaskIDs.includes(item.taskId)
        ? FORM_ENUM.update
        : FORM_ENUM.add!;

    const BaseData = {
      taskTypeId: item.taskTypeId!,
      priorityId: item.priorityId!,
      assignedTo: item.assignedTo!,
      estimatedDurationInHours: item.estimatedDurationInHours!,
      dateCompleted: item.dateCompleted!,
      costEstimate: item.costEstimate!,
      actualCost: item.actualCost!,
      comments: item.comments!,
    };

    const MainTask = {
      ...BaseData,
      taskId: item.taskId!,
      taskDescription: item.taskDescription!,
      scheduleId: item.scheduleId!,
      taskName: item.taskName!,
      changeInitiatedBy: username!,
      actionType: actionType,
    };

    const TaskInstance = {
      ...BaseData,
      taskStatusId: item.statusId,
      taskInstanceId: item.taskId!,
      description: item.taskDescription!,
      scheduleInstanceId: item.scheduleId!,
      taskInstanceName: item.taskName!,
      actionType: actionType,
      lastModifiedBy: username!,
      updateType: instanceUpdateType!,
      parentTaskId: item?.parentTaskId!,
    };

    if (type === 'instance') {
      return TaskInstance as TaskInstancePayload;
    }
    return MainTask as TaskPayload;
  });

  return allTasks;
};

const generateMaintenanceScheduleDTO = (
  type: 'create' | 'edit',
  formDetail: ScheduleFormDetails,
  updatedScheduleIDs: number[],
  username: string
) => {
  let actionType = FORM_ENUM.add;

  if (formDetail.scheduleId) {
    if (updatedScheduleIDs.includes(formDetail.scheduleId)) {
      actionType = FORM_ENUM.update;
    }
  }

  const maintenanceScheduleDto = {
    planId: formDetail.planId!,
    scheduleName: formDetail.name!,
    description: formDetail.description!,
    comments: formDetail.comment!,
    maintenanceTypeId: formDetail.typeId!,
    frequencyId: formDetail.frequencyId!,
    scheduledDate: moment(formDetail.scheduledDate, 'DD/MM/YYYY hh:mmA')
      .utcOffset(0, true)
      .toISOString(),
    endDate: formDetail.endDate
      ? moment(formDetail.scheduledDate, 'DD/MM/YYYY hh:mmA')
          .utcOffset(0, true)
          .toISOString()
      : null,
    intervalValue: formDetail.intervalValue!,
    dayOccurrences: isEmpty(formDetail.dayOccurrences)
      ? null
      : formDetail.dayOccurrences,
    weekOccurrences: isEmpty(formDetail.weekOccurrences)
      ? null
      : formDetail.weekOccurrences,
    monthOccurrences: isEmpty(formDetail.monthOccurrences)
      ? null
      : formDetail.monthOccurrences,
    yearOccurrences:
      formDetail.yearOccurrences &&
      Object.values(formDetail.yearOccurrences).every((arr) => arr.length === 0)
        ? null
        : formDetail.yearOccurrences,
    completionDate: null,
    actionType,
    ...(type === 'edit'
      ? {
          scheduleId: formDetail.scheduleId!,
        }
      : {}),
    changeInitiatedBy: username!,
  };
  return maintenanceScheduleDto;
};

const generatePlanDTO = (
  type: 'create' | 'edit',
  formDetail: PlanFormDetails,
  username: string
) => {
  const maintenancePlanDto = {
    maintenancePlanId: formDetail.planId!,
    planName: formDetail.planName!,
    ownerId: formDetail.ownerId!,
    ...(formDetail.assetId
      ? { assetId: formDetail.assetId }
      : {
          assetGroupTypeID: formDetail.assetGroupTypeID!,
          assetGroupContextID: formDetail.assetGroupContextID!,
        }),
    startDate: moment(formDetail.startDate, 'DD/MM/YYYY').format('YYYY-MM-DD')!,
    endDate: formDetail.endDate
      ? moment(formDetail.endDate, 'DD/MM/YYYY').format('YYYY-MM-DD')
      : null,
    planTypeId: formDetail.planTypeId!,
    [`${type === 'create' ? 'createdBy' : 'lastModifiedBy'}`]: username!,
  };
  return maintenancePlanDto;
};

export { generateTasksArray, generatePlanDTO, generateMaintenanceScheduleDTO };
