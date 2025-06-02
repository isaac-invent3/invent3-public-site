'use client';

import { notFound } from 'next/navigation';
import FacilityCompliance from '~/lib/components/Compliance/Details/FacilityCompliance';
import PageLoadingSkeleton from '~/lib/components/UI/PageLoadingSkeleton';
import { useGetComplianceFacilitySummaryQuery } from '~/lib/redux/services/asset/compliance.services';

export default function Page({ params }: { params: { facilityId: number } }) {
  console.log({ test: params.facilityId });
  const { data, isLoading } = useGetComplianceFacilitySummaryQuery({
    facilityId: params.facilityId!,
  });

  if (isLoading) {
    return <PageLoadingSkeleton />;
  }

  if (!data?.data) return notFound();

  return <FacilityCompliance data={data?.data} />;
}
