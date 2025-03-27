'use client';

import { useSearchParams } from 'next/navigation';
import PlanForm from '~/lib/components/Maintenance/Plans/PlanForm';
import PageLoadingSkeleton from '~/lib/components/UI/PageLoadingSkeleton';
import { MaintenancePlan } from '~/lib/interfaces/maintenance.interfaces';
import { useAppDispatch } from '~/lib/redux/hooks';
import { useGetMaintenancePlanByIdQuery } from '~/lib/redux/services/maintenance/plan.services';
import { setPlanForm } from '~/lib/redux/slices/MaintenanceSlice';

export default function Page() {
  const searchParams = useSearchParams();
  const templateString = searchParams?.get('template');
  const templateId = templateString ? Number(templateString) : undefined;
  const { data, isLoading } = useGetMaintenancePlanByIdQuery(
    { id: templateId! },
    {
      skip: !templateId,
    }
  );
  const dispatch = useAppDispatch();

  if (templateId) {
    if (isLoading) {
      return <PageLoadingSkeleton />;
    }

    if (data?.data) {
      const maintenance = data?.data;
      const plan: MaintenancePlan = maintenance?.maintenancePlanInfoHeader;
      dispatch(
        setPlanForm({
          planId: plan?.maintenancePlanId,
          planName: null,
          planTypeId: plan?.planTypeId,
          planTypeName: plan?.planTypeName,
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
