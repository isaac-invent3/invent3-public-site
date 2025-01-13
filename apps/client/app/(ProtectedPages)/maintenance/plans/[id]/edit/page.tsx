'use client';

import { Skeleton } from '@chakra-ui/react';
import { notFound } from 'next/navigation';
import PlanForm from '~/lib/components/Maintenance/Plans/PlanForm';

import { MaintenancePlan } from '~/lib/interfaces/maintenance.interfaces';
import { useAppDispatch } from '~/lib/redux/hooks';
import { useGetMaintenancePlanByIdQuery } from '~/lib/redux/services/maintenance/plan.services';
import { setPlanForm } from '~/lib/redux/slices/MaintenanceSlice';
import { dateFormatter } from '~/lib/utils/Formatters';

export default function Page({ params }: { params: { id: number } }) {
  const { data, isLoading } = useGetMaintenancePlanByIdQuery({ id: params.id });
  const dispatch = useAppDispatch();

  if (isLoading) {
    return <Skeleton width="full" rounded="8px" height="250px" />;
  }
  if (!data?.data) return notFound();

  if (data?.data) {
    const maintenance = data?.data;
    const plan: MaintenancePlan = maintenance?.maintenancePlanInfoHeader;
    dispatch(
      setPlanForm({
        planId: plan?.maintenancePlanId,
        planName: plan?.planName,
        planTypeId: plan?.planTypeId,
        planTypeName: plan?.planTypeName,
        owner: plan?.owner,
        assetGroupContextID: maintenance?.assetGroupContextID,
        assetGroupTypeID: maintenance?.assetGroupTypeID,
        assetGroupTypeName: plan?.groupTypeName,
        assetGroupContextName: plan?.assetGroupContextName,
        assetName: plan?.assetName,
        assetId: plan?.assetId,
        startDate: plan?.startDate
          ? dateFormatter(plan?.startDate, 'DD/MM/YYYY')
          : null,
        endDate: plan?.endDate
          ? dateFormatter(plan?.endDate, 'DD/MM/YYYY')
          : null,
        ownerId: maintenance?.ownerId,
        cost: plan?.cost,
        schedules: [],
        deletedScheduleIDs: [],
        updatedScheduleIDs: [],
      })
    );
  }

  return <PlanForm type="edit" />;
}
