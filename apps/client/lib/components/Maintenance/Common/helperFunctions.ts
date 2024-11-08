import { isEmpty } from 'lodash';
import moment from 'moment';
import {
  PlanFormDetails,
  ScheduleFormDetails,
} from '~/lib/interfaces/maintenance.interfaces';
import {
  baseTaskFormDetail,
  taskFormDetails,
} from '~/lib/interfaces/task.interfaces';
import { FORM_ENUM } from '~/lib/utils/constants';

const generateTasksArray = (
  formTasks: taskFormDetails[],
  updatedTaskIDs: number[],
  username: string
) => {
  type formDetails = baseTaskFormDetail & {
    actionType: (typeof FORM_ENUM)[keyof typeof FORM_ENUM];
    changeInitiatedBy: string;
  };

  let allTasks: formDetails[] = [];
  formTasks.forEach((item) => {
    let actionType = FORM_ENUM.add;

    if (item.taskId) {
      if (updatedTaskIDs.includes(item.taskId)) {
        actionType = FORM_ENUM.update;
      }
    }

    allTasks.push({
      taskId: item.taskId,
      taskTypeId: item.taskTypeId,
      taskName: item.taskName,
      taskDescription: item.taskDescription,
      priorityId: item.priorityId,
      assignedTo: item.assignedTo,
      estimatedDurationInHours: item.estimatedDurationInHours,
      dateCompleted: null,
      costEstimate: item.costEstimate,
      actualCost: item.actualCost,
      comments: item.comments,
      scheduleId: item.scheduleId,
      actionType,
      changeInitiatedBy: username,
    });
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
  console.log(formDetail.dayOccurrences);

  const maintenanceScheduleDto = {
    planId: formDetail.planId,
    scheduleName: formDetail.name,
    description: formDetail.description,
    comments: formDetail.comment,
    maintenanceTypeId: formDetail.typeId,
    frequencyId: formDetail.frequencyId,
    scheduledDate: moment(
      formDetail.scheduledDate,
      'DD/MM/YYYY hh:mmA'
    ).utcOffset(0, true),
    endDate: formDetail.endDate
      ? moment(formDetail.scheduledDate, 'DD/MM/YYYY hh:mmA').utcOffset(0, true)
      : null,
    intervalValue: formDetail.intervalValue,
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
      formDetail.yearOccurences &&
      Object.values(formDetail.yearOccurences).every((arr) => arr.length === 0)
        ? null
        : formDetail.yearOccurences,
    completionDate: null,
    actionType,
    ...(type === 'edit'
      ? {
          scheduleId: formDetail.scheduleId,
        }
      : {}),
    changeInitiatedBy: username,
  };
  return maintenanceScheduleDto;
};

const generatePlanDTO = (
  type: 'create' | 'edit',
  formDetail: PlanFormDetails,
  username: string
) => {
  const maintenancePlanDto = {
    maintenancePlanId: formDetail.planId,
    planName: formDetail.planName,
    frequencyId: formDetail.frequencyId,
    ownerId: formDetail.ownerId,
    ...(formDetail.assetId
      ? { assetId: formDetail.assetId }
      : {
          assetGroupTypeID: formDetail.assetGroupTypeID,
          assetGroupContextID: formDetail.assetGroupContextID,
        }),
    startDate: moment(formDetail.startDate, 'DD/MM/YYYY').format('YYYY-MM-DD'),
    endDate: formDetail.endDate
      ? moment(formDetail.endDate, 'DD/MM/YYYY').format('YYYY-MM-DD')
      : null,
    planTypeId: formDetail.planTypeId,
    [`${type === 'create' ? 'createdBy' : 'lastModifiedBy'}`]: username,
  };
  return maintenancePlanDto;
};

function validateFrequencyInstance(
  frequency: string,
  startDate: string,
  endDate: string | null = null
) {
  const startMoment = moment(startDate, 'DD/MM/YYYY HH:mm');
  const endMoment = endDate ? moment(endDate, 'DD/MM/YYYY') : null;

  if (!startMoment.isValid() || (endDate && !endMoment?.isValid())) {
    return false;
  }

  if (!endDate) {
    // No end date means unlimited instances
    return true;
  }

  // Calculate at least one instance for each frequency type
  switch (frequency) {
    case 'Daily':
      return startMoment.add(1, 'days').isSameOrBefore(endMoment);
    case 'Weekly':
      return startMoment.add(1, 'weeks').isSameOrBefore(endMoment);
    case 'Monthly':
      return startMoment.add(1, 'months').isSameOrBefore(endMoment);
    case 'Quarterly':
      return startMoment.add(3, 'months').isSameOrBefore(endMoment);
    case 'Annually':
      return startMoment.add(1, 'years').isSameOrBefore(endMoment);
    default:
      return false;
  }
}

export {
  generateTasksArray,
  generatePlanDTO,
  generateMaintenanceScheduleDTO,
  validateFrequencyInstance,
};
