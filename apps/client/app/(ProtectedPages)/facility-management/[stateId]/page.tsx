'use client';

import { notFound } from 'next/navigation';
import StateView from '~/lib/components/FacilityManagement/StateView';
import PageLoadingSkeleton from '~/lib/components/UI/PageLoadingSkeleton';
import { useGetStateByIdQuery } from '~/lib/redux/services/location/state.services';

export default function Page({ params }: { params: { stateId: number } }) {
  const { data, isLoading } = useGetStateByIdQuery({
    id: params.stateId!,
  });

  if (isLoading) {
    return <PageLoadingSkeleton />;
  }

  if (!data?.data) return notFound();

  return <StateView data={data?.data} />;
}
