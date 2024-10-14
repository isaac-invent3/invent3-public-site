'use client';

import { Skeleton } from '@chakra-ui/react';
import { notFound } from 'next/navigation';

import ScheduleForm from '~/lib/components/Maintenance/Schedules/ScheduleForm';
import { MaintenanceSchedule } from '~/lib/interfaces/maintenance.interfaces';
import { useAppDispatch } from '~/lib/redux/hooks';
import { useGetMaintenanceScheduleByIdQuery } from '~/lib/redux/services/maintenance/schedule.services';
import { updateScheduleForm } from '~/lib/redux/slices/MaintenanceSlice';
import { dateFormatter } from '~/lib/utils/Formatters';

export default function Page({ params }: { params: { id: string } }) {
  const { data, isLoading } = useGetMaintenanceScheduleByIdQuery(params.id);
  const dispatch = useAppDispatch();

  if (isLoading) {
    return <Skeleton width="full" rounded="8px" height="250px" mt="80px" />;
  }
  if (!data?.data) return notFound();

  if (data?.data) {
    const schedule: MaintenanceSchedule = data?.data;
    dispatch(
      updateScheduleForm({
        name: schedule?.scheduleName,
        scheduleId: schedule?.scheduleId,
        planId: schedule?.maintenancePlanId,
        planName: schedule?.planName,
        typeId: schedule?.maintenanceTypeId,
        typeName: schedule?.maintenanceType,
        assetId: schedule?.assetId,
        assetName: schedule?.assetName,
        sla: schedule?.sla,
        frequencyId: schedule?.frequencyId,
        frequencyName: schedule?.frequencyName,
        assetLocation: schedule?.assetLocation,
        description: schedule?.description,
        comment: schedule?.comments,
        scheduledDate: schedule?.scheduledDate
          ? dateFormatter(schedule?.scheduledDate, 'DD/MM/YYYY hh:mmA')
          : null,
        completionDate: schedule?.completionDate
          ? dateFormatter(schedule?.completionDate, 'DD/MM/YYYY hh:mmA')
          : null,
      })
    );
  }

  return <ScheduleForm type="edit" />;
}
