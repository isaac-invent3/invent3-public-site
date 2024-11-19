'use client';

import { Skeleton } from '@chakra-ui/react';
import { notFound, useSearchParams } from 'next/navigation';
import PlanForm from '~/lib/components/Maintenance/Plans/PlanForm';
import { MaintenancePlan } from '~/lib/interfaces/maintenance.interfaces';
import { useAppDispatch } from '~/lib/redux/hooks';
import { useGetMaintenancePlanByIdQuery } from '~/lib/redux/services/maintenance/plan.services';
import { setPlanForm } from '~/lib/redux/slices/MaintenanceSlice';

export default function Page() {
  const searchParams = useSearchParams();
  const template = searchParams.get('template');
  const { data, isLoading } = useGetMaintenancePlanByIdQuery(template, {
    skip: !template,
  });
  const dispatch = useAppDispatch();

  if (template) {
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
          planName: null,
          planTypeId: plan?.planTypeId,
          planTypeName: plan?.planTypeName,
          frequencyId: plan?.frequencyId,
          frequencyName: plan?.frequencyName,
          owner: plan?.owner,
          assetGroupContextID: null,
          assetGroupTypeID: null,
          assetGroupTypeName: null,
          assetGroupContextName: null,
          assetName: '',
          assetId: null,
          startDate: null,
          endDate: null,
          ownerId: maintenance?.ownerId,
          cost: plan?.cost,
          schedules: [],
          deletedScheduleIDs: [],
          updatedScheduleIDs: [],
        })
      );
    }
  }

  return <PlanForm type="create" />;
}
