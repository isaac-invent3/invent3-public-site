'use client';

import { Skeleton } from '@chakra-ui/react';
import { useSearchParams } from 'next/navigation';

import ScheduleForm from '~/lib/components/Maintenance/Schedules/ScheduleForm';
import { MaintenanceSchedule } from '~/lib/interfaces/maintenance.interfaces';
import { useAppDispatch } from '~/lib/redux/hooks';
import { useGetMaintenanceScheduleByGuidQuery } from '~/lib/redux/services/maintenance/schedule.services';
import { updateScheduleForm } from '~/lib/redux/slices/MaintenanceSlice';

export default function Page() {
  const searchParams = useSearchParams();
  const template = searchParams.get('template');
  const { data, isLoading } = useGetMaintenanceScheduleByGuidQuery(template!, {
    skip: !template,
  });
  const dispatch = useAppDispatch();

  if (template) {
    if (isLoading) {
      return <Skeleton width="full" rounded="8px" height="250px" mt="80px" />;
    }

    if (data?.data) {
      const schedule: MaintenanceSchedule = data?.data;
      dispatch(
        updateScheduleForm({
          name: schedule?.scheduleName,
          scheduleId: schedule?.scheduleId,
          planId: schedule?.maintenancePlanId,
          typeId: schedule?.maintenanceTypeId,
          typeName: schedule?.maintenanceType,
          assetId: schedule?.assetId,
          assetName: schedule?.assetName,
          assetTypeId: schedule?.assetTypeId,
          sla: schedule?.sla,
          frequencyId: schedule?.frequencyId,
          frequencyName: schedule?.frequencyName,
          assetLocation: schedule?.assetLocation,
          description: schedule?.description,
          comment: schedule?.comments,
          taskCount: schedule?.activeTasksCount,
          scheduledDate: null,
          completionDate: null,
        })
      );
    }
  }

  return <ScheduleForm type="create" />;
}
