'use client';

import { Skeleton } from '@chakra-ui/react';
import { notFound } from 'next/navigation';

import ScheduleInstanceForm from '~/lib/components/Maintenance/Schedules/ScheduleInstanceForm';
import { useAppDispatch } from '~/lib/redux/hooks';
import { useGetScheduleInstanceByGuidQuery } from '~/lib/redux/services/maintenance/scheduleInstance.services';
import { updateScheduleForm } from '~/lib/redux/slices/MaintenanceSlice';
import { dateFormatter } from '~/lib/utils/Formatters';

export default function Page({ params }: { params: { id: number } }) {
  const { data, isLoading } = useGetScheduleInstanceByGuidQuery({
    instanceGuid: params.id!,
  });
  const dispatch = useAppDispatch();

  if (isLoading) {
    return <Skeleton width="full" rounded="8px" height="250px" mt="80px" />;
  }
  if (!data?.data) return notFound();

  if (data?.data) {
    const schedule = data?.data;
    dispatch(
      updateScheduleForm({
        name: schedule?.scheduleInstanceName,
        scheduleId: schedule?.scheduleInstanceId,
        planId: schedule?.maintenancePlanId,
        typeId: schedule?.maintenanceTypeId,
        typeName: schedule?.maintenanceType,
        assetId: schedule?.assetId,
        assetName: schedule?.assetName,
        assetTypeId: schedule?.assetTypeId,
        sla: schedule?.sla,
        // TODO: Default frequency is to be removed
        frequencyId: schedule?.frequencyId ?? 1,
        frequencyName: schedule?.frequencyName,
        assetLocation: schedule?.assetLocation,
        description: schedule?.description,
        comment: schedule?.comments,
        taskCount: schedule?.activeTasksCount,
        contactPerson: schedule?.contactPerson,
        contactPersonEmail: schedule?.contactPersonEmail,
        contactPersonPhoneNo: schedule?.contactPersonPhoneNo,
        scheduledDate: schedule?.scheduledDate
          ? dateFormatter(schedule?.scheduledDate, 'DD/MM/YYYY HH:mm')
          : null,
        completionDate: schedule?.completionDate
          ? dateFormatter(schedule?.completionDate, 'DD/MM/YYYY HH:mm')
          : null,
      })
    );
  }

  return <ScheduleInstanceForm />;
}
