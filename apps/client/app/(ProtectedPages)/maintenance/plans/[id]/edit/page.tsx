'use client';

import { Skeleton } from '@chakra-ui/react';
import { notFound } from 'next/navigation';
import PlanForm from '~/lib/components/Maintenance/Plans/PlanForm';

import { MaintenancePlan } from '~/lib/interfaces/maintenance.interfaces';
import { useAppDispatch } from '~/lib/redux/hooks';
import { useGetMaintenancePlanByIdQuery } from '~/lib/redux/services/maintenance/plan.services';
import { setPlanForm } from '~/lib/redux/slices/MaintenanceSlice';
import { dateFormatter } from '~/lib/utils/Formatters';

export default function Page({ params }: { params: { id: string } }) {
  const { data, isLoading } = useGetMaintenancePlanByIdQuery(params.id);
  const dispatch = useAppDispatch();

  if (isLoading) {
    return <Skeleton width="full" rounded="8px" height="250px" mt="80px" />;
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
        frequencyId: plan?.frequencyId,
        frequencyName: plan?.frequencyName,
        owner: plan?.owner,
        assetTypeName: plan?.assetTypeName,
        assetName: '',
        assetId: plan?.assetId,
        assetTypeId: plan?.assetTypeId,
        startDate: plan?.startDate
          ? dateFormatter(plan?.startDate, 'DD/MM/YYYY')
          : null,
        endDate: plan?.endDate
          ? dateFormatter(plan?.endDate, 'DD/MM/YYYY')
          : null,
        ownerId: maintenance?.ownerId,
        cost: plan?.cost,
      })
    );
  }

  return <PlanForm type="edit" />;
}
