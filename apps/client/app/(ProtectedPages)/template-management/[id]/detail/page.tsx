'use client';

import { notFound } from 'next/navigation';
import MaintenancePlan from '~/lib/components/TemplateManagement/Details/MaintenancePlan';
import MaintenanceSchedule from '~/lib/components/TemplateManagement/Details/MaintenanceSchedule';
import PageLoadingSkeleton from '~/lib/components/UI/PageLoadingSkeleton';

import { useAppDispatch } from '~/lib/redux/hooks';
import { useGetTemplateByIdQuery } from '~/lib/redux/services/template.services';
import { setTemplate } from '~/lib/redux/slices/TemplateSlice';
import { SYSTEM_CONTEXT_TYPE } from '~/lib/utils/constants';

const TEMPLATE_COMPONENTS = {
  [SYSTEM_CONTEXT_TYPE.MAINTENANCE_PLANS]: MaintenancePlan,
  [SYSTEM_CONTEXT_TYPE.MAINTENANCE_SCHEDULES]: MaintenanceSchedule,
};

export default function Page({ params }: { params: { id: number } }) {
  const { data, isLoading } = useGetTemplateByIdQuery({ id: params.id! });
  const dispatch = useAppDispatch();

  // Handle loading state
  if (isLoading) {
    return <PageLoadingSkeleton />;
  }

  // Handle not found state
  const template = data?.data;
  if (!template || !TEMPLATE_COMPONENTS[template.systemContextTypeId]) {
    return notFound();
  }

  // Dispatch template data to Redux store
  dispatch(setTemplate(template));

  // Dynamically render the appropriate component
  const TemplateComponent = TEMPLATE_COMPONENTS[template.systemContextTypeId];
  if (TemplateComponent) {
    return <TemplateComponent />;
  }
}
