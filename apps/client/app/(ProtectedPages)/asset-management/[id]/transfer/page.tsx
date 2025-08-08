'use client';

import { notFound } from 'next/navigation';

import AssetTransfer from '~/lib/components/AssetManagement/AssetTransfer';
import PageLoadingSkeleton from '~/lib/components/UI/PageLoadingSkeleton';
import { useGetAssetInfoHeaderByIdQuery } from '~/lib/redux/services/asset/general.services';

export default function Page({ params }: { params: { id: number } }) {
  const { data, isLoading } = useGetAssetInfoHeaderByIdQuery(
    { id: params.id },
    { skip: params.id === undefined }
  );

  if (isLoading) {
    return <PageLoadingSkeleton />;
  }
  if (!data?.data) return notFound();

  return <AssetTransfer data={data?.data} inAWorkflow={false} />;
}
