'use client';

import { notFound } from 'next/navigation';

import AssetDispose from '~/lib/components/AssetManagement/AssetDispose';
import PageLoadingSkeleton from '~/lib/components/UI/PageLoadingSkeleton';
import { useGetAssetInfoHeaderByIdQuery } from '~/lib/redux/services/asset/general.services';

export default function Page({ params }: { params: { id: number } }) {
  const { data, isLoading } = useGetAssetInfoHeaderByIdQuery(
    { id: params.id! },
    { skip: params.id === undefined }
  );

  if (isLoading) {
    return <PageLoadingSkeleton />;
  }
  if (!data?.data) return notFound();

  return <AssetDispose data={data?.data} />;
}
