import React from 'react';
import ScheduleSummary from '~/lib/components/Maintenance/Schedules/ScheduleForm/SummarySection/SectionTwo';
import { VStack } from '@chakra-ui/react';
import { MaintenanceSchedule } from '~/lib/interfaces/maintenance.interfaces';
import { dateFormatter } from '~/lib/utils/Formatters';
import ScheduleTasks from '../../../Plans/PlanTemplateModal/Details/Schedules/ScheduleTasks';

interface ScheduleInfoProps {
  schedule: MaintenanceSchedule;
}

const ScheduleInfo = (props: ScheduleInfoProps) => {
  const { schedule } = props;
  return (
    <VStack
      alignItems="flex-start"
      width="full"
      p="16px"
      rounded="8px"
      bgColor="#F5F6F7"
      spacing="16px"
    >
      <ScheduleSummary
        showTasks={false}
        formDetails={{
          ...schedule,
          planId: schedule.maintenancePlanId,
          name: schedule.scheduleName,
          localId: schedule.scheduleId,
          typeId: schedule.maintenanceTypeId,
          typeName: schedule.maintenanceType,
          comment: schedule.comments,
          deletedTaskIDs: [],
          updatedTaskIDs: [],
          taskCount: schedule.activeTasksCount,
          tasks: [],
          intervalValue: 1,
          dayOccurrences: [],
          weekOccurrences: [],
          monthOccurrences: [],
          yearOccurrences: {},
          firstInstanceDate: '',
          maintenancePlanInfo: null,
          scheduledDate: dateFormatter(
            schedule.scheduledDate,
            'DD/MM/YYYY hh:mmA'
          ),
        }}
      />
      <ScheduleTasks scheduleId={schedule.scheduleId} />
    </VStack>
  );
};

export default ScheduleInfo;
