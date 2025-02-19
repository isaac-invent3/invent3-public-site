'use client';

import { notFound } from 'next/navigation';

import ScheduleForm from '~/lib/components/Maintenance/Schedules/ScheduleForm';
import PageLoadingSkeleton from '~/lib/components/UI/PageLoadingSkeleton';
import { useAppDispatch } from '~/lib/redux/hooks';
import { useGetMaintenanceScheduleByGuidQuery } from '~/lib/redux/services/maintenance/schedule.services';
import { updateScheduleForm } from '~/lib/redux/slices/MaintenanceSlice';
import { dateFormatter } from '~/lib/utils/Formatters';

export default function Page({ params }: { params: { id: string } }) {
  const { data, isLoading } = useGetMaintenanceScheduleByGuidQuery(params.id);
  const dispatch = useAppDispatch();

  if (isLoading) {
    return <PageLoadingSkeleton />;
  }
  if (!data?.data) return notFound();

  if (data?.data) {
    const schedule = data?.data;
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
        scheduledDate: schedule?.scheduledDate
          ? dateFormatter(schedule?.scheduledDate, 'DD/MM/YYYY HH:mm')
          : null,
        completionDate: schedule?.completionDate
          ? dateFormatter(schedule?.completionDate, 'DD/MM/YYYY HH:mm')
          : null,
      })
    );
  }

  return <ScheduleForm type="edit" />;
}
