'use client';

import { notFound } from 'next/navigation';
import PageLoadingSkeleton from '~/lib/components/UI/PageLoadingSkeleton';
import { useGetFacilityByIdQuery } from '~/lib/redux/services/location/facility.services';
import BMSDetails from '~/lib/components/Dashboard/BMS/Details';

export default function Page({ params }: { params: { id: string } }) {
  const { data, isLoading } = useGetFacilityByIdQuery({ id: params.id });

  if (isLoading) {
    return <PageLoadingSkeleton />;
  }
  if (!data?.data) return notFound();

  return (
    <BMSDetails
      facilityName={data?.data?.facilityName}
      address={data?.data?.address}
    />
  );
}
