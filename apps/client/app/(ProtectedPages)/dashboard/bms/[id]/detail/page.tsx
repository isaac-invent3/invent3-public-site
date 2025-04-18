'use client';

import { notFound } from 'next/navigation';
import PageLoadingSkeleton from '~/lib/components/UI/PageLoadingSkeleton';
import { useAppDispatch } from '~/lib/redux/hooks';
import { useGetFacilitiesByLGAIdQuery } from '~/lib/redux/services/location/facility.services';
import BMSDetails from '~/lib/components/Dashboard/BMS/Details';

export default function Page({ params }: { params: { id: number } }) {
  const { data, isLoading } = useGetFacilitiesByLGAIdQuery({ id: params.id! });
  const dispatch = useAppDispatch();

  if (isLoading) {
    return <PageLoadingSkeleton />;
  }
  if (!data?.data) return notFound();
  //   const company = data?.data;
  //   dispatch(setCompany(company));

  return <BMSDetails />;
}
