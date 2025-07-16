'use client';

import { notFound } from 'next/navigation';
import CategoryCompliance from '~/lib/components/Compliance/Details/CategoryCompliance';
import PageLoadingSkeleton from '~/lib/components/UI/PageLoadingSkeleton';
import { useGetComplianceAssetCategorySummaryQuery } from '~/lib/redux/services/asset/compliance.services';

export default function Page({
  params,
}: {
  params: { facilityId: number; id: number };
}) {
  const { data, isLoading } = useGetComplianceAssetCategorySummaryQuery({
    facilityId: params.facilityId!,
    assetCategoryId: params.id!,
  });

  if (isLoading) {
    return <PageLoadingSkeleton />;
  }

  if (!data?.data) return notFound();

  return <CategoryCompliance data={data?.data} />;
}
